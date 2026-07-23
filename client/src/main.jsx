import { NotificationProvider } from "./context/NotificationContext";
import React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotificationProvider>
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,
          style: {
            background: "#161B22",
            color: "#fff",
            border: "1px solid #374151",
          },
        }}
      />
    </NotificationProvider>
  </React.StrictMode>
)
