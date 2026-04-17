import React, { useState, useRef, useEffect } from 'react';
import { BaseNode } from './baseNode';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || '');
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  }, [note]);

  return (
    <BaseNode id={id} label="Note" handles={[]}>
      <div className="node-content-wrapper">
        <textarea
          ref={textAreaRef}
          className="node-textarea"
          placeholder="Record thoughts..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={1}
        />
      </div>
    </BaseNode>
  );
};