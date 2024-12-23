import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const AvailableCars = () => {

    const [cars, setCars] = useState(useLoaderData())
    const [searchName, setSearchName] = useState("")
    const [sort, setSort] = useState("")

    useEffect(() => {

        let queryStr = ""
        if (searchName) {
            queryStr += `searchName=${searchName}`
        }

        if (sort) {
            queryStr += `${sort}=desc`
        }

        console.log(sort)

        axios.get(`http://localhost:5000/all-cars?${queryStr}`)
            .then(res => {
                if (res?.data) {
                    setCars(res?.data)
                }
            })

    }, [searchName, sort])

    return (
        <div className='text-center mx-auto container space-y-10 mt-16'>
            <div className='flex flex-col md:flex-row md:justify-between'>
                <div>
                    <h1 className='text-amber-500 text-4xl font-semibold'>Available Cars</h1>
                </div>
                <div className='flex flex-col md:flex-row gap-4 rounded-xl '>
                    <select name="sort" onChange={(e) => setSort(e.target.value)}>
                        <option value="date">Sort By Date</option>
                        <option value="price">Sort By Price</option>
                    </select>
                    <label className="input input-bordered flex items-center gap-2">
                        <input onChange={(e) => setSearchName(e.target.value)} type="text" className="grow" placeholder="Search By Name" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </label>
                </div>
            </div>


            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                {cars.map((car, i) =>
                    <div key={i} className="card card-compact border text-center">
                        <figure>
                            <img
                                src={car?.photo}
                                className='w-[380px] h-[200px] rounded-2xl p-2'
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="text-2xl" >{car.carModel}</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <hr />
                            <p>Added date: {car.date}</p>
                            <div className="card-actions justify-end">
                                <Link to={`/car-details/${car._id}`}><button className="btn btn-sm">See Details</button></Link>
                            </div>
                        </div>
                    </div>)}
            </div>
        </div>
    );
};

export default AvailableCars;