import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen ? (
        <button
          className="flex text-4xl text-white items-center cursor-pointer fixed left-5 top-6 z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          x
        </button>
      ) : (
        <svg
          onClick={() => setIsOpen(!isOpen)}
          className="fixed z-30 flex items-center cursor-pointer left-10 top-6"
          fill="#2563EB"
          viewBox="0 0 100 80"
          width="40"
          height="40"
        >
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      )}

      <div
        className={`top-0 left-0 w-60 bg-blue-600 p-5 text-white fixed h-full z-40 ease-in-out duration-300 ${
          isOpen ? "translate-x-0 " : "-translate-x-full"
        }`}
      >
        <div className="pt-12">
          <h1><Link to="/">Logout</Link></h1>
          <h1><Link to="/courses">Courses</Link></h1>
          <h1><Link to="/projects">Projects</Link></h1>
        </div>
      </div>
    </>
  );
};

export default Sidebar;