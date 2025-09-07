import { ReactFlow, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

function Vedio9() {
  const initialNodes = [
    { id: '1', position: { x: 100, y: 100 }, data: { label: 'Node 1' } },
    { id: '2', position: { x: 300, y: 100 }, data: { label: 'Node 2' } },
    { id: '3', position: { x: 100, y: 250 }, data: { label: 'Node 3' } },
    { id: '4', position: { x: 300, y: 250 }, data: { label: 'Node 4' } },
  ];

  const initialEdges = [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // जब हम एक node से दूसरे node पर drag करेंगे तो edge add होगी
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}

export default Vedio9;
