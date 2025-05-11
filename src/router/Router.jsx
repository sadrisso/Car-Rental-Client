import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AddCar from "../pages/AddCar";
import MyCars from "../pages/MyCars";
import AvailableCars from "../pages/AvailableCars";
import CarDetails from "../pages/CarDetails";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import PrivateRoute from "./PrivateRoute";
import UpdateCar from "../pages/UpdateCar";
import ErrorPage from "../pages/ErrorPage";
import MyBookings from "../pages/MyBookings";
import Profile from "../pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/add-car",
        element: (
          <PrivateRoute>
            <AddCar></AddCar>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-cars/:email",
        element: (
          <PrivateRoute>
            <MyCars></MyCars>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-bookings/:email",
        element: (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://car-rental-server-smoky.vercel.app/my-bookings/${params.email}`
          ),
      },
      {
        path: "/update-car/:id",
        element: <UpdateCar></UpdateCar>,
      },
      {
        path: "/available-cars",
        element: (
          <PrivateRoute>
            <AvailableCars></AvailableCars>
          </PrivateRoute>
        ),
        loader: () =>
          fetch("https://car-rental-server-smoky.vercel.app/all-cars"),
      },
      {
        path: "/car-details/:id",
        element: (
          <PrivateRoute>
            <CarDetails></CarDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://car-rental-server-smoky.vercel.app/car-details/${params.id}`
          ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Registration></Registration>,
      },
    ],
  },
]);
