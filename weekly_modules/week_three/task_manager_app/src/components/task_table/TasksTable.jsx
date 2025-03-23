import React, { useState, useEffect } from "react";
import { CiSearch, CiClock1 } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function TasksTable({
  updateResponse,
  onDeleteTask,
  spaceData,
  spaceId,
}) {
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReLoad] = useState(false);
  const LOCAL_STORAGE_KEY = "spaceData";

  useEffect(() => {
    setLoading(true);
    const spaceDataFromLocalStorage =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    if (spaceDataFromLocalStorage.length > 0) {
      setTaskData(spaceData.tasks);
    } else {
      setTaskData(spaceData.tasks || []);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(spaceData.tasks));
    }
    setLoading(false);
  }, [spaceData, reload]);

  const handleCheckboxChange = (taskId = null, checkAll = false) => {
    const spaceDataFromLocalStorage =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  
    const updatedSpaceData = spaceDataFromLocalStorage.map((space) => {
      if (space.spaceId === spaceId) {
        return {
          ...space,
          tasks: space.tasks.map((task, index) => {
            if (checkAll) {
              const newStatus =
                space.tasks[0].status === "completed" ? "pending" : "completed";
              return { ...task, status: newStatus };
            }
  
            if (task.taskId === taskId) {
              return {
                ...task,
                status: task.status === "completed" ? "pending" : "completed",
              };
            }
  
            return task;
          }),
        };
      }
      return space;
    });
  
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedSpaceData));
  
    const updatedSpace = updatedSpaceData.find(
      (space) => space.spaceId === spaceId
    );
  
    if (updatedSpace) {
      console.log("Updated Tasks for Space:", updatedSpace.tasks);
      setTaskData(updatedSpace.tasks);
    } else {
      console.error("Space not found for spaceId:", spaceId);
      return [];
    }
  };
  
  const handleDeleteTask = (taskId) => {
    const updatedTasks = taskData.filter((task) => task.taskId !== taskId);
    setTaskData(updatedTasks);
    onDeleteTask(taskId);
  };

  const handleStatusChange = (selectedStatus) => {
    if (selectedStatus === "") {
      setTaskData(tasksDataToDisplay || []);
    } else {
      const filteredTasks = tasksDataToDisplay.filter(
        (task) => task.status === selectedStatus
      );
      setTaskData(filteredTasks);
    }
  };

  const handleSearchChange = (searchTerm) => {
    if (!searchTerm.trim()) {
      setTaskData(tasksDataToDisplay || []);
      return;
    }

    const filteredTasks = tasksDataToDisplay.filter(
      (task) =>
        task.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setTaskData(filteredTasks);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <CiClock1 className="w-5 h-5 text-gray-400" />
            </div>
            <select
              onChange={(e) => handleStatusChange(e.target.value)}
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
              aria-label="Select task status"
            >
              <option value="">Select status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
              <CiSearch className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              onChange={(e) => handleSearchChange(e.target.value)}
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for items"
              aria-label="Search tasks"
            />
          </div>
        </div>

        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="p-4">
                Toggle{" "}
                <input
                  type="checkbox"
                  onChange={(e) => handleCheckboxChange(null, e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                  aria-label="Select all tasks"
                />
              </th>
              <th scope="col" className="px-6 py-3">
                Task name
              </th>
              <th scope="col" className="px-6 py-3">
                Start Date
              </th>
              <th scope="col" className="px-6 py-3">
                End Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : taskData.length !== 0 ? (
              taskData.map((task) => (
                <tr
                  key={task.taskId}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  {/* {console.log("TASKS",task)} */}
                  <td className="w-4 p-4">
                    <input
                      type="checkbox"
                      checked={task.status === "completed"}
                      onChange={() => handleCheckboxChange(task.taskId)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                      aria-label={`Mark task ${task.taskTitle} as ${
                        task.status === "completed" ? "pending" : "completed"
                      }`}
                    />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    {task.taskTitle}
                  </th>
                  <td className="px-6 py-4">{task.startDate}</td>
                  <td className="px-6 py-4">{task.endDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-sm font-semibold rounded-full ${
                        task.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <Link to={`/task-details-/${task.taskId}`}>
                      <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-800">
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteTask(task.taskId)}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
