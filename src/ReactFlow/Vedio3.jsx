import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const nodes = [
  { id: "1", position: { x: 100, y: 100 }, data: { label: "Node 1" } },
  { id: "2", position: { x: 300, y: 100 }, data: { label: "Node 2" } },
  { id: "3", position: { x: 200, y: 250 }, data: { label: "Node 3" } },
];

const edges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
];

function Vedio3() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow nodes={nodes} edges={edges} />
    </div>
  );
}

export default Vedio3;
