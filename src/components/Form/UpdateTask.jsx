import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Shared/LoadingSpinner";
import UpdateTaskForm from "./UpdateTaskForm";

const UpdateTask = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Fetch class data using TanStack Query
  const {
    data: taskData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["class", id],
    queryFn: async () => {
      if (!id) throw new Error("Class ID is missing.");
      const { data } = await axiosSecure.get(`/tasks/${id}`);
      return data;
    },
    retry: false, // Prevent infinite retry loops
  });
  // handle form submit

  // Handle update submission
  const handleUpdate = async (e, deadline) => {
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
    const updateTaskData = {
      title,
      category,
      description,
      deadline: formattedDeadline,
      User,
    };

    try {
      await axiosSecure.put(`/tasks/${id}`, updateTaskData);
      Swal.fire("Success!", "Tasks updated successfully!", "success");
      navigate("/");
    } catch (error) {
      console.error("Error updating class:", error);
      toast.error("Failed to update class!");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    console.error("Error fetching class data:", error);
    return (
      <p className="text-red-500">
        Error loading class data: {error.message || "Unknown error occurred."}
      </p>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Update To-Do Task | Task Manage App</title>
      </Helmet>

      {/* Form */}
      <UpdateTaskForm
        handleUpdate={handleUpdate}
        taskData={taskData}
        loading={loading}
      />
    </div>
  );
};

export default UpdateTask;
