import React from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  getBezierPath,
  EdgeText,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";


// ✅ Custom Edge with Text (Edge को Customize करने के लिए)
function CustomEdge({
  id,
  sourceX, // edge की starting position (x-axis)
  sourceY, // edge की starting position (y-axis)
  targetX, // edge की ending position (x-axis)
  targetY, // edge की ending position (y-axis)
  sourcePosition, // edge किस side से निकलेगा (left, right, top, bottom)
  targetPosition, // edge किस side पर connect होगा
  data, // edge का extra data (जैसे label)
  markerEnd, // arrow style अगर edge के end पर चाहिए
}) {
  // ✅ getBezierPath → एक smooth curve path generate करता है
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  // ✅ Edge के बीच का center निकाल रहे हैं ताकि text बीच में show हो
  const centerX = (sourceX + targetX) / 2;
  const centerY = (sourceY + targetY) / 2;

  return (
    <>
      {/* ✅ Actual edge line (path) */}
      <path
        id={id}
        d={edgePath} // edge का path
        stroke="#1f2937" // edge का color (gray-800)
        strokeWidth={2} // edge की मोटाई
        fill="none"
        markerEnd={markerEnd} // अगर arrow चाहिए तो ये काम आएगा
      />

      {/* ✅ Edge के बीच में Text label */}
      <EdgeText
        x={centerX} // text का X coordinate (center में)
        y={centerY} // text का Y coordinate (center में)
        label={data?.label || ""} // text show (अगर label नहीं दिया तो empty)
        style={{ fill: "#0ea5a4", fontWeight: "600" }} // text का style
      />
    </>
  );
}


export default function Vedio14() {
  // ✅ Initial nodes (3 nodes बनाए गए)
  const initialNodes = [
    { id: "1", position: { x: 120, y: 120 }, data: { label: "Node 1" } },
    { id: "2", position: { x: 420, y: 120 }, data: { label: "Node 2" } },
    { id: "3", position: { x: 270, y: 300 }, data: { label: "Node 3" } },
  ];

  // ✅ Start में कोई edge नहीं है
  const initialEdges = [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // ✅ Register custom edge type
  const edgeTypes = { custom: CustomEdge };

  // ✅ onConnect → जब user drag करके दो nodes connect करेगा तब call होगा
  const onConnect = (params) => {
    // Prompt open होगा text डालने के लिए
    const label = prompt("Edge का label डालें (Cancel करने पर edge create नहीं होगा):", "");
    if (label === null) return; // अगर user cancel कर दे तो edge ना बने

    // setEdges → नया edge add करना
    setEdges((eds) =>
      addEdge(
        {
          ...params, // source और target की info ReactFlow खुद देता है
          type: "custom", // custom edge use करना
          data: { label }, // user का दिया हुआ text
          animated: true, // edge animate होगा
          style: { stroke: "#ff8c00", strokeWidth: 2 }, // edge का style
        },
        eds
      )
    );
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect} // ✅ drag करके edge create करने का logic
        edgeTypes={edgeTypes}
        fitView
      >
        {/* ✅ Controls component zoom/pan reset आदि का UI देता है */}
        <Controls />
      </ReactFlow>
    </div>
  );
}
