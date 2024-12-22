import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';


const MyCars = () => {

    const myCars = useLoaderData()
    const [myCar, setMycar] = useState(myCars);


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
            if (res.isConfirmed) {
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
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        })

    }

    return (
        <div className='md:mt-20'>
            <div className="overflow-x-auto">
                <div className='flex flex-col md:flex-row gap-4 justify-between md:w-2/3 items-center mx-auto'>
                    <h1 className='text-center font-bold text-3xl mb-5 text-amber-500'>My Cars</h1>
                    <select name="sort">
                        <option value="date">Sort By Date</option>
                        <option value="price">Sort By Price</option>
                    </select>
                </div>
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
                                    <Link to={`/update-car/${car?._id}`}><button className='btn btn-xs mr-2'>Edit</button></Link>
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