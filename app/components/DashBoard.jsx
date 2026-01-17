// // components/DashboardClient.jsx
// "use client";
// import { useState, useEffect  } from "react";
// import FaultTolerance from "./FaultTolerance";
// import RefundManagementTable from "./RefundManagmentTable";
// import App from "./Header/Header.jsx";
// export default function DashboardClient() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState("dashboard");
//   return (
//     <div>
//     <App/>
//     <FaultTolerance darkMode={darkMode} setDarkMode={setDarkMode} />
//     <RefundManagementTable darkMode={darkMode} />
//     </div>
//   );
// }

'use client';
import FaultTolerance from "./FaultTolerance.jsx";
import RefundManagementTable from "./RefundManagmentTable.jsx";
import React, { useState } from "react";
import Header from "./Header/Header.jsx";
import Sidebar from "./SideBar/SideBar.jsx";

const DashBoard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div
  className={`min-h-screen ${
    darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
  } transition-colors duration-300 pt-20`}
>

      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <Sidebar
        darkMode={darkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <FaultTolerance darkMode={darkMode} setDarkMode={setDarkMode} />
      <RefundManagementTable darkMode={darkMode} />
    </div>
  );
};

export default DashBoard;
