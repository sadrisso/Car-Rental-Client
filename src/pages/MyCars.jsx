import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../auth/AuthProvider';
import UpdateCar from './UpdateCar';
import useAxios from '../hooks/useAxios';


const MyCars = () => {

    const axiosPublic = useAxios()
    const [isLoading, setIsLoading] = useState(true);
    const [myCar, setMycar] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [sort, setSort] = useState("");
    const { email } = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false);


    const closeModal = () => setIsModalOpen(false);


    useEffect(() => {
        let queryStr = ""

        if (sort) {
            queryStr += `${sort}=desc`
        }

        getCars(queryStr)

    }, [sort])

    const getCars = (queryStr = "") => {
        axiosPublic.get(`/my-cars/${email}?${queryStr}`)
            .then(res => {
                setMycar(res.data)
                setIsLoading(false)
            })
            .catch(err => setIsLoading(false))
    }


    const handleRemove = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((res) => {
            if (res.dismiss) {
                return;
            }
            if (res.isConfirmed) {
                fetch(`/my-cars/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                    })
                const remaining = myCar.filter((car) => car._id !== id)
                setMycar(remaining);
            }
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        })
    }

    const handleModalOpen = (car) => {
        setSelectedCar(car)
        setIsModalOpen(true);
    }

    return (
        <>
            {
                isLoading ?
                    (<div className='h-[100vh] flex justify-center items-center'>
                        <span className="loading loading-bars loading-lg"></span>
                    </div>) : (
                        <div className='md:pt-28'>
                            <div className="overflow-x-auto">
                                <div className='flex flex-col md:flex-row gap-4 justify-between md:w-2/3 items-center mx-auto'>
                                    <h1 className='text-center font-bold text-3xl mb-5 text-amber-500'>My Cars</h1>
                                    <select name="sort" onChange={(e) => setSort(e.target.value)}>
                                        <option value="date">Sort By Date</option>
                                        <option value="price">Sort By Price</option>
                                    </select>
                                </div>
                                <table className="table text-center md:w-2/3 mx-auto">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th>Serial</th>
                                            <th>Photo</th>
                                            <th>Model</th>
                                            <th>Availability</th>
                                            <th>Rental Price</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row 1 */}
                                        {myCar.map((car, i) =>
                                            <tr key={i}>
                                                <th>{i + 1}</th>
                                                <td><img src={car?.photo} className='w-[70px] h-[50px] mx-auto' alt="" /></td>
                                                <td>{car.carModel}</td>
                                                <td>{car.availability}</td>
                                                <td>${car.dailyRentalPrice}</td>
                                                <td>{moment(car.date).format('ll')}</td>
                                                <td>
                                                    <button onClick={() => handleModalOpen(car)} className='btn btn-xs mr-2'>Edit</button>
                                                    <button className='btn btn-xs' onClick={() => handleRemove(car._id)}>Delete</button>
                                                </td>
                                            </tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
            }

            <dialog id="my_modal_1" open={isModalOpen} className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-3xl text-center">You want to update this data?</h3>
                    <div className="modal-action justify-center">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            {
                                selectedCar && <UpdateCar selectedCar={selectedCar} closeModal={closeModal} getCars={getCars} />
                            }
                            <button className="mt-2 text-red-900" onClick={closeModal}><i class="fa-regular fa-circle-xmark text-2xl text-red-500 hover:text-red-300"></i></button>
                        </form>
                    </div>
                </div>
            </dialog>

        </>
    );
};

export default MyCars;