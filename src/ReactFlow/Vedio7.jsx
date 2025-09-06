import { ReactFlow, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

function Vedio7() {
  const nodes = [
    {
      id: "1",
      position: { x: 100, y: 100 },
      data: { label: "Parent Node" },
      style: {
        background: "#3b82f6",
        color: "#fff",
        padding: 10,
        borderRadius: 8,
        fontWeight: "bold",
      },
    },
    {
      id: "2",
      position: { x: 300, y: 200 },
      data: { label: "Child Node" },
      style: {
        background: "#22c55e",
        color: "#fff",
        padding: 10,
        borderRadius: 8,
      },
    },
  ];

  const edges = [
    { id: "e1-2", source: "1", target: "2", animated: true },
  ];

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow nodes={nodes} edges={edges}>
        {/* 🔹 Background with dots */}
        <Background color="#aaa" gap={20} size={5} />

        {/* 🔹 Background with lines */}
        {/* <Background variant="lines" color="#888" gap={30} /> */}

        {/* 🔹 Background with cross */}
        {/* <Background variant="cross" color="red" gap={25} /> */}
      </ReactFlow>
    </div>
  );
}

export default Vedio7;
