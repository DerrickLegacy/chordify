import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

export default function TaskCreationForm({ onCancel }) {
  const LOCAL_STORAGE_KEY = "spaceData";

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl">
      <Formik
        initialValues={{ spaceName: "", description: "" }}
        validationSchema={Yup.object({
          spaceName: Yup.string()
            .max(40, "Must be 40 characters or less")
            .required("Required"),
          description: Yup.string()
            .max(60, "Must be 60 characters or less")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values);

          setSubmitting(false);

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
          console.log(spaceDataFromLocalStorage)
          resetForm();
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className="space-y-4 text-left">
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
