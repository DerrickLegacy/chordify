import React, { useEffect, useState } from "react";
import SpaceCard from "../../components/cards/SpaceCard";
import AddSpaceModal from "../../components/dialog_modals/AddSpaceModal";

export default function Home() {
  const [showAddSpaceModal, setShowAddSpaceModal] = useState(false);
  const [taskSpacesDataToDisplay, setTaskSpacesDataToDisplay] = useState([]);
  const LOCAL_STORAGE_KEY = "spaceData"; 

  const handleCreateSpaceClick = () => {
    setShowAddSpaceModal(true);
  };

  const handleAddSpaceModalIsCancelled = () => {
    setShowAddSpaceModal(false);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/database/taskSpaces.json");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("Fetched data:", data);

      setTaskSpacesDataToDisplay(data);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const spaceDataFromLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    if (spaceDataFromLocalStorage.length > 0) {
      setTaskSpacesDataToDisplay(spaceDataFromLocalStorage);
    } else {
      fetchData();
    }
  }, []);

  return (
    <div>
      <main className="mt-3 min-h-full">
        <div className="text-left font-bold">
          <p>Home/</p>
        </div>
        <div className="text-right">
          <button
            type="button"
            onClick={handleCreateSpaceClick}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Add Space
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {taskSpacesDataToDisplay.length !== 0 ? (
            taskSpacesDataToDisplay.map((space) => (
              <SpaceCard
                key={space.spaceId}
                spaceID={space.spaceId}
                SpaceName={space.SpaceName}
                Description={space.Description}
              />
            ))
          ) : (
            <p>No spaces available</p>
          )}
        </div>
        {showAddSpaceModal && (
          <AddSpaceModal title={"Create Task Space"}
            AddSpaceModalIsCancelled={handleAddSpaceModalIsCancelled}
          />
        )}
      </main>
    </div>
  );
}