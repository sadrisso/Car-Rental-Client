import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../auth/AuthProvider';
import axios from 'axios';
import UpdateCar from './UpdateCar';


const MyCars = () => {

    const { loading } = useContext(AuthContext);
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

    const getCars = (queryStr="") => {
        axios.get(`http://localhost:5000/my-cars/${email}?${queryStr}`)
            .then(res => setMycar(res.data))
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
                fetch(`https://car-rental-server-smoky.vercel.app/my-cars/${id}`, {
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
                loading ? <p>Loading...</p> : (
                    <div className='md:mt-20'>
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
                                                <Link><button onClick={() => handleModalOpen(car)} className='btn btn-xs mr-2'>Edit</button></Link>
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
                    <h3 className="font-bold text-lg">You want to update this data?</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <UpdateCar selectedCar={selectedCar} closeModal={closeModal} getCars={getCars} />
                            <button className="btn" onClick={closeModal}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </>
    );
};

export default MyCars;