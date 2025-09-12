import React, { useState } from "react";
import {
  ReactFlow,
  useNodesState,
  Controls,
  NodeToolbar,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

function CustomNode({ id, data, setNodes, selectedNodeId, setSelectedNodeId }) {
  const [hover, setHover] = useState(false);

  // Visible while hovering OR if this node is selected
  const isVisible = hover || selectedNodeId === id;

  const handleDelete = (e) => {  
  e.stopPropagation(); // इवेंट की propagation (ऊपर तक जाने की प्रक्रिया) को रोक देता है ताकि parent इवेंट्स trigger न हों  

  setNodes((nds) => nds.filter((node) => node.id !== id));  
  // setNodes के जरिए nodes की state को अपडेट करता है और filter करके current node (जिसका id match हो रहा है) हटा देता है  

  if (selectedNodeId === id) setSelectedNodeId(null);  
  // अगर delete किया जाने वाला node वही है जो selectedNodeId में है,  
  // तो selectedNodeId को null कर देता है (मतलब कोई node select नहीं रहेगा)  
};  

const handleEdit = (e) => {  
  e.stopPropagation(); // parent इवेंट को trigger होने से रोकता है  

  const newLabel = prompt("Enter new label:", data.label);  
  // यूज़र से नया label input लेने के लिए prompt बॉक्स दिखाता है (default value पुराना label रहेगा)  

  if (newLabel !== null && newLabel !== "") {  
    // चेक करता है कि user ने cancel नहीं किया और खाली string भी नहीं डाली  

    setNodes((nds) =>  
      nds.map((node) =>  
        node.id === id  
          ? { ...node, data: { ...node.data, label: newLabel } }  
          : node  
      )  
    );  
    // setNodes से nodes की state अपडेट करता है →  
    // जिस node का id match करेगा, उसकी data.label को नए label से अपडेट करेगा  
    // बाकी nodes को वैसे का वैसा ही रहने देगा  
  }  
};  


  return (
    <div
      style={{
        padding: 12,
        border: "1px solid #333",
        borderRadius: 8,
        background: "#facc15",
        textAlign: "center",
        minWidth: 140,
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedNodeId(id);
      }}
    >
      <NodeToolbar isVisible={isVisible} position="top">
        <button
          onClick={handleEdit}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "6px 10px",
            marginRight: 6,
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "6px 10px",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </NodeToolbar>

      <div style={{ pointerEvents: "none" }}>
        <strong>{data.label}</strong>
      </div>
    </div>
  );
}

export default function Vedio13() {
  const initialNodes = [
    { id: "1", position: { x: 120, y: 120 }, data: { label: "Node 1" }, type: "custom" },
    { id: "2", position: { x: 420, y: 120 }, data: { label: "Node 2" }, type: "custom" },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const nodeTypes = {
    custom: (props) => (
      <CustomNode
        {...props}
        setNodes={setNodes}
        selectedNodeId={selectedNodeId}
        setSelectedNodeId={setSelectedNodeId}
      />
    ),
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onPaneClick={() => setSelectedNodeId(null)}
        fitView
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}
