import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function TaskDetails() {
  const { id } = useParams();
  const [taskData, setTaskData] = useState(null);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const task = tasks ? tasks.find((task) => task.taskId === Number(id)) : null;
    setTaskData(task);
  }, [id]);

  if (!taskData) {
    return <div className="text-center text-lg text-gray-600">Task not found</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h4 className="text-3xl font-semibold text-gray-800 mb-4">Task Details</h4>
      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="text-lg font-medium text-gray-700"><strong>Task Name:</strong> {taskData.taskTitle}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-lg font-medium text-gray-700"><strong>Start Date:</strong> {taskData.startDate}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-lg font-medium text-gray-700"><strong>End Date:</strong> {taskData.endDate}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-lg font-medium text-gray-700"><strong>Status:</strong> {taskData.status}</p>
        </div>
      </div>

      <div className="mt-8">
        <h5 className="text-2xl font-semibold text-gray-800 mb-4">Subtasks</h5>
        <ol className="space-y-2">
          {taskData.subTasks.length === 0 ? (
            <li className="text-gray-600">No subtasks available</li>
          ) : (
            taskData.subTasks.map((subtask) => (
              <li key={subtask.subtaskId} className="flex justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
                {subtask.value}
                
              </li>
            ))
          )}
        </ol>
      </div>
    </div>
  );
}
