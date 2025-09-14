import React, { useState } from "react";
import {Controls, ReactFlow, useNodesState, NodeToolbar} from "@xyflow/react";
import '@xyflow/react/dist/style.css';


function CustomNode({id, data, setNodes, selectedNodeId, setSelectedNodeId}){
    const [hover, setHover] = useState(false);

    const isVisible = hover || selectedNodeId === id;

    const handleDelete = (e) => {
      e.stopPropagation();
      setNodes((nds) => nds.filter((node)=> node.id !== id))
      if(selectedNodeId === id) setSelectedNodeId(null);

    }
    const handleEdit = (e) => {
        e.stopPropagation();
        const newLabel = prompt("Enter new Label:", data.label);
        
        if(newLabel !== null && newLabel !== ""){
          setNodes((nds) => 
            nds.map((node) => 
            node.id === id ? {...node, data:{...node.data, label:newLabel}}:node)
          );
        }

    }


  return( 
    <div 
      style={{
        padding:12,
        border:"1px solid #333",
        borderRadius:8,
        background:"blue",
        textAlign:"center",
        minWidth:140,
        cursor:"pointer",
        color:"white"
      }}
      onMouseEnter={()=> setHover(true)}
      onMouseLeave={()=>setHover(false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedNodeId(id);
      }}
    >
      <NodeToolbar isVisible={isVisible} position="top">
          <button
          onClick={handleEdit}
            style={{
              background:"green",
              color:"white",
              border:"none",
              padding:"6px 10px",
              marginRight:6,
              borderRadius:6,
              cursor:"pointer"
            }}
          >
          Edit
          </button>
          <button
          onClick={handleDelete}
              style={{
              background:"red",
              color:"white",
              border:"none",
              padding:"6px 10px",
              borderRadius:6,
              cursor:"pointer"
            }}
          >
          Delete
          </button>

      </NodeToolbar>
      <div style={{pointerEvents:"none"}}>
          <strong>{data.label}</strong>
      </div>
    </div>
  )
}

export default function Vedio13() {
    const initialNodes =[
      {id:"1", position : {x:120,y:120}, data: {label:"Node 1"}, type:"custom"},
      {id:"2", position : {x:420,y:120}, data: {label:"Node 2"}, type:"custom"}
    ]
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [selectedNodeId, setSelectedNodeId] = useState(null);

    const nodeTypes = {
      custom :(props) =>(
        <CustomNode 
          {...props}
          setNodes={setNodes}
          selectedNodeId={selectedNodeId}
          setSelectedNodeId={setSelectedNodeId}
        />
      )
    }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          onPaneClick={() =>setSelectedNodeId(null)}
        >
          <Controls />
        </ReactFlow>
    </div>
  );
}
