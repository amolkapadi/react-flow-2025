import { 
  ReactFlow, 
  useNodesState, 
  useEdgesState, 
  Background, 
  MiniMap, 
  Controls 
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

function Vedio8() {
  const intialNodes = [
    {
      id:"1",
      position : {x:100, y:100}, 
      data:{label:"Parents Node"}, 
      style:{
          background:"red",
          color:"#fff",
          borderRadius:20,
          width: 140,
          height: 50
      }
    },
    {
      id:"2", 
      position : {x:50, y:200}, 
      data:{label:"Child Node 1"},
      style:{
        background:'green',
        color:"white",
        fontWeight:'bold',
        fontSize:20,
        width: 140,
        height: 50
      }
    },
    {
      id:"3", 
      position: {x:250, y:200}, 
      data:{label:"Child Node 2 "},
      style:{
        background:"blue",
        color:'white',
        borderRadius:10,
        width: 140,
        height: 50
      }
    },
    {
      id:"4", 
      position: {x:450, y:200}, 
      data:{label:"Child Node 3"},
      style:{
        background:"#22c55e",
        color:'white',
        borderRadius:10,
        width: 140,
        height: 50
      }
    }
  ];

  const initialEdges = [
    {
      id:"e1-2", 
      source:"1", 
      target:"2",
      type:'step',
      style:{
        stroke:"red",
        strokeWidth:3
      }
    },
    {
      id:"e1-3", 
      source:"1", 
      target:"3",
      type:"smoothstep",
      style:{stroke:'blue', strokeWidth:2},
      animated:true
    },
    {
      id:"e1-4", 
      source:"1", 
      target:"4",
      type:"bezier",
      style:{
        stroke:"green",
        strokeWidth:3,
        strokeDasharray:"15"
      }
    }
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(intialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{width:"100vw", height:"100vh"}}>
      <ReactFlow  
        nodes={nodes} 
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        {/* 🔹 Background */}
        <Background variant='cross' color='green' gap={80} />

        {/* 🔹 MiniMap */}
        <MiniMap 
          nodeStrokeWidth={1}   // border की मोटाई
          zoomable   // minimap zoom हो सकता है
          pannable   // minimap pan किया जा सकता है
          maskColor="red" // बाकी area का dim color
          // position="top-left"   
        />

        {/* 🔹 Controls */}
        <Controls 
          showZoom={true} 
          showFitView={true} 
          showInteractive={true} 
        />
      </ReactFlow>
    </div>  
  );
}

export default Vedio8;
