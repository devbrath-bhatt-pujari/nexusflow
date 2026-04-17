import { useState } from 'react';
import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const AuthenticationNode = ({ id }) => {
  const [apiKey, setApiKey] = useState('');

  return (
    <BaseNode 
      id={id} 
      label="Authentication" 
      handles={[
        { type: 'source', position: Position.Right, id: 'success', style: { background: '#22c55e' } },
        { type: 'source', position: Position.Right, id: 'fail', style: { background: '#ef4444', top: '70%' } }
      ]}
    >
      <div className="node-content-wrapper">
        <label className="node-label">API Key:</label>
        <input 
          type="password" 
          className="node-input" 
          placeholder="Enter key..."
          value={apiKey} 
          onChange={(e) => setApiKey(e.target.value)} 
        />
      </div>
    </BaseNode>
  );
};