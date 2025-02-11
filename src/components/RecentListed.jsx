import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RecentListed = () => {

    const [recentAddedData, setRecentAddedData] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("https://car-rental-server-smoky.vercel.app/recent-listed")
            .then(res => {
                setRecentAddedData(res.data)
                setLoading(false)
            })
    }, [])

    return (
        <div className=' bg-[#010313] text-gray-200 md:p-12 pt-10'>
            <div className='text-center'>
                <h1 className='text-2xl md:text-4xl font-semibold text-gray-300'>Recent Listings</h1>
                <p className='text-gray-500 mt-2'>Recently added cars, you can checkout all of this</p>
            </div>
            {
                loading ?
                    <div>
                        <span className="loading loading-bars loading-lg"></span>
                    </div>
                    :
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-5 md:px-10 gap-4 mt-10'>
                        {
                            recentAddedData.map((data, i) =>
                                <div key={i} className="card card-compact hover:shadow-2xl bg-[#160929] p-4">
                                    <figure>
                                        <img
                                            src={data?.photo}
                                            className='w-[380px] h-[200px] rounded-2xl p-2'
                                            alt="Shoes" />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="text-2xl font-bold" >{data.carModel}</h2>
                                        <p className='text-gray-300'>{data?.location}</p>
                                        <div className="card-actions justify-end">
                                            <Link to={`/car-details/${data._id}`}><button className="btn btn-ghost">See Details</button></Link>
                                        </div>
                                    </div>
                                </div>)
                        }
                    </div>
            }
        </div>
    );
};

export default RecentListed;