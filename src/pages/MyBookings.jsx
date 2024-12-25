import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyBookings = () => {

    // const data = useLoaderData()
    const [date, setDate] = useState(new Date())
    const {email} = useParams();
    const [bookings, setBookings] = useState([]);
    const [openBookingModal, setOpenBookingModal] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState(null)

    const handleOpenModal = (booking) => {
        setSelectedBooking(booking)
        setOpenBookingModal(true)
    }

    const handleOpenModalForModify = () => {
        document.getElementById('my_modal_2').showModal()
    }


    useEffect(() => {
        // let queryStr = ""

        // if (sort) {
        //     queryStr += `${sort}=desc`
        // }

        getBookings()

    }, [])

    const getBookings = () => {
        axios.get(`https://car-rental-server-smoky.vercel.app/my-bookings/${email}`)
            .then(res => setBookings(res.data))
    }

    const cancelBooking = () => {
        axios.put(`http://localhost:5000/update-booking/${selectedBooking?._id}`, {status: "Canceled"})
            .then((res) => {
                console.log("Added data --> ", res.data);
                toast.success("Successfully Canceled!");
                setOpenBookingModal(false)
                getBookings();
            })
            .catch((error) => {
                console.error("Error updating car:", error);
            });
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
                            {bookings?.map((car, i) =>
                                <tr key={i}>
                                    <td><img src={car?.photo} className='w-[70px] h-[50px] mx-auto' alt="" /></td>
                                    <td>{car.carModel}</td>
                                    <td>${car.dailyRentalPrice}</td>
                                    <td>{moment(car.date).format('l')}</td>
                                    <td>{car?.status}</td>
                                    <td>
                                        <Link><button onClick={() => handleOpenModal(car)} className='btn btn-xs text-white btn-error mr-2'><span><i class="fa-solid fa-trash"></i></span>Cancel</button></Link>
                                        <button onClick={handleOpenModalForModify} className='btn btn-xs btn-primary'><span><i class="fa-solid fa-calendar-days"></i></span>Modify Date</button>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_1" className="modal" open={openBookingModal}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">Are you sure you want to cancel this booking?</h3>
                    <div className="modal-action justify-center">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn mr-3" onClick={cancelBooking}>Yes</button>
                            <button className="btn" onClick={() => setOpenBookingModal(false)}>No</button>
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