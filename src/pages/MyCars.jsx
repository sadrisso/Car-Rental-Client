import React from 'react';
import { useLoaderData } from 'react-router-dom';


const MyCars = () => {

    const myCars = useLoaderData()
    console.log("my added cars", myCars)

    return (
        <div className='md:mt-20'>
            <div className="overflow-x-auto">
                <h1 className='text-center font-bold text-3xl mb-5'>My Cars</h1>
                <table className="table text-center md:w-2/3 mx-auto">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Model</th>
                            <th>Availability</th>
                            <th>Rental Price</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {myCars.map((car, i) =>
                            <tr key={i}>
                                <th>{i + 1}</th>
                                <td>{car.carModel}</td>
                                <td>{car.availability}</td>
                                <td>${car.dailyRentalPrice}</td>
                                <td>{car.date}</td>
                                <td>
                                    <button className='btn btn-xs mr-2'>Edit</button>
                                    <button className='btn btn-xs'>Delete</button>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyCars;

<tr>

</tr>