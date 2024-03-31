import React, { useState } from "react";
import Modal from "../Utils/dialogbox/Modal";
import EditTask from "./EditTask";

const Task = ({ task, index, fetchTasks, handleCloseBox }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [show, setShow] = useState(false);

  //   console.log(updateTask);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  //   console.log(typeof fetchTasks);

  const handleDelete = (taskId) => {
    fetch(`https://server-theta-drab.vercel.app/task`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: taskId }),
    })
      .then((response) => response.text())
      .then((message) => {
        console.log(message);
        fetchTasks(); // Fetch tasks after the task is deleted
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <div
      key={index}
      className=" task-container flex flex-col p-3 m-2 w-56 bg-white rounded-xl"
    >
      <div className=" flex items-center justify-between w-full mt-1">
        <p className=" font-bold">{task.title}</p>
        <div className="menu-container">
          <button
            className=" font-extrabold flex items-center"
            onClick={toggleMenu}
          >
            {" "}
            ...{" "}
          </button>
          {showMenu && (
            <div className="menu bg-slate-50 shadow-lg rounded-md ">
              <button onClick={handleOpen}>Edit</button>
              <Modal show={show} handleClose={handleClose}>
                <EditTask task={task} handleClose={handleCloseBox} />
              </Modal>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          )}
        </div>
      </div>
      <hr />
      <p className=" text-md">{task.description}</p>
    </div>
  );
};

export default Task;
