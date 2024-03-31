import React from "react";
import "./Modal.css";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={`${showHideClassName} z-50`}>
      <section className="modal-main relative p-4 rounded-xl">
        <button
          onClick={handleClose}
          className="absolute top-0 right-0 m-2 text-black p-2 rounded cursor-pointer hover:text-red-600"
        >
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">Add Task</h2>
        {children}
      </section>
    </div>
  );
};

export default Modal;
