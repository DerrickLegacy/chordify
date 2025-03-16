import React, { useState, useEffect } from "react";
import AddTask from "../components/createTask/AddTask";
import SubTaskTableList from "../components/taskTable/SubTaskTableList";

export default function HomePage() {
  const [tasksFromLocalStorage, setTasksFromLocalStorage] = useState([]);

  const handleAccessingDataFromLocaleStorage = () => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      try {
        setTasksFromLocalStorage(JSON.parse(tasks));
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
        setTasksFromLocalStorage([]); 
      }
    } else {
      setTasksFromLocalStorage([]);
    }
  };

  const handleTriggerUpdate = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasksFromLocalStorage(updatedTasks);
  };

  useEffect(() => {
    handleAccessingDataFromLocaleStorage();
  }, []);

  console.log("tasksFromLocalStorage:", tasksFromLocalStorage);

  return (
    <>
      <AddTask causeUpdateTrigger={handleTriggerUpdate} tasks={tasksFromLocalStorage} />
      <SubTaskTableList updateResponse={handleTriggerUpdate} tasksDataToDisplay={tasksFromLocalStorage} />
    </>
  );
}