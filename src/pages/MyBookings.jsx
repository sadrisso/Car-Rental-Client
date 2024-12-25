import moment from 'moment';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Link, useLoaderData } from 'react-router-dom';

const MyBookings = () => {

    const data = useLoaderData()
    const [date, setDate] = useState(new Date())

    const handleOpenModal = () => {
        document.getElementById('my_modal_1').showModal()
    }

    const handleOpenModalForModify = () => {
        document.getElementById('my_modal_2').showModal()
    }

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
                            {data?.map((car, i) =>
                                <tr key={i}>
                                    <td><img src={car?.photo} className='w-[70px] h-[50px] mx-auto' alt="" /></td>
                                    <td>{car.carModel}</td>
                                    <td>${car.dailyRentalPrice}</td>
                                    <td>{moment(car.date).format('l')}</td>
                                    <td>Pending</td>
                                    <td>
                                        <Link><button onClick={handleOpenModal} className='btn btn-xs text-white btn-error mr-2'><span><i class="fa-solid fa-trash"></i></span>Cancel</button></Link>
                                        <button onClick={handleOpenModalForModify} className='btn btn-xs btn-primary'><span><i class="fa-solid fa-calendar-days"></i></span>Modify Date</button>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">Are you sure you want to cancel this booking?</h3>
                    <div className="modal-action justify-center">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn mr-3">Yes</button>
                            <button className="btn">No</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">Are you sure you want to modify this booking?</h3>
                    <div className="modal-action justify-center">
                        <form method="dialog">
                            <DatePicker value='date' onChange={(e) => setDate(e.target.value)}></DatePicker>
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn mr-3">Comfirm</button>
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>


    );
};

export default MyBookings;