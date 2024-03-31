import React, { useState, useEffect } from "react";
import Modal from "../Utils/dialogbox/Modal";
import AddTask from "./AddTask";
import Task from "./Task";

const TaskPlanner = () => {
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    fetch("https://server-theta-drab.vercel.app/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(fetchTasks, []);

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    fetchTasks();
  };
  return (
    <div className=" flex justify-center items-center m-2 border w-full  rounded-xl shadow-xl ">
      {/* TO DO div -------------------------------------------- */}
      <div className=" flex flex-col h-96 w-60 items-center overflow-auto hide-scrollbar bg-[#ebebeb]  m-2 rounded-xl">
        <div className=" flex justify-between items-center w-full bg-inherit sticky top-0 z-1 py-1 px-3 borderT ">
          <h1 className=" font-medium">
            TO DO ({tasks.filter((task) => task.status === "todo").length})
          </h1>
          <button className=" font-bold text-xl bg-blue-400 rounded-full w-6 h-6 flex items-center justify-center " onClick={handleOpen}>+</button>

          <Modal show={show} handleClose={handleClose}>
            <AddTask handleClose={handleClose} fetchTasks={fetchTasks} />
          </Modal>
        </div>

        <div className="task">
          {tasks
            .filter((task) => task.status === "todo")
            .map((task, index) => (
              <Task
                key={index}
                task={task}
                index={index}
                fetchTasks={fetchTasks}
                handleCloseBox={handleClose}
              />
            ))}
        </div>
      </div>
      {/* On going div --------------------------------------------------*/}
      <div className=" flex flex-col h-96 w-60 items-center overflow-auto hide-scrollbar bg-[#ebebeb]  m-2 rounded-xl">
        <div className=" flex justify-between items-center w-full bg-inherit sticky top-0 z-1 py-1 px-3 borderO ">
          <h1 className=" font-medium">
            On Going ({tasks.filter((task) => task.status === "ongoing").length}
            )
          </h1>
        </div>

        <div className="task">
          {tasks
            .filter((task) => task.status === "ongoing")
            .map((task, index) => (
              <Task
                key={index}
                task={task}
                index={index}
                fetchTasks={fetchTasks}
                handleCloseBox={handleClose}
              />
            ))}
        </div>
      </div>
      {/* Completed div --------------------------------------------------*/}
      <div className=" flex flex-col h-96 w-60 items-center overflow-auto hide-scrollbar bg-[#ebebeb]  m-2 rounded-xl">
        <div className=" flex justify-between items-center w-full bg-inherit sticky top-0 z-1 py-1 px-3  borderC ">
          <h1 className=" font-medium">
            Completed (
            {tasks.filter((task) => task.status === "completed").length})
          </h1>
        </div>

        <div className="task">
          {tasks
            .filter((task) => task.status === "completed")
            .map((task, index) => (
              <Task
                key={index}
                task={task}
                index={index}
                fetchTasks={fetchTasks}
                handleCloseBox={handleClose}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TaskPlanner;
