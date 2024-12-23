import React from 'react';
import { useLoaderData } from 'react-router-dom';

const CarDetails = () => {

    const carDetails = useLoaderData()
    const { carModel, availability, date, dailyRentalPrice, location, } = carDetails;


    return (
        <div className='w-full md:w-[600px] md:border text-center md:p-10 md:mx-auto mt-20 space-y-6'>
            <h1 className='text-2xl font-semibold'>Model no. {carModel}</h1>
            <p>Availability: {availability}</p>
            <hr />
            <div>
                <p>Booking Date: {date}</p>
                <p>Price Per Day: ${dailyRentalPrice}</p>
                <p>Location: {location}</p>
            </div>
            <button className='btn btn-accent'>Confirm Book</button>
        </div>
    );
};

export default CarDetails;