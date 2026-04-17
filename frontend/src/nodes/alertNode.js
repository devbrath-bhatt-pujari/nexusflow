import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const AlertNode = ({ id }) => (
  <BaseNode 
    id={id} 
    label="Alert" 
    handles={[{ type: 'target', position: Position.Left, id: 'trigger' }]}
  >
    <p style={{ fontSize: '11px' }}>Sends a browser alert when triggered.</p>
  </BaseNode>
);