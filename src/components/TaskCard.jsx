// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { format } from "date-fns";
// import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const TaskCard = ({ task }) => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   // Parse timestamps
//   const createdAt = format(new Date(task.timestamp), "PPpp");
//   const deadlineDate = new Date(task.deadline);
//   const currentTime = new Date();

//   // Check deadline status
//   const isDeadlinePassed = deadlineDate < currentTime;

//   // Mutation for deleting a task
//   const deleteMutation = useMutation({
//     mutationFn: async (taskId) => {
//       await axios.delete(`/tasks/${taskId}`);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["tasks"]); // Refetch tasks after deletion
//       Swal.fire("Deleted!", "Your task has been deleted.", "success");
//     },
//   });

//   // Handle delete confirmation
//   const handleDelete = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteMutation.mutate(task._id);
//       }
//     });
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-5 border">
//       {/* Task Title */}
//       <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>

//       {/* Task Description */}
//       <p className="text-gray-600 mt-2">{task.description}</p>

//       {/* Category */}
//       <span className="inline-block px-3 py-1 mt-2 text-sm font-semibold text-white bg-blue-500 rounded">
//         {task.category}
//       </span>

//       {/* Creation Time */}
//       <p className="text-sm text-gray-500 mt-2">Created: {createdAt}</p>

//       {/* Deadline */}
//       <p
//         className={`text-sm font-semibold px-3 py-1 mt-2 rounded ${
//           isDeadlinePassed ? "bg-red-400 text-white" : "bg-green-400 text-white"
//         }`}
//       >
//         Deadline: {format(deadlineDate, "PPpp")}
//       </p>

//       {/* Buttons */}
//       <div className="flex justify-between items-center mt-4">
//         <button
//           onClick={() => navigate(`/update-task/${task._id}`)}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//         >
//           Update
//         </button>
//         <button
//           onClick={handleDelete}
//           className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// TaskCard.propTypes = {
//   task: PropTypes.object.isRequired,
// };

// export default TaskCard;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { format, isValid } from "date-fns";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TaskCard = ({ task }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Parse timestamps safely
  const createdAt = task.timestamp ? new Date(task.timestamp) : null;
  const deadlineDate = task.deadline ? new Date(task.deadline) : null;
  const currentTime = new Date();

  // Check if dates are valid
  const formattedCreatedAt = isValid(createdAt)
    ? format(createdAt, "PPpp")
    : "Invalid Date";

  const formattedDeadline = isValid(deadlineDate)
    ? format(deadlineDate, "PPpp")
    : "Invalid Deadline";

  // Check deadline status
  const isDeadlinePassed = isValid(deadlineDate) && deadlineDate < currentTime;

  // Mutation for deleting a task
  const deleteMutation = useMutation({
    mutationFn: async (taskId) => {
      await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]); // Refetch tasks after deletion
      Swal.fire("Deleted!", "Your task has been deleted.", "success");
    },
  });

  // Handle delete confirmation
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(task._id);
      }
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-5 border">
      {/* Task Title */}
      <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>

      {/* Task Description */}
      <p className="text-gray-600 mt-2">{task.description}</p>

      {/* Category */}
      <span className="inline-block px-3 py-1 mt-2 text-sm font-semibold text-white bg-blue-500 rounded">
        {task.category}
      </span>

      {/* Creation Time */}
      <p className="text-sm text-gray-500 mt-2">
        Created: {formattedCreatedAt}
      </p>

      {/* Deadline */}
      <p
        className={`text-sm font-semibold px-3 py-1 mt-2 rounded ${
          isDeadlinePassed ? "bg-red-400 text-white" : "bg-green-400 text-white"
        }`}
      >
        Deadline: {formattedDeadline}
      </p>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => navigate(`/update-task/${task._id}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskCard;
