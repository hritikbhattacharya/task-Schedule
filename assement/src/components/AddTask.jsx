import React, { useState } from "react";

const AddTask = ({ handleClose, fetchTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Date.now(),
        title: title,
        description: description,
        status: "todo",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));

    handleClose();
    fetchTasks();
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <label className="flex flex-col">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
          />
        </label>
        <label className="flex flex-col">
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded"
          />
        </label>

        <div className=" flex mt-4 justify-center items-center ">
          <input
            type="submit"
            value="Submit"
            className=" bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600"
          />
          <input
            type="button"
            value="Reset"
            // onClick={handleReset}
            className="  bg-blue-500 text-white p-2 ml-2 rounded cursor-pointer hover:bg-blue-600"
          />
        </div>
      </form>
    </div>
  );
};

export default AddTask;
