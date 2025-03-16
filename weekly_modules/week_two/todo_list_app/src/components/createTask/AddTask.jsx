import React, { useState } from "react";
import CreateTaskModal from "./CreateTaskModal";

export default function AddTask({ causeUpdateTrigger, tasks }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const saveTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    causeUpdateTrigger(updatedTasks);
  };

  return (
    <>
      <div className="grid grid-cols-1 mt-3 p-4">
        <div className="col-1 flex justify-end text-right">
          <button
            onClick={openModal}
            className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          >
            Add Task
          </button>
        </div>
      </div>
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={saveTask}
        nextTaskId={tasks.length + 1}
      />
    </>
  );
}
