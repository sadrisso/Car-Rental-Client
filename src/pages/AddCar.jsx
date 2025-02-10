import React, { useContext, useState } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';


const AddCar = () => {

    const { user, loading, setLoading } = useContext(AuthContext)
    const navigate = useNavigate()


    const handleSubmit = e => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const initialData = Object.fromEntries(formData.entries())
        initialData.bookingCount = 0;
        initialData.userEmail = user?.email;
        initialData.date = moment().format()


        console.log("form data -->", initialData)

        axios.post("https://car-rental-server-smoky.vercel.app/add-car", initialData)
            .then(res => {
                console.log("Added data --> ", res.data)
                toast.success("Successfully Added!")
                navigate(`/my-cars/${user?.email}`)
                setLoading(false);
            })
    }
    return (
        <>
            {
                loading ?
                    (<div className='h-[100vh] flex justify-center items-center'>
                        <span className="loading loading-bars loading-lg"></span>
                    </div>) : (
                        <div className='text-center bg-page-bg bg-cover bg-center h-[900px] pt-36 md:h-[500px] space-y-5 md:py-20'>
                            <div>
                                <h1 className='text-3xl text-amber-500 font-semibold'>Add Car</h1>
                            </div>
                            <div className='mx-auto w-full md:w-2/3'>
                                <form onSubmit={handleSubmit} className='flex flex-col md:flex-row flex-wrap justify-center gap-5 items-center'>
                                    <input
                                        type="text"
                                        name='carModel'
                                        placeholder="Car Model"
                                        className="input input-bordered input-secondary w-full max-w-xs" />
                                    <input
                                        type="text"
                                        name='dailyRentalPrice'
                                        placeholder="Daily Rental Price"
                                        className="input input-bordered input-secondary w-full max-w-xs" />
                                    <input
                                        type="text"
                                        name='availability'
                                        placeholder="Availability"
                                        className="input input-bordered input-secondary w-full max-w-xs" />
                                    <input
                                        type="text"
                                        name='registrationNumber'
                                        placeholder="Vehicle Registration Number"
                                        className="input input-bordered input-secondary w-full max-w-xs" />
                                    <input
                                        type="text"
                                        name='location'
                                        placeholder="Location"
                                        className="input input-bordered input-secondary w-full max-w-xs" />
                                    <select name="features" className='rounded-md w-2/3 md:w-[300px] p-2'>
                                        <option value="GPS">GPS</option>
                                        <option value="AC">AC</option>
                                        <option value="AI">AI</option>
                                    </select>
                                    <textarea className="textarea textarea-secondary resize-none w-2/3 md:w-1/3" placeholder="description" name='description'></textarea>

                                    <input
                                        type="url"
                                        name='photo'
                                        placeholder="photo"
                                        className="input input-bordered input-secondary w-full max-w-xs" />
                                    <button className='btn w-2/3'>Submit</button>
                                </form>
                            </div>
                        </div>
                    )
            }
        </>
    );
};

export default AddCar;