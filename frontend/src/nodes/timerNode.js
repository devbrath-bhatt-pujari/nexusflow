import React, { useState } from 'react';
import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || '1000');

  return (
    <BaseNode 
      id={id} 
      label="Timer" 
      handles={[
        { type: 'target', position: Position.Left, id: 'in' },
        { type: 'source', position: Position.Right, id: 'out' }
      ]}
    >
      <div className="node-content-wrapper">
        <label className="node-label">Delay (ms):</label>
        <input 
          type="number" 
          className="node-input" 
          value={delay} 
          onChange={(e) => setDelay(e.target.value)} 
        />
      </div>
    </BaseNode>
  );
};