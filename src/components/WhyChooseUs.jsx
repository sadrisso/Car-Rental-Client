import React from 'react';

const WhyChooseUs = () => {
    return (
        <div className='md:p-20 p-5 text-center'>
            <div>
                <h1 className='md:text-4xl text-2xl font-semibold my-10 text-amber-500'>Why Us?</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 md:gap-5 rounded-xl p-5'>
                <div>
                    <h1 className='text-2xl font-bold mb-5'>Wide Variety of Cars</h1>
                    <img className='w-[100px] h-[100px] mx-auto rounded-full' src="https://i.ibb.co.com/Df855cg/wide-Variety-Cars.jpg" alt="" />
                    <p className='text-gray-700 mt-3'>Here you can find multiple choices</p>
                </div>
                <div>
                    <h1 className='text-2xl font-bold mb-5'>Affordable Prices</h1>
                    <img className='w-[100px] h-[100px] mx-auto rounded-full' src="https://i.ibb.co.com/pzMX0PB/affordable-Price.webp" alt="" />
                    <p className='text-gray-700 mt-3'>We give best of the price</p>
                </div>
                <div>
                    <h1 className='text-2xl font-bold mb-5'>Easy Booking Process</h1>
                    <img className='w-[100px] h-[100px] mx-auto rounded-full' src="https://i.ibb.co.com/NyTBDvC/online-booking.png" alt="" />
                    <p className='text-gray-700 mt-3'>We have best digital site to serve</p>
                </div>
                <div>
                    <h1 className='text-2xl font-bold mb-5'>Customer Support</h1>
                    <img className='w-[100px] h-[100px] mx-auto rounded-full' src="https://i.ibb.co.com/YcmCZG3/customer-Support.webp" alt="" />
                    <p className='text-gray-700 mt-3'>The best customer support is here</p>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;