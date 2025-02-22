// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// import TaskCard from "../../components/TaskCard";

// const fetchTasks = async () => {
//   const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
//   return data;
// };

// const TaskList = () => {
//   const {
//     data: tasks,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["tasks"],
//     queryFn: fetchTasks,
//   });

//   if (isLoading) return <LoadingSpinner />;
//   if (isError)
//     return <p className="text-center text-red-500">Failed to fetch tasks</p>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
//         Task List
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {tasks.map((task) => (
//           <TaskCard key={task._id} task={task} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TaskList;

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// import TaskCard from "../../components/TaskCard";
// import useAuth from "../../hooks/useAuth";

// const fetchTasks = async (email) => {
//   const { data } = await axios.get(
//     `${import.meta.env.VITE_API_URL}/tasks?email=${email}`
//   );
//   console.log(data);

//   return data;
// };

// const TaskList = () => {
//   const { user } = useAuth();
//   const userEmail = user?.email;

//   // Fetch tasks based on logged-in user's email
//   const {
//     data: tasks,
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
//       <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
//         My Task List
//       </h1>

//       {tasks.length === 0 ? (
//         <p className="text-center text-gray-500">No tasks found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {tasks.map((task) => (
//             <TaskCard key={task._id} task={task} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskList;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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

  // Fetch tasks based on logged-in user's email
  const {
    data: tasks = [], // ✅ Default to an empty array
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks", userEmail],
    queryFn: () => fetchTasks(userEmail),
    enabled: !!userEmail, // Only fetch when email is available
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return <p className="text-center text-red-500">Failed to fetch tasks</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
        My Task List
      </h1>

      {tasks.length === 0 ? ( // ✅ No error if tasks is undefined
        <p className="text-center text-gray-500">No tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
