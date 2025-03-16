import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";


const CreateTaskModal = ({ isOpen, onClose, onSave, nextTaskId }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [subTasks, setSubTasks] = useState([
    { value: "", subtaskStatus: "pending" },
  ]);

  const handleSubTaskChange = (index, value, deleteSubTask = false) => {
    if (deleteSubTask) {
      const newSubTasks = [...subTasks];
      newSubTasks.splice(index, 1);
      setSubTasks(newSubTasks);
    } else {
      const newSubTasks = [...subTasks];
      newSubTasks[index] = { value: value, subtaskStatus: "pending" };
      setSubTasks(newSubTasks);
    }
  };

  const addSubTask = () => {
    setSubTasks([...subTasks, ""]);
  };

  const saveTask = () => {
    onSave({ taskId: nextTaskId, taskTitle, subTasks, startDate:startDate,endDate:endDate, status: "pending" });
    setTaskTitle("");
    setSubTasks([""]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <LuListTodo 

                      className="size-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    />
                     
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-base font-semibold text-gray-900"
                      id="modal-title"
                    >
                      New ToDo Task
                    </h3>
                    <div className="mt-2">
                      <div className="px-6 py-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Task Title
                        </label>
                        <input
                          type="text"
                          className="mt-1 w-full p-2 border rounded-md"
                          placeholder="Enter task title..."
                          value={taskTitle}
                          onChange={(e) => setTaskTitle(e.target.value)}
                        />
                        <div className="grid grid-cols-2 gap-0.5 mt-1">
                          <div className="col">
                            <label className="block text-sm font-medium text-gray-700">
                              Start Date
                            </label>
                            <input
                              type="date"
                              className="mt-1 w-full p-2 border rounded-md"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                            />
                          </div>
                          <div className="col">
                            <label className="block text-sm font-medium text-gray-700">
                              End Date
                            </label>
                            <input
                              type="date"
                              className="mt-1 w-full p-2 border rounded-md"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                            />
                          </div>
                        </div>
                        <hr className="mt-2" />

                        <div className="mt-4">
                          <label className="block text-sm font-light text-gray-700">
                            Sub-Tasks
                          </label>
                          {subTasks.map((subTask, index) => (
                            <div
                              key={index}
                              className="grid grid-cols-[1fr_auto] gap-2 items-center"
                            >
                              <div className="col">
                                <input
                                  type="text"
                                  className="mt-1 w-full p-2 border rounded-md"
                                  placeholder={`Sub-task ${index + 1}`}
                                  id={index + 1}
                                  value={subTask.value}
                                  onChange={(e) =>
                                    handleSubTaskChange(index, e.target.value)
                                  }
                                />
                              </div>

                              <div className="col">
                                <button
                                  type="button"
                                  className="flex items-center justify-center size-8 bg-red-500 text-white rounded-md hover:bg-red-600"
                                  onClick={() =>
                                    handleSubTaskChange(index, "", true)
                                  }
                                >
                                  <MdDeleteForever className="size-7" />
                                </button>
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                            onClick={addSubTask}
                          >
                            + Add Sub-task
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={saveTask}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTaskModal;
