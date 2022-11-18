import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";
import Home from "./pages/Home";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home/>
        },
    ]);
    return (

        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>

    );
}

export default App;
