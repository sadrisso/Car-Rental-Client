import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AddCar from '../pages/AddCar';
import MyCars from '../pages/MyCars';
import AvailableCars from '../pages/AvailableCars';
import CarDetails from '../pages/CarDetails';
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <h2>Page Not Found</h2>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/add-car",
                element: <AddCar></AddCar>
            },
            {
                path: "/my-cars",
                element: <MyCars></MyCars>
            },
            {
                path: "/available-cars",
                element: <AvailableCars></AvailableCars>
            },
            {
                path: "/car-details",
                element: <CarDetails></CarDetails>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Registration></Registration>
            }
        ]
    },
]);