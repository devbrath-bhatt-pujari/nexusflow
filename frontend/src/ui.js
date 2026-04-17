import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

// Node Imports
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { NoteNode } from './nodes/noteNode';
import { AlertNode } from './nodes/alertNode';
import { LogicNode } from './nodes/logicNode';
import { TimerNode } from './nodes/timerNode';
import { AuthenticationNode as AuthNode } from './nodes/authNode';

// Component Imports
import { PipelineToolbar } from './toolbar';
import { SubmitButton } from './submit'; // Ensure this path is correct

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  note: NoteNode,
  alert: AlertNode,
  logic: LogicNode,
  timer: TimerNode,
  auth: AuthNode,
};

// Inside src/ui.js
const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  // Ensure these names match exactly what is in your store.js
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const clearCanvas = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, [setNodes, setEdges]);

  const getInitNodeData = (nodeID, type) => {
    return { id: nodeID, nodeType: `${type}` };
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;
        if (!type) return;

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };
        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} className="pipeline-canvas-wrapper">
      <PipelineToolbar clearCanvas={clearCanvas} />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapToGrid={true}
        snapGrid={[gridSize, gridSize]}
        connectionLineType='smoothstep'
      >
        <Background
          variant="dots"
          gap={20}
          size={1.5}
          color="#475569" /* Using a lighter Slate-600 for high contrast */
          style={{ backgroundColor: '#020617' }} /* Explicitly setting the pane color here */
        />

        <div className="legend-container">
          <div className="legend-item"><span className="dot" style={{ backgroundColor: '#10b981' }}></span> Input</div>
          <div className="legend-item"><span className="dot" style={{ backgroundColor: '#6366f1' }}></span> LLM</div>
          <div className="legend-item"><span className="dot" style={{ backgroundColor: '#f43f5e' }}></span> Output</div>
          <div className="legend-item"><span className="dot" style={{ backgroundColor: '#8b5cf6' }}></span> Text</div>
          <div className="legend-item"><span className="dot" style={{ backgroundColor: '#f59e0b' }}></span> Note</div>
          <div className="legend-item"><span className="dot" style={{ backgroundColor: '#ef4444' }}></span> Alert</div>
          <div className="legend-item"><span className="dot" style={{ backgroundColor: '#06b6d4' }}></span> Logic</div>
          <div className="legend-item"><span className="dot" style={{ backgroundColor: '#ec4899' }}></span> Timer</div>
          <div className="legend-item"><span className="dot" style={{ backgroundColor: '#14b8a6' }}></span> Auth</div>
        </div>

        <Controls className="dark-controls" />
        <MiniMap className="dark-minimap" />
        <MiniMap
          nodeColor={(node) => {
            // Log this to your console to see what types are actually being passed
            // console.log(node.type); 

            switch (node.type) {
              case 'customInput': return '#10b981'; // Green
              case 'llm': return '#6366f1'; // Indigo
              case 'customOutput': return '#f43f5e'; // Rose
              case 'text': return '#8b5cf6'; // Violet
              case 'note': return '#f59e0b'; // Amber
              case 'alert': return '#ef4444'; // Red
              case 'logic': return '#06b6d4'; // Cyan
              case 'timer': return '#ec4899'; // Pink
              case 'auth': return '#14b8a6'; // Teal
              default: return '#94a3b8'; // Fallback Slate
            }
          }}
          maskColor="rgba(15, 23, 42, 0.7)"
        />
      </ReactFlow>

      {/* --- ADDED BACK: Submit button container --- */}
      <div className="submit-container">
        <SubmitButton />
      </div>
    </div>
  );
};