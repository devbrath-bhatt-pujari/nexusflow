import React, { useState, useRef, useEffect, useMemo } from 'react';
import { BaseNode } from './baseNode';
import { Position } from 'reactflow';
import { useStore } from '../store'; 

export const TextNode = ({ id, data }) => {
  // 1. Local state for immediate UI responsiveness
  const [text, setText] = useState(data?.text || '{{input}}');
  const textAreaRef = useRef(null);
  
  // 2. Grab the update function from your Zustand store
  const updateNodeField = useStore((s) => s.updateNodeField);

  // 3. Sync text to global store (Debounced to avoid store spamming)
  useEffect(() => {
    const handler = setTimeout(() => {
      updateNodeField(id, 'text', text);
    }, 300); 
    return () => clearTimeout(handler);
  }, [text, id, updateNodeField]);

  // 4. Handle auto-resize logic
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [text]);

  // 5. Compute handles dynamically (Memoized for performance)
  const handles = useMemo(() => {
    const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [...text.matchAll(variableRegex)];
    
    // Ensure unique IDs to prevent ReactFlow handle collisions
    const uniqueVars = [...new Set(matches.map((m) => m[1]))];

    const generatedHandles = uniqueVars.map((varName, index) => ({
      id: `${id}-${varName}`, // Unique ID scoped to this node
      type: 'target',
      position: Position.Left,
      // Percentage-based distribution for better aesthetics
      style: { top: `${((index + 1) * 100) / (uniqueVars.length + 1)}%` },
    }));

    return [
      ...generatedHandles,
      { id: `${id}-output`, type: 'source', position: Position.Right },
    ];
  }, [text, id]);

  return (
    <BaseNode id={id} label="Text" handles={handles}>
      <div className="node-content-wrapper">
        <div className="input-group">
          <label className="node-label">Text</label>
          <textarea
            ref={textAreaRef}
            className="node-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={1}
            placeholder="Type {{variable}}..."
          />
        </div>
      </div>
    </BaseNode>
  );
};