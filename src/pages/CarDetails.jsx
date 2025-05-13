import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../auth/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";

const CarDetails = () => {
  const axiosPublic = useAxios();
  const { user } = useAuth();
  const [isCarBooked, setIsCarBooked] = useState(false);
  const [bookingCarData, setBookingCarData] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const carDetails = useLoaderData();
  const {
    carModel,
    availability,
    date,
    dailyRentalPrice,
    location,
    photo,
    bookingCount,
  } = carDetails;

  const checkBookStatus = () => {
    axiosPublic.get(`/is-car-booked/${user?.email}/${carModel}`).then((res) => {
      console.log(res?.data);
      setIsLoading(false);
      if (res?.data) {
        setBookingCarData(res?.data);
        setIsCarBooked(res?.data?.status === "Canceled" ? false : true);
      }
    });
  };

  useEffect(() => {
    checkBookStatus();
  }, []);

  const handleBookingModalOpen = () => {
    document.getElementById("my_modal_1").showModal();
  };

  const handleBooking = () => {
    if (bookingCarData) {
      axiosPublic
        .put(`/update-booking/${bookingCarData?._id}`, { status: "Booked" })
        .then((res) => {
          toast.success("Booking Confirmed");
          setIsLoading(true);
          checkBookStatus();
        })
        .catch((error) => {
          console.error("Error updating car:", error);
        });
    } else {
      const payLoad = {
        carModel: carModel.trim(),
        availability,
        date,
        dailyRentalPrice,
        location,
        photo,
        userEmail: user?.email,
        status: "Booked",
        fromDate: moment(startDate).format(),
        toDate: moment(endDate).format(),
      };
      axiosPublic.post("/my-bookings", payLoad).then((res) => {
        toast.success("Booking Confirmed");
        setIsLoading(true);
        checkBookStatus();
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="h-[100vh] flex justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-center justify-center pt-10">
          <div>
            <img src={photo} className="w-full md:w-[600px] mx-auto" alt="" />
          </div>

          <div className="text-center md:py-28 md:px-16 space-y-5 my-5">
            <h1 className="text-2xl font-semibold">Model no. {carModel}</h1>
            <p>Availability: {availability}</p>
            <hr />
            <div>
              <p>Added Date: {date}</p>
              <p>Price Per Day: ${dailyRentalPrice}</p>
              <p>Booking: {bookingCount}</p>
              <p>Location: {location}</p>
            </div>
            {isCarBooked ? (
              <button className="btn btn-disabled">Booked</button>
            ) : (
              <button
                className="btn btn-accent"
                onClick={handleBookingModalOpen}
              >
                Book Now
              </button>
            )}
          </div>
        </div>
      )}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box text-center">
          <h3 className="font-bold text-lg">{carModel}</h3>
          <p className="py-4">Price ${dailyRentalPrice}/Day</p>
          <p>Location: {location}</p>
          <p>Added Date: {date}</p>
          <div className="p-3">
            <div>
              <label htmlFor="">Select Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>

            <div>
              <label htmlFor="">Select End Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
          </div>
          <div className="modal-action justify-center ">
            <form method="dialog" className="text-center">
              {/* if there is a button in form, it will close the modal */}

              <button className="btn btn-error mr-2">Close</button>
              <button className="btn btn-success" onClick={handleBooking}>
                Confirm Book
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CarDetails;
