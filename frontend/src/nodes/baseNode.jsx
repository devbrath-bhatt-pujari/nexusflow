import { Handle } from 'reactflow';

export const BaseNode = ({ id, label, children, handles = [] }) => {
  return (
    <div className="pipeline-node"> 
      <div className="node-header">
        {label}
      </div>

      <div className="node-content">
        {children}
      </div>

      {handles.map((h, idx) => (
        <Handle
          key={`${id}-handle-${idx}`}
          type={h.type}
          position={h.position}
          id={`${id}-${h.id}`}
          className="custom-handle"
          style={h.style}
        />
      ))}
    </div>
  );
};