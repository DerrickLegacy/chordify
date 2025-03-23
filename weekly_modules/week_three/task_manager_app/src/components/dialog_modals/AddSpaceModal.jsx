import React ,{useRef} from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import SpaceCreationForm from "../forms/SpaceCreationForm";

export default function AddSpaceModal({ AddSpaceModalIsCancelled ,title,formType,newTaskData}) {
  const formikRef = useRef(null); 
  const  handleNewTaskData=(data)=>{
    console.log("New task 2:",data)
    newTaskData(data);
  }

  const handleCancelClick = () => {
    AddSpaceModalIsCancelled(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl p-2">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
              <IoAddCircleOutline className="text-blue-500 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
          </div>
          <button
            onClick={handleCancelClick}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mt-4">
        <SpaceCreationForm newTaskData={handleNewTaskData}  formType={formType}  onCancel={handleCancelClick} formikRef={formikRef} />
        </div>

        
      </div>
    </div>
  );
}
