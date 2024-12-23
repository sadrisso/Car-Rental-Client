import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const MyBookings = () => {

    const data = useLoaderData()
    const [myBooking, setMyBooking] = useState(data)

    return (
        <div>
            <div className='md:mt-20'>
                <div className="overflow-x-auto">
                    <div className='flex flex-col md:flex-row gap-4 justify-between md:w-2/3 items-center mx-auto'>
                        <h1 className='text-center font-bold text-3xl mb-5 text-amber-500'>My Bookings</h1>
                        <select name="sort">
                            <option value="date">Sort By Date</option>
                            <option value="price">Sort By Price</option>
                        </select>
                    </div>
                    <table className="table text-center md:w-2/3 mx-auto">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Model</th>
                                <th>Total Price</th>
                                <th>Date</th>
                                <th>Booking Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {myBooking.map((car, i) =>
                                <tr key={i}>
                                    <td><img src={car?.photo} className='w-[70px] h-[50px] mx-auto' alt="" /></td>
                                    <td>{car.carModel}</td>
                                    <td>${car.dailyRentalPrice}</td>
                                    <td>{car.date}</td>
                                    <td>Pending</td>
                                    <td>
                                        <Link to={`/update-car/${car?._id}`}><button className='btn btn-xs mr-2'>Cancel Booking</button></Link>
                                        <button className='btn btn-xs' onClick={() => handleRemove(car._id)}>Modify Date</button>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyBookings;