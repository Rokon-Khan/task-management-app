import { useDraggable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
// import TaskCard from "../../components/TaskCard";

const DraggableTaskCard = ({ task, index }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
    data: { task, index, category: task.category },
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <TaskCard task={task} />
    </div>
  );
};

export default DraggableTaskCard;
