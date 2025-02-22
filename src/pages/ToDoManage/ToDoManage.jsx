import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
// import DraggableTaskCard from "./DraggableTaskCard";
import DraggableTaskCard from "../../components/DraggableTaskCard";
import DroppableContainer from "../../components/DroppableContainer";
// import DroppableContainer from "./DroppableContainer";

const fetchTasks = async (email) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/tasks?email=${email}`
  );
  return data;
};

const ToDoManage = () => {
  const { user } = useAuth();
  const userEmail = user?.email;
  const queryClient = useQueryClient();

  // Fetch tasks from backend
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks", userEmail],
    queryFn: () => fetchTasks(userEmail),
    enabled: !!userEmail,
  });

  // Categorized tasks state
  const initialTaskState = {
    "To-Do": tasks.filter((task) => task.category === "To-Do"),
    "In Progress": tasks.filter((task) => task.category === "In Progress"),
    Done: tasks.filter((task) => task.category === "Done"),
  };

  const [taskState, setTaskState] = useState(initialTaskState);

  // Optimistic UI mutation
  const mutation = useMutation(
    async (updatedTasks) => {
      return axios.put(
        `${import.meta.env.VITE_API_URL}/tasks/update`,
        updatedTasks
      );
    },
    {
      onMutate: async (newData) => {
        await queryClient.cancelQueries(["tasks", userEmail]);
        const previousData = queryClient.getQueryData(["tasks", userEmail]);
        queryClient.setQueryData(["tasks", userEmail], newData);
        return { previousData };
      },
      onError: (err, newData, context) => {
        queryClient.setQueryData(["tasks", userEmail], context.previousData);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["tasks", userEmail]);
      },
    }
  );

  // Handle drag end event
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const sourceCategory = active.data.current.category;
    const destinationCategory = over.data.current.category;

    if (sourceCategory === destinationCategory) {
      // Reorder within the same category
      const reorderedTasks = arrayMove(
        taskState[sourceCategory],
        active.data.current.index,
        over.data.current.index
      );

      const updatedState = { ...taskState, [sourceCategory]: reorderedTasks };
      setTaskState(updatedState);
      mutation.mutate(updatedState);
    } else {
      // Move task between categories
      const sourceTasks = [...taskState[sourceCategory]];
      const destinationTasks = [...taskState[destinationCategory]];
      const movedTask = sourceTasks.splice(active.data.current.index, 1)[0];
      movedTask.category = destinationCategory;

      destinationTasks.splice(over.data.current.index, 0, movedTask);

      const updatedState = {
        ...taskState,
        [sourceCategory]: sourceTasks,
        [destinationCategory]: destinationTasks,
      };

      setTaskState(updatedState);
      mutation.mutate(updatedState);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to fetch tasks</p>;

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="bg-zinc-300 max-w-7xl py-6 px-10 grid grid-cols-1 md:grid-cols-3 gap-6 rounded-lg shadow-xl mx-auto my-10">
        {["To-Do", "In Progress", "Done"].map((category) => (
          <DroppableContainer key={category} id={category} title={category}>
            <SortableContext items={taskState[category] || []}>
              {taskState[category]?.length === 0 ? (
                <p className="text-center text-gray-500">No tasks</p>
              ) : (
                taskState[category]?.map((task, index) => (
                  <DraggableTaskCard key={task._id} task={task} index={index} />
                ))
              )}
            </SortableContext>
          </DroppableContainer>
        ))}
      </div>
    </DndContext>
  );
};

export default ToDoManage;
