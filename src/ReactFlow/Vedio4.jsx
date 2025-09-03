import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

function Vedio4() {
  const nodes = [
    {
      id: "1",
      position: { x: 100, y: 100 },
      data: { label: "Parent Node" },
      style: {
        background: "#3b82f6", // blue background
        color: "#fff",
        padding: 10,
        borderRadius: 8,
        fontWeight: "bold",
      },
    },
    {
      id: "2",
      position: { x: 50, y: 200 },
      data: { label: "Child Node" },
      style: {
        background: "#22c55e", // green background
        color: "#fff",
        padding: 10,
        borderRadius: 8,
      },
    },
    {
      id: "3",
      position: { x: 250, y: 200 },
      data: { label: "Child Node" },
      style: {
        background: "#f97316", // orange background
        color: "#fff",
        padding: 10,
        borderRadius: 8,
      },
    },
  ];

  const edges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e1-3", source: "1", target: "3" },
  ];

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow nodes={nodes} edges={edges} />
    </div>
  );
}

export default Vedio4;
