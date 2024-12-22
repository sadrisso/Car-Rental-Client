import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';


const MyCars = () => {

    const myCars = useLoaderData()
    const [myCar, setMycar] = useState(myCars);
    console.log("my added cars", myCars)

    const handleRemove = id => {
        alert("Are you sure to delete??")
        fetch(`http://localhost:5000/my-cars/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
        const remaining = myCar.filter((car) => car._id !== id)
        setMycar(remaining);
    }

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
                        {myCar.map((car, i) =>
                            <tr key={i}>
                                <th>{i + 1}</th>
                                <td>{car.carModel}</td>
                                <td>{car.availability}</td>
                                <td>${car.dailyRentalPrice}</td>
                                <td>{car.date}</td>
                                <td>
                                    <button className='btn btn-xs mr-2'>Edit</button>
                                    <button className='btn btn-xs' onClick={() => handleRemove(car._id)}>Delete</button>
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