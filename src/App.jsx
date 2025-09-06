import {Background, ReactFlow} from '@xyflow/react';
import '@xyflow/react/dist/style.css';


function App() {
  const nodes = [
    {
      id:"1",
      position : {x:100, y:100}, 
      data:{label:"Parents Node"}, 
      style:{
          background:"red",
          color:"#fff",
          borderRadius:20
    }
  },
    {id:"2", 
      position : {x:50, y:200}, 
      data:{label:"Child Node 1"},
      style:{
        background:'green',
        color:"white",
        fontWeight:'bold',
        fontSize:20
      }
    },
    {id:"3", 
      position: {x:250, y:200}, 
      data:{label:"Child Node 2 "},
      style:{
        background:"blue",
        color:'white',
        borderRadius:10
      }
    },
    {id:"4", 
      position: {x:450, y:200}, 
      data:{label:"Child Node 3"},
      style:{
        background:"#22c55e",
        color:'white',
        borderRadius:10
      }
    }
  ]

  const edges = [
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
      id:"e2-3", 
      source:"1", 
      target:"3",
      type:"smoothstep",
      style:{stroke:'blue', strokeWidth:2},
      animated:true
    },
    {id:"e2-4", 
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

  return (
    <div style={{width:"100vw", height:"100vh"}}>
      <ReactFlow  nodes={nodes} edges={edges}/>
    </div>  
    );
}

export default App;
