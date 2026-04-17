import { useState, useRef, useEffect } from 'react';
import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  const [text, setText] = useState(data?.inputName || '');
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  }, [text]);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  return (
    <BaseNode 
      id={id} 
      label="Input" 
      handles={[{ type: 'source', position: Position.Right, id: 'value' }]}
    >
      <div className="node-content-wrapper">
        <div className="node-field">
          <label className="node-label">Field Name</label>
          <textarea
            ref={textAreaRef}
            className="node-textarea"
            value={text}
            onChange={handleInputChange}
            rows={1}
            placeholder="Enter name..."
          />
        </div>
      </div>
    </BaseNode>
  );
};