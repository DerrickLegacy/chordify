import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import TasksTable from "../../components/task_table/TasksTable";

export default function Space() {
  const [spaceData, setSpaceData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { spaceId } = useParams();
  const LOCAL_STORAGE_KEY = "spaceData";

  useEffect(() => {
    const spaceDataFromLocalStorage =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    const filteredSpaceData = spaceDataFromLocalStorage.filter(
      (space) => space.spaceId === spaceId
    );

    if (filteredSpaceData.length > 0) {
      setSpaceData(filteredSpaceData[0]);
    } else {
      setSpaceData(null);
    }

    setLoading(false);
  }, [spaceId]);

  useEffect(() => {
    if (spaceData) {
      const spaceDataFromLocalStorage =
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
      const updatedSpaceData = spaceDataFromLocalStorage.map((space) =>
        space.spaceId === spaceId ? spaceData : space
      );
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedSpaceData));
    }
  }, [spaceData, spaceId]);

  const handleAddTask = (newTask) => {
    if (spaceData) {
      const updatedTasks = [...spaceData.tasks, newTask];
      const updatedSpaceData = { ...spaceData, tasks: updatedTasks };
      setSpaceData(updatedSpaceData);
    }
  };

  const handleUpdateTask = (updatedTask) => {
    if (spaceData) {
      const updatedTasks = spaceData.tasks.map((task) =>
        task.taskId === updatedTask.taskId ? updatedTask : task
      );
      const updatedSpaceData = { ...spaceData, tasks: updatedTasks };
      setSpaceData(updatedSpaceData);
    }
  };

  const handleCheckboxChange = (taskId = null, checkAll = false) => {
    const updatedTasks = taskData.map((task) => {
      if (checkAll) {
        return { ...task, status: "completed" };
      }
      if (task.taskId === taskId) {
        return {
          ...task,
          status: task.status === "completed" ? "pending" : "completed",
        };
      }
      return task;
    });

    setTaskData(updatedTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (taskId) => {
    const spaceDataFromLocalStorage =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

    const updatedSpaceData = spaceDataFromLocalStorage.map((space) => {
      if (space.spaceId === spaceId) {
        return {
          ...space,
          tasks: space.tasks.filter((task) => task.taskId !== taskId),
        };
      }
      return space;
    });
    console.log("updatedSpaceData:", updatedSpaceData);

    const updatedSpace = updatedSpaceData.find(
      (space) => space.spaceId === spaceId
    );
    setSpaceData(updatedSpace);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!spaceData) {
    return <div>Space not found.</div>;
  }

  return (
    <>
      <div className="text-left font-bold mt-3">
        <p>
          <Link to="/" className="text-blue-500">
            Home
          </Link>
          /Manage Task Space - {spaceData.SpaceName}
        </p>
        <p className="text-3xl mt-2">Space Name: {spaceData.SpaceName}</p>
      </div>
      <div className="text-right">
        <button
          type="button"
          onClick={() =>
            handleAddTask({
              taskId: Date.now(), 
              taskTitle: "New Task",
              subTasks: [],
              startDate: new Date().toISOString().split("T")[0],
              endDate: new Date().toISOString().split("T")[0],
              status: "pending",
            })
          }
          className="mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Add Task
        </button>
      </div>
      <div className="mb-3">
        <TasksTable
          spaceData={spaceData}
          spaceId={spaceId}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </>
  );
}
