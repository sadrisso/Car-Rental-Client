import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RecentListed = () => {

    const [recentAddedData, setRecentAddedData] = useState([]);

    useEffect(() => {
        axios.get("https://car-rental-server-smoky.vercel.app/recent-listed")
            .then(res => setRecentAddedData(res.data))
    }, [])

    return (
        <div className=' bg-slate-400  py-10'>
            <div className='text-center'>
                <h1 className='text-2xl md:text-4xl font-semibold text-gray-800'>Recent Listings</h1>
                <p className='text-gray-500 mt-2'>Recently added cars, you can checkout all of this</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-5 gap-4 mt-10'>
                {
                    recentAddedData.map((data, i) =>
                        <div key={i} className="card card-compact hover:shadow-2xl">
                            <figure>
                                <img
                                    src={data?.photo}
                                    className='w-[380px] h-[200px] rounded-2xl p-2'
                                    alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="text-2xl font-bold" >{data.carModel}</h2>
                                <div className='flex justify-between'>
                                    <p>Price: ${data.dailyRentalPrice}/Day</p>
                                    <p>Status: {data.availability}</p>
                                </div>
                                <hr />
                                <p>Added date: {moment(data?.date).format('ll')}</p>
                                <p className='text-gray-600'>Posted {moment(data?.date).calendar()}</p>
                                <div className="card-actions justify-end">
                                    <Link to={`/car-details/${data._id}`}><button className="btn btn-sm">See Details</button></Link>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default RecentListed;