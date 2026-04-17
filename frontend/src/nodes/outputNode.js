import React, { useState, useRef, useEffect } from 'react'; 
import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');
  
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  }, [currName]);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode 
      id={id} 
      label="Output" 
      handles={[{ type: 'target', position: Position.Left, id: `${id}-value` }]}
    >
      <div className="node-content-wrapper">
        <div className="node-field">
          <label className="node-label">Name:</label>
          <textarea 
            ref={textAreaRef}
            className="node-textarea"
            value={currName} 
            onChange={handleNameChange} 
            rows={1}
          />
        </div>
        <div className="node-field">
          <label className="node-label">Type:</label>
          <select 
            className="node-select" 
            value={outputType} 
            onChange={handleTypeChange}
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
}