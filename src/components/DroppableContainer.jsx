import { useDroppable } from "@dnd-kit/core";

const DroppableContainer = ({ id, title, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="bg-white p-4 rounded-lg min-h-[300px]">
      <h3 className="text-2xl font-bold text-center mb-4">{title} Tasks</h3>
      {children}
    </div>
  );
};

export default DroppableContainer;
