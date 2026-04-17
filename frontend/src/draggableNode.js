//draggableNode.js
export const DraggableNode = ({ type, label }) => {
  const handleDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="toolbar-node"
      onDragStart={(event) => handleDragStart(event, type)} // Fixed reference
      draggable
    >
      <span>{label}</span>
    </div>
  );
};