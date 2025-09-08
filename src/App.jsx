import {ReactFlow, useNodesState, useEdgesState, addEdge, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';


function CustomNode ({data}){
  return(
    <div 
      style={{
        padding:10,
        border:'2px solid #333',
        borderRadius:10,
        background:"yellow",
        color:"#000",
        textAlign:"center",
        minWidth:150
      }}
    >
    <Handle 
      type='target'
      position={Position.Top}
      style={{background:'red', width:10, height:10}}
    />
      <h4 style={{margin:0}}>{data.label}</h4>
      <button 
        style={{
          marginTop:8,
          padding:"6px 10px",
          background:"blue",
          borderRadius:6,
          cursor:"pointer",
          color:"white"
        }}
      >Click me</button>
      <Handle 
      type='source'
      position={Position.Bottom}
      style={{background:'blue', width:10, height:10}}
      />
    </div>
  )
}


function App() {
  const initialNodes = [
    {id:"1", position: {x:100, y:100}, data:{label:"Node 1"}, type:"custom"},
    {id:"2", position: {x:300, y:100}, data:{label:"Node 2"}, type:"custom"},
   
  ]

  const initialEdges =[];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


  const nodeTypes = {custom :CustomNode};
  
  return (
    <div style={{width:"100vw", height:"100vh"}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
      >

      </ReactFlow>
    </div>  
    );
}

export default App;
