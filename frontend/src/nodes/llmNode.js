import React from 'react';
import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode 
      id={id} 
      label="LLM" 
      handles={[
        { type: 'target', position: Position.Left, id: 'system', style: { top: '33%' } },
        { type: 'target', position: Position.Left, id: 'prompt', style: { top: '66%' } },
        { type: 'source', position: Position.Right, id: 'response' }
      ]}
    >
      <div className="node-content-wrapper">
        <span className="node-description">This is an LLM node.</span>
      </div>
    </BaseNode>
  );
};