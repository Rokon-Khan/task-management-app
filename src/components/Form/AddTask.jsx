import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AddTaskForm from "./AddTaskForm";

const AddTask = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const description = form.description.value;

    // seller info
    const User = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    // Create plant data object
    const taskData = {
      title,
      category,
      description,
      User,
    };

    console.table(taskData);
    // save plant in db
    try {
      // post req
      await axiosSecure.post("/tasks", taskData);
      toast.success("Data Added Successfully!");
    } catch (err) {
      console.log(err);
    } finally {
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
