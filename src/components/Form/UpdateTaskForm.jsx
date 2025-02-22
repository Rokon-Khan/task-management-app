import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TbFidgetSpinner } from "react-icons/tb";

const UpdateTaskForm = ({ handleUpdate, loading, taskData }) => {
  // Initialize state with taskData
  const [deadline, setDeadline] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");

  // Set default values when taskData is available
  useEffect(() => {
    if (taskData) {
      setTitle(taskData.title || "");
      setDescription(taskData.description || "");
      setCategory(taskData.category || "To-Do");
      setDeadline(taskData.deadline ? new Date(taskData.deadline) : new Date());
    }
  }, [taskData]);

  return (
    <div className="w-full min-h-[calc(100vh-100px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={(e) => handleUpdate(e, deadline)}>
        <div className="grid grid-cols-1 gap-10">
          <div className="space-y-4">
            {/* Task Title */}
            <div className="space-y-1 text-lg">
              <label htmlFor="title" className="block text-gray-600">
                Task Title (Max 50 characters)
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
                name="title"
                id="title"
                type="text"
                placeholder="Task Title"
                maxLength={50}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <p className="bg-rose-200 text-sm text-gray-500 px-3 py-2 rounded-lg">
                {50 - title.length} characters left
              </p>
            </div>

            {/* Description */}
            <div className="space-y-1 text-lg">
              <label htmlFor="description" className="block text-gray-600">
                Task Description (Max 200 characters)
              </label>
              <textarea
                id="description"
                placeholder="Write Task description here..."
                className="block rounded-md focus:blue-300 w-full h-32 px-4 py-3 text-gray-800 border border-blue-300 bg-white focus:outline-blue-500"
                name="description"
                maxLength={200}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <p className="bg-rose-200 px-3 py-2 text-sm text-gray-500 rounded-lg">
                {200 - description.length} characters left
              </p>
            </div>

            {/* Category */}
            <div className="space-y-1 text-lg">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <select
                required
                className="w-full px-4 py-3 border-lime-300 focus:outline-blue-500 rounded-md bg-white"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            {/* Deadline */}
            <div className="space-y-1 text-lg">
              <label className="block text-gray-600">Deadline</label>
              <DatePicker
                selected={deadline}
                onChange={(date) => setDeadline(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full px-4 py-3 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-500"
                disabled={title.length === 0 || description.length === 0}
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Update To-Do Task"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

// Prop validation
UpdateTaskForm.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  taskData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    deadline: PropTypes.string,
  }),
};

export default UpdateTaskForm;
