import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import MovieNews from './pages/movieNews';
import UserCarList from './pages/userCarList'
import ClickChargesTimes from './pages/clickChargesTimes'
import UserFavouriteCharger from './pages/userFavouriteCharger'
import SearchLocation from './pages/searchLocation'
import Home from './pages/home'
import reportWebVitals from "./reportWebVitals";
import { Amplify } from "aws-amplify";
import config from "./aws-exports";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
Amplify.configure(config);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/userFavouriteCharger",
        element: <UserFavouriteCharger />,
      },
      {
        path:'/clickChargesTimes',
        element: <ClickChargesTimes />,
      },
      {
        path:'/searchLocation',
        element: <SearchLocation />,
      },{
        path:'/userCarList',
        element: <UserCarList />,
      }
      
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
