import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const MainLayout = () => {


    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>

            <div className='min-h-[calc(100vh-300px)] '>
                <Outlet/>
            </div>

            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;