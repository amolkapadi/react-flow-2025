import React, { useState } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  NodeToolbar,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

/*
  Working CustomNode with toolbar that stays visible while:
  - mouse is over node (hover)
  OR
  - node is selected (clicked)
  This prevents toolbar disappearing when user moves mouse from node to toolbar.
*/

function CustomNode({ id, data, setNodes, selectedNodeId, setSelectedNodeId }) {
  const [hover, setHover] = useState(false);

  // Visible while hovering OR if this node is selected
  const isVisible = hover || selectedNodeId === id;

  const handleDelete = (e) => {
    e.stopPropagation(); // don't let click bubble to pane
    setNodes((nds) => nds.filter((node) => node.id !== id));
    // if this node was selected, clear selection
    if (selectedNodeId === id) setSelectedNodeId(null);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    const newLabel = prompt("Enter new label:", data.label);
    if (newLabel !== null && newLabel !== "") {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, label: newLabel } } : node
        )
      );
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
        e.stopPropagation(); // prevent pane click from clearing selection immediately
        setSelectedNodeId(id); // select this node on click
      }}
    >
      {/* Node toolbar (position top) */}
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

      <div style={{ pointerEvents: "none" /* text clicks shouldn't affect toolbar */ }}>
        <strong>{data.label}</strong>
      </div>
    </div>
  );
}

export default function Vedio13 () {
  const initialNodes = [
    { id: "1", position: { x: 120, y: 120 }, data: { label: "Node 1" }, type: "custom" },
    { id: "2", position: { x: 420, y: 120 }, data: { label: "Node 2" }, type: "custom" },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const onConnect = (params) =>
    setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: "#ff8c00" } }, eds));

  // Render custom node and forward selected state setters
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
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        // when user clicks on empty canvas, clear selection -> toolbar hides
        onPaneClick={() => setSelectedNodeId(null)}
        fitView
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}
