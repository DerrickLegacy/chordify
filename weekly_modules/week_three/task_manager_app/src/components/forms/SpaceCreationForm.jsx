import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

export default function SpaceCreationForm({ onCancel, formType, newTaskData }) {
  const LOCAL_STORAGE_KEY = "spaceData";

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl">
      <Formik
        initialValues={{
          spaceName: "",
          description: "",
          taskTitle: "",
          startDate: "",
          endDate: "",
        }}
        validationSchema={Yup.object({
          spaceName:
            formType !== "task"
              ? Yup.string()
                  .max(40, "Must be 40 characters or less")
                  .required("Required")
              : Yup.string(),

          description:
            formType !== "task"
              ? Yup.string()
                  .max(60, "Must be 60 characters or less")
                  .required("Required")
              : Yup.string(),

          taskTitle:
            formType === "task"
              ? Yup.string().required("Required")
              : Yup.string(),
          startDate:
            formType === "task"
              ? Yup.date().required("Start date is required")
              : Yup.date(),
          endDate:
            formType === "task"
              ? Yup.date()
                  .min(
                    Yup.ref("startDate"),
                    "End date cannot be before start date"
                  )
                  .required("End date is required")
              : Yup.date(),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values);
          setSubmitting(false);

          if (formType !== "task") {
            const spaceDataFromLocalStorage =
              JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

            const newSpace = {
              SpaceName: values.spaceName,
              spaceId: "SP" + (spaceDataFromLocalStorage.length + 1),
              Description: values.description,
              TeamMember: [],
              tasks: [],
            };

            spaceDataFromLocalStorage.push(newSpace);
            localStorage.setItem(
              LOCAL_STORAGE_KEY,
              JSON.stringify(spaceDataFromLocalStorage)
            );
          } else {
            const newTask = {
              taskId: Date.now(),
              taskTitle: values.taskTitle,
              subTasks: [],
              startDate: values.startDate,
              endDate: values.endDate,
              status: "pending",
            };
            newTaskData(newTask)
            console.log("newTask 1",newTask);
          }
          onCancel()
          resetForm();
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className="space-y-4 text-left">
            {formType !== "task" && (
              <>
                <div>
                  <label
                    htmlFor="spaceName"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Space Name
                  </label>
                  <input
                    id="spaceName"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    {...formik.getFieldProps("spaceName")}
                  />
                  {formik.touched.spaceName && formik.errors.spaceName ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.spaceName}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    {...formik.getFieldProps("description")}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.description}
                    </div>
                  ) : null}
                </div>
              </>
            )}

            {formType === "task" && (
              <>
                <div>
                  <label
                    htmlFor="taskTitle"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Task Title
                  </label>
                  <input
                    id="taskTitle"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    {...formik.getFieldProps("taskTitle")}
                  />
                  {formik.touched.taskTitle && formik.errors.taskTitle ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.taskTitle}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Start Date
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    {...formik.getFieldProps("startDate")}
                  />
                  {formik.touched.startDate && formik.errors.startDate ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.startDate}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-600"
                  >
                    End Date
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    {...formik.getFieldProps("endDate")}
                  />
                  {formik.touched.endDate && formik.errors.endDate ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.endDate}
                    </div>
                  ) : null}
                </div>
              </>
            )}

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  formik.resetForm();
                  if (onCancel) onCancel();
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-red-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
              >
                Add
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
