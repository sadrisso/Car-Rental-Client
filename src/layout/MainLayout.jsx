import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {


    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>

            <div className='min-h-[calc(100vh-300px)] '>
                <Outlet />
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>

            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;