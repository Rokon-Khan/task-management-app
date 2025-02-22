import { format } from "date-fns";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AddTaskForm from "./AddTaskForm";

const AddTask = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // handle form submit
  const handleSubmit = async (e, deadline) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const description = form.description.value;

    // Format the deadline
    const formattedDeadline = format(deadline, "yyyy-MM-dd HH:mm:ss");

    // User info
    const User = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    // Create task data object
    const taskData = {
      title,
      category,
      description,
      deadline: formattedDeadline,
      User,
    };

    console.table(taskData);

    // Save task in db
    try {
      await axiosSecure.post("/tasks", taskData);
      toast.success("Task Added Successfully!");
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/");
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Add To-Do Task | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddTaskForm handleSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default AddTask;
