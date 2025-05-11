import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAxios from '../hooks/useAxios';

const MyBookings = () => {

    const axiosPublic = useAxios()
    const { email } = useParams();
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sort, setSort] = useState("")
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [openBookingModal, setOpenBookingModal] = useState(false)
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState(null)

    const handleOpenModal = (booking) => {
        setSelectedBooking(booking)
        setOpenBookingModal(true)
    }

    const handleOpenModalForModify = (booking) => {
        setSelectedBooking(booking)
        setOpenUpdateModal(true)
    }


    useEffect(() => {
        if (selectedBooking?.fromDate) {
            setStartDate(selectedBooking?.fromDate)
        }

        if (selectedBooking?.toDate) {
            setEndDate(selectedBooking?.toDate)
        }
    }, [selectedBooking])


    useEffect(() => {
        let queryStr = ""

        if (sort) {
            queryStr += `${sort}=desc`
        }

        getBookings(queryStr)

    }, [sort])


    const getBookings = (queryStr) => {
        axiosPublic.get(`/my-bookings/${email}?${queryStr}`)
            .then(res => {
                setBookings(res.data)
                setIsLoading(false)
            })
    }


    const cancelBooking = () => {
        axiosPublic.put(`/update-booking/${selectedBooking?._id}`, { status: "Canceled" })
            .then((res) => {
                console.log("Added data --> ", res.data);
                toast.success("Successfully Canceled!");
                setOpenBookingModal(false)
                getBookings();
            })
            .catch((error) => {
                console.error("Error updating car:", error);
                setOpenBookingModal(false)
            });
    }


    const modifyBooking = () => {
        const payLoad = {
            fromDate: moment(startDate).format(),
            toDate: moment(endDate).format()
        }

        axiosPublic.put(`/update-booking/${selectedBooking?._id}`, payLoad)
            .then((res) => {
                toast.success("Successfully Modified!");
                setOpenUpdateModal(false)
                getBookings();
            })
            .catch((error) => {
                console.error("Error updating car:", error);
                setOpenUpdateModal(false)
            });
    }

    return (
        <>
            {
                isLoading ?
                    (<div className='h-[100vh] flex justify-center items-center'>
                        <span className="loading loading-bars loading-lg"></span>
                    </div>) :
                    <div className='pb-6'>
                        <div className='md:pt-28'>
                            <div className="overflow-x-auto">
                                <div className='flex flex-col md:flex-row gap-4 justify-between md:w-2/3 items-center mx-auto'>
                                    <h1 className='text-center font-bold text-3xl mb-5 text-amber-500'>My Bookings</h1>
                                    <select name="sort" onChange={(e) => setSort(e.target.value)}>
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
                                            <th>From Date</th>
                                            <th>To Date</th>
                                            <th>Booking Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row 1 */}
                                        {bookings?.map((booking, i) =>
                                            <tr key={i}>
                                                <td><img src={booking?.photo} className='w-[70px] h-[50px] mx-auto' alt="" /></td>
                                                <td>{booking.carModel}</td>
                                                <td>${booking.dailyRentalPrice}</td>
                                                <td>{moment(booking.fromDate).format('l')}</td>
                                                <td>{moment(booking.toDate).format('l')}</td>
                                                <td>{booking?.status}</td>
                                                <td>
                                                    {
                                                        booking.status === "Canceled" ? (
                                                            <button className='btn btn-xs text-white btn-error mr-2 btn-disabled'><span><i class="fa-solid fa-trash"></i></span>Cancel</button>
                                                        ) : (
                                                            <button onClick={() => handleOpenModal(booking)} className='btn btn-xs text-white btn-error mr-2'><span><i class="fa-solid fa-trash"></i></span>Cancel</button>
                                                        )
                                                    }
                                                    <button onClick={() => handleOpenModalForModify(booking)} className='btn btn-xs btn-primary'><span><i class="fa-solid fa-calendar-days"></i></span>Modify Date</button>
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

                        <dialog id="my_modal_2" className="modal" open={openUpdateModal}>
                            <div className="modal-box h-[800px]">
                                <h3 className="font-bold text-lg text-center">Are you sure you want to modify this booking?</h3>
                                <div className="modal-action justify-center">
                                    <div className='p-3'>
                                        <div className='p-2 border'>
                                            <label htmlFor="">Select Start Date</label>
                                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                                        </div>

                                        <div className='p-2 border'>
                                            <label htmlFor="">Select End Date</label>
                                            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                                        </div>
                                    </div>
                                    <form method="dialog" className='flex justify-center items-center'>
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn mr-3" onClick={modifyBooking}>Comfirm</button>
                                        <button className="btn" onClick={() => setOpenUpdateModal(false)}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
            }
        </>
    );
};

export default MyBookings;