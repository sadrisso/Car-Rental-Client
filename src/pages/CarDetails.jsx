import axios from 'axios';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';

const CarDetails = () => {

    const carDetails = useLoaderData()
    const { carModel, availability, date, dailyRentalPrice, location, photo } = carDetails;


    const handleBooking = () => {
        axios.post("https://car-rental-server-smoky.vercel.app/my-bookings", carDetails)
            .then(res => {
                toast.success("Booking Confirmed")
            })
    }


    return (
        <div className='flex flex-col md:flex-row items-center justify-center'>
            <div>
                <img src={photo} className='w-full md:w-[600px] mx-auto' alt="" />
            </div>

            <div className='text-center md:py-28 md:px-16 space-y-5 my-5'>
                <h1 className='text-2xl font-semibold'>Model no. {carModel}</h1>
                <p>Availability: {availability}</p>
                <hr />
                <div>
                    <p>Added Date: {date}</p>
                    <p>Price Per Day: ${dailyRentalPrice}</p>
                    <p>Location: {location}</p>
                </div>
                <button className='btn btn-accent' onClick={handleBooking}>Book Now</button>
            </div>
        </div>


    );
};

export default CarDetails;