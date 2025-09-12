import { ReactFlow, Controls, ControlButton, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { SquarePlus, Trash2 } from 'lucide-react';  // 👈 नए icons

function App() {
  // Start with empty nodes & edges
  const initialNodes = [];
  const initialEdges = [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Add Node function
  const addNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `Node ${nodes.length + 1}` },
      style: {
        background: "#3b82f6",
        color: "#fff",
        padding: 10,
        borderRadius: 8,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  // Remove Last Node function
  const removeNode = () => {
    if (nodes.length > 0) {
      setNodes((nds) => nds.slice(0, -1));
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            edge.source !== `${nodes.length}` && edge.target !== `${nodes.length}`
        )
      );
    }
  };

  // Connect Nodes with drag
  const onConnect = (params) =>
    setEdges((eds) =>
      addEdge(
        { ...params, animated: true, style: { stroke: "orange", strokeWidth: 2 } },
        eds
      )
    );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}   // 👈 drag connect enable
        fitView
      >
        <Controls>
          <ControlButton onClick={addNode} title="Add Node">
            <SquarePlus size={18} />
          </ControlButton>
          <ControlButton onClick={removeNode} title="Remove Node">
            <Trash2 size={18} />
          </ControlButton>
        </Controls>
      </ReactFlow>
    </div>
  );
}

export default App;
