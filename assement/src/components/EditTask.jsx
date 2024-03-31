import React, { useState } from "react";

const EditTask = ({ task, handleClose }) => {
  const [status, setStatus] = useState(task.status);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      id: task.id,
      status: status,
    };

    console.log("hello");

    fetch(`https://server-theta-drab.vercel.app/taskUpdate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));

    handleClose();
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <label>
        Status:
        <select value={status} onChange={handleStatusChange}>
          <option value="todo">todo</option>
          <option value="ongoing">ongoing</option>
          <option value="completed">completed</option>
        </select>
      </label>
      <input className=" p-1 bg-blue-300 rounded-md mt-2" type="submit" value="Submit" />
    </form>
  );
};

export default EditTask;
