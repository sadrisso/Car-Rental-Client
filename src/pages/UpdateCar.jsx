// import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../auth/AuthProvider';

const UpdateCar = () => {

    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const data = useLoaderData()
    const { carModel, dailyRentalPrice, availability, registrationNumber, location, features, description } = data;

    const handleSubmit = e => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const initialData = Object.fromEntries(formData.entries())

        console.log("form data -->", initialData)

        axios.put(`https://car-rental-server-smoky.vercel.app/update-car/${data?._id}`, initialData)
            .then(res => {
                console.log("Added data --> ", res.data)
                toast.success("Successfully Updated!")
                navigate(`/my-cars/${user?.email}`)
            })
    }


    return (
        <div className='text-center bg-page-bg bg-cover h-[900px] pt-36 md:h-[500px] space-y-5 md:py-20'>
            <div>
                <h1 className='text-3xl text-amber-500 font-semibold'>Update Car</h1>
            </div>
            <div className='mx-auto w-full md:w-2/3'>
                <form onSubmit={handleSubmit} className='flex flex-col md:flex-row flex-wrap justify-center gap-5 items-center'>
                    <input
                        type="text"
                        name='carModel'
                        defaultValue={carModel}
                        placeholder="Car Model"
                        className="input input-bordered input-secondary w-full max-w-xs" />
                    <input
                        type="text"
                        name='dailyRentalPrice'
                        defaultValue={dailyRentalPrice}
                        placeholder="Daily Rental Price"
                        className="input input-bordered input-secondary w-full max-w-xs" />
                    <input
                        type="text"
                        name='availability'
                        defaultValue={availability}
                        placeholder="Availability"
                        className="input input-bordered input-secondary w-full max-w-xs" />
                    <input
                        type="text"
                        name='registrationNumber'
                        defaultValue={registrationNumber}
                        placeholder="Vehicle Registration Number"
                        className="input input-bordered input-secondary w-full max-w-xs" />
                    <input
                        type="text"
                        name='location'
                        defaultValue={location}
                        placeholder="Location"
                        className="input input-bordered input-secondary w-full max-w-xs" />
                    <select name="features" defaultValue={features} className='rounded-md w-2/3 md:w-[300px] p-2'>
                        <option value="GPS">GPS</option>
                        <option value="AC">AC</option>
                        <option value="AI">AI</option>
                    </select>

                    <textarea defaultValue={description} className="textarea textarea-secondary resize-none w-2/3 md:w-1/3" placeholder="description" name='description'></textarea>

                    <input
                        type="url"
                        name='photo'
                        placeholder="photo"
                        className="input input-bordered input-secondary w-full max-w-xs" />
                    <button className='btn w-2/3'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateCar;