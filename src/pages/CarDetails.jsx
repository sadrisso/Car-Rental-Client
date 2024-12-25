import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../auth/AuthProvider';

const CarDetails = () => {

    const { user } = useContext(AuthContext)
    const [isCarBooked, setIsCarBooked] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const carDetails = useLoaderData()
    const { carModel, availability, date, dailyRentalPrice, location, photo } = carDetails;


    const checkBookStatus = () => {
        axios.get(`http://localhost:5000/is-car-booked/${user?.email}/${carModel}`)
            .then(res => {
                console.log(res?.data)
                setIsLoading(false)
                if (res?.data) {
                    setIsCarBooked(true)
                }
            })
    }

    useEffect(() => {
        checkBookStatus();
    }, [])


    const handleBookingModalOpen = () => {
        document.getElementById('my_modal_1').showModal()
    }

    const handleBooking = () => {
        const payLoad = {
            carModel: carModel.trim(), availability, date, dailyRentalPrice, location, photo,
            userEmail: user?.email
        }
        axios.post("http://localhost:5000/my-bookings", payLoad)
            .then(res => {
                toast.success("Booking Confirmed")
                setIsLoading(true)
                checkBookStatus()
            })
    }


    return (
        <>
            {
                isLoading ? <p>Loading..</p> :
                    (<div className='flex flex-col md:flex-row items-center justify-center'>
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
                            {isCarBooked ? <button className='btn btn-disabled'>Booked</button> :
                            <button className='btn btn-accent' onClick={handleBookingModalOpen}>Book Now</button>}
                        </div>
                    </div>)
            }
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box text-center">
                    <h3 className="font-bold text-lg">{carModel}</h3>
                    <p className="py-4">Price ${dailyRentalPrice}/Day</p>
                    <p>Location: {location}</p>
                    <p>Added Date: {date}</p>
                    <div className="modal-action justify-center ">
                        <form method="dialog" className='text-center'>
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-error mr-2">Close</button>
                            <button className='btn btn-success' onClick={handleBooking}>Confirm Book</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default CarDetails;