// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// import TaskCard from "../../components/TaskCard";
// import useAuth from "../../hooks/useAuth";

// const fetchTasks = async (email) => {
//   const { data } = await axios.get(
//     `${import.meta.env.VITE_API_URL}/tasks?email=${email}`
//   );
//   return data;
// };

// const TaskList = () => {
//   const { user } = useAuth();
//   const userEmail = user?.email;

//   // Fetch tasks based on logged-in user's email
//   const {
//     data: tasks = [], // ✅ Default to an empty array
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["tasks", userEmail],
//     queryFn: () => fetchTasks(userEmail),
//     enabled: !!userEmail, // Only fetch when email is available
//   });

//   if (isLoading) return <LoadingSpinner />;
//   if (isError)
//     return <p className="text-center text-red-500">Failed to fetch tasks</p>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* <h1 className="text-2xl font-bold text-black text-center mb-6">
//         My Task List
//       </h1> */}

//       {tasks.length === 0 ? ( // ✅ No error if tasks is undefined
//         <p className="text-center text-gray-500">No tasks found.</p>
//       ) : (
//         <div className="grid grid-cols-1 gap-6">
//           {tasks.map((task) => (
//             <TaskCard key={task._id} task={task} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskList;

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { useState } from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// import TaskCard from "../../components/TaskCard";
// import useAuth from "../../hooks/useAuth";

// const fetchTasks = async (email) => {
//   const { data } = await axios.get(
//     `${import.meta.env.VITE_API_URL}/tasks?email=${email}`
//   );
//   return data;
// };

// const updateTaskOrder = async (tasks) => {
//   await axios.put(`${import.meta.env.VITE_API_URL}/tasks/reorder`, { tasks });
// };

// const TaskList = () => {
//   const { user } = useAuth();
//   const userEmail = user?.email;
//   const queryClient = useQueryClient();

//   // Fetch tasks
//   const {
//     data: tasks = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["tasks", userEmail],
//     queryFn: () => fetchTasks(userEmail),
//     enabled: !!userEmail,
//   });

//   // Store local state for drag-and-drop
//   const [taskList, setTaskList] = useState(tasks);

//   // Mutation to update the backend after drag-and-drop
//   const mutation = useMutation(updateTaskOrder, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["tasks", userEmail]); // Refresh task list
//     },
//   });

//   // Handle drag end event
//   const handleDragEnd = (result) => {
//     if (!result.destination) return;

//     // Reorder tasks locally
//     const newTaskList = Array.from(taskList);
//     const [movedTask] = newTaskList.splice(result.source.index, 1);
//     newTaskList.splice(result.destination.index, 0, movedTask);

//     setTaskList(newTaskList); // Update local state

//     // Send new order to the backend
//     mutation.mutate(newTaskList);
//   };

//   if (isLoading) return <LoadingSpinner />;
//   if (isError)
//     return <p className="text-center text-red-500">Failed to fetch tasks</p>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold text-black text-center mb-6">
//         My Task List
//       </h1>

//       {taskList.length === 0 ? (
//         <p className="text-center text-gray-500">No tasks found.</p>
//       ) : (
//         <DragDropContext onDragEnd={handleDragEnd}>
//           <Droppable droppableId="tasks">
//             {(provided) => (
//               <div
//                 className="grid grid-cols-1 gap-6"
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//               >
//                 {taskList.map((task, index) => (
//                   <Draggable
//                     key={task._id}
//                     draggableId={task._id}
//                     index={index}
//                   >
//                     {(provided) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                       >
//                         <TaskCard task={task} />
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </DragDropContext>
//       )}
//     </div>
//   );
// };

// export default TaskList;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import TaskCard from "../../components/TaskCard";
import useAuth from "../../hooks/useAuth";

const fetchTasks = async (email) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/tasks?email=${email}`
  );
  return data;
};

const TaskList = () => {
  const { user } = useAuth();
  const userEmail = user?.email;

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

  // State to manage task order
  const [taskList, setTaskList] = useState([]);

  // Load tasks from local storage or use fetched tasks
  useEffect(() => {
    const savedTasks = localStorage.getItem("taskList");
    if (savedTasks) {
      setTaskList(JSON.parse(savedTasks));
    } else {
      setTaskList(tasks);
    }
  }, [tasks]);

  // Handle drag end
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newTaskList = [...taskList];
    const [movedTask] = newTaskList.splice(result.source.index, 1);
    newTaskList.splice(result.destination.index, 0, movedTask);

    setTaskList(newTaskList);
    localStorage.setItem("taskList", JSON.stringify(newTaskList)); // Save to local storage
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return <p className="text-center text-red-500">Failed to fetch tasks</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-2xl font-bold text-black text-center mb-6">
        My Task List
      </h1> */}

      {taskList.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found.</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div
                className="grid grid-cols-1 gap-6"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {taskList.map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard task={task} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default TaskList;
