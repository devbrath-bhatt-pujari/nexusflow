import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const LogicNode = ({ id }) => (
  <BaseNode 
    id={id} 
    label="Logic (AND)" 
    handles={[
      { type: 'target', position: Position.Left, id: 'a', style: { top: '30%' } },
      { type: 'target', position: Position.Left, id: 'b', style: { top: '70%' } },
      { type: 'source', position: Position.Right, id: 'out' }
    ]}
  >
    <div style={{ textAlign: 'center', color: '#666' }}>&</div>
  </BaseNode>
);