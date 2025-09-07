import { ReactFlow, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Step 1: Custom Node Component
function CustomNode({ data }) {
  return (
    <div
      style={{
        padding: 15,
        border: '2px solid #333',
        borderRadius: 10,
        background: '#facc15',
        color: '#000',
        textAlign: 'center',
        minWidth: 150,
      }}
    >
      <h4 style={{ margin: 0 }}>{data.label}</h4>
      <button
        style={{
          marginTop: 8,
          padding: '6px 10px',
          background: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
        }}
      >
        Click Me
      </button>
    </div>
  );
}

function Vedio10() {
  const initialNodes = [
    { id: '1', position: { x: 100, y: 100 }, data: { label: 'Custom Parent' }, type: 'custom' },
    { id: '2', position: { x: 350, y: 200 }, data: { label: 'Custom Child' }, type: 'custom' },
  ];

  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Step 2: Register Custom Node
  const nodeTypes = { custom: CustomNode };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      />
    </div>
  );
}

export default Vedio10;
