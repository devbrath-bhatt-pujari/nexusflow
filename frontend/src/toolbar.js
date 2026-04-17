// src/toolbar.js
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = ({ clearCanvas }) => {
    return (
        <div className="toolbar-container">
            {/* Standardized group for nodes to keep them in one row */}
            <div className="toolbar-nodes-group">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='note' label='Note' />
                <DraggableNode type='alert' label='Alert' />
                <DraggableNode type='logic' label='Logic' />
                <DraggableNode type='timer' label='Timer' />
                <DraggableNode type='auth' label='Auth' />
            </div>

            {/* Clear Button - ensure prop name matches clearCanvas */}
            <button className="clear-btn" onClick={clearCanvas}>
                Clear Canvas
            </button>
        </div>
    );
};