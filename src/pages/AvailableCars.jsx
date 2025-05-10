import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const AvailableCars = () => {
  const [cars, setCars] = useState(useLoaderData());
  const [searchName, setSearchName] = useState("");
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let queryStr = "";
    if (searchName) {
      queryStr += `searchName=${searchName}`;
    }

    if (sort) {
      queryStr += `${sort}=desc`;
    }

    console.log(sort);

    axios
      .get(`https://car-rental-server-smoky.vercel.app/all-cars?${queryStr}`)
      .then((res) => {
        if (res?.data) {
          setCars(res?.data);
          setLoading(false);
        }
      });
  }, [searchName, sort]);

  return (
    <div className="flex flex-col gap-4 md:flex-row pt-20 py-4">
      <div className="flex flex-col md:px-5 md:bg-[#374151] py-10 rounded-md gap-2 md:py-4 px-10">
        <div className="">
          <h1 className="text-amber-500 text-3xl font-semibold">
            Available Cars
          </h1>
        </div>
        <div className="flex flex-col gap-5">
          <select name="sort" onChange={(e) => setSort(e.target.value)}>
            <option value="date">Sort By Date</option>
            <option value="price">Sort By Price</option>
          </select>
          <label className="input input-bordered flex items-center gap-2">
            <input
              onChange={(e) => setSearchName(e.target.value)}
              type="text"
              className="grow"
              placeholder="Search By Name"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setView("list")}
              className={view === "list" ? "btn btn-active" : "btn"}
            >
              <i class="fa-solid fa-list"></i>
            </button>
            <button
              onClick={() => setView("grid")}
              className={view === "grid" ? "btn btn-active" : "btn"}
            >
              <i class="fa-solid fa-table-cells-large"></i>
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div>
          {view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {cars.map((car, i) => (
                <div
                  key={i}
                  className="card card-compact border text-center bg-white"
                >
                  <figure>
                    <img
                      src={car?.photo}
                      className="w-[380px] h-[200px] rounded-2xl p-2"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="text-2xl">{car.carModel}</h2>
                    {/* <p>Price ${car?.dailyRentalPrice}/Day</p>
                                        <hr /> */}
                    <p className="text-gray-400">{car.location}</p>
                    <div className="card-actions justify-center">
                      <Link to={`/car-details/${car._id}`}>
                        <button className="btn btn-sm">See Details</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {cars.map((car, i) => (
                <div
                  key={i}
                  className="flex border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white w-full"
                >
                  <img
                    src={car?.photo}
                    alt={car?.carModel}
                    className="w-48 h-32 object-cover"
                  />
                  <div className="flex justify-between items-center w-full px-4 py-2">
                    <div>
                      <h2 className="text-xl font-semibold">{car.carModel}</h2>
                      <p className="text-gray-500">{car?.location}</p>
                    </div>
                    <Link to={`/car-details/${car._id}`}>
                      <button className="btn btn-sm">See Details</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AvailableCars;
