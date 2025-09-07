import { ReactFlow, useNodesState, useEdgesState, Handle, Position, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Custom Node with Handles
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
        position: 'relative',
      }}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: 'red', width: 10, height: 10 }}
      />

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

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: 'blue', width: 10, height: 10 }}
      />
    </div>
  );
}

function Vedio11() {
  const initialNodes = [
    { id: '1', position: { x: 200, y: 100 }, data: { label: 'Custom Parent' }, type: 'custom' },
    { id: '2', position: { x: 100, y: 300 }, data: { label: 'Custom Child 1' }, type: 'custom' },
    { id: '3', position: { x: 350, y: 300 }, data: { label: 'Custom Child 2' }, type: 'custom' },
  ];

  const initialEdges = []; // Start with no edges

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = { custom: CustomNode };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
        fitView
      />
    </div>
  );
}

export default Vedio11;
