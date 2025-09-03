import {ReactFlow} from '@xyflow/react';
import '@xyflow/react/dist/style.css';


function App() {
  const nodes = [
    {id:"1", position : {x:100, y:100}, data:{label:"Parents Node"}},
    {id:"2", position : {x:50, y:200}, data:{label:"Child Node"}},
    {id:"3", position: {x:250, y:200}, data:{label:"Child Node"}}
  ]

  const edges = [
    {id:"e1-2", source:"1", target:"2"},
    {id:"e2-3", source:"1", target:"3"}
  ];

  return (
    <div style={{width:"100vw", height:"100vh"}}>
      <ReactFlow  nodes={nodes} edges={edges}/>
    </div>  
    );
}

export default App;
