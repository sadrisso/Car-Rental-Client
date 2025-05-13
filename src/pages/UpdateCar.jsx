// import React, { useContext, useState } from 'react';
import { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../auth/AuthProvider";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";

const UpdateCar = ({ selectedCar, closeModal, getCars }) => {
  console.log("selected car", selectedCar);

  const axiosPublic = useAxios();
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const {
    carModel,
    dailyRentalPrice,
    availability,
    registrationNumber,
    location,
    features,
    description,
  } = data;

  useEffect(() => {
    axiosPublic
      .get(`/update-car/${selectedCar?._id}`)
      .then((res) => setData(res.data));
  }, [selectedCar]);

  console.log("data", data);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      console.log("Form submitted");

      const formData = {
        carModel: formRef.current.elements.carModel.value,
        dailyRentalPrice: formRef.current.elements.dailyRentalPrice.value,
        availability: formRef.current.elements.availability.value,
        registrationNumber: formRef.current.elements.registrationNumber.value,
        location: formRef.current.elements.location.value,
        features: formRef.current.elements.features.value,
        description: formRef.current.elements.description.value,
        photo: formRef.current.elements.photo.value,
      };

      axiosPublic
        .put(`/update-car/${selectedCar?._id}`, formData)
        .then((res) => {
          console.log("Added data --> ", res.data);
          toast.success("Successfully Updated!");
          closeModal();
          getCars();
        })
        .catch((error) => {
          console.error("Error updating car:", error);
        });
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  return (
    <div className="text-center bg-page-bg bg-cover h-[900px] md:h-[500px] pt-36 space-y-5 md:py-20">
      <div className="w-full">
        <form
          ref={formRef}
          className="flex flex-col md:flex-row flex-wrap justify-center gap-5 items-center"
        >
          <input
            type="text"
            name="carModel"
            defaultValue={carModel}
            placeholder="Car Model"
            className="input input-bordered input-secondary w-full max-w-xs"
          />
          <input
            type="text"
            name="dailyRentalPrice"
            defaultValue={dailyRentalPrice}
            placeholder="Daily Rental Price"
            className="input input-bordered input-secondary w-full max-w-xs"
          />
          <input
            type="text"
            name="availability"
            defaultValue={availability}
            placeholder="Availability"
            className="input input-bordered input-secondary w-full max-w-xs"
          />
          <input
            type="text"
            name="registrationNumber"
            defaultValue={registrationNumber}
            placeholder="Vehicle Registration Number"
            className="input input-bordered input-secondary w-full max-w-xs"
          />
          <input
            type="text"
            name="location"
            defaultValue={location}
            placeholder="Location"
            className="input input-bordered input-secondary w-full max-w-xs"
          />
          <select
            name="features"
            defaultValue={features}
            className="rounded-md w-2/3 md:w-[300px] p-2"
          >
            <option value="GPS">GPS</option>
            <option value="AC">AC</option>
            <option value="AI">AI</option>
          </select>

          <textarea
            defaultValue={description}
            className="textarea textarea-secondary resize-none w-2/3 md:w-1/3"
            placeholder="description"
            name="description"
          ></textarea>

          <input
            type="url"
            name="photo"
            placeholder="photo"
            className="input input-bordered input-secondary w-full max-w-xs"
          />
          <button className="btn w-2/3" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCar;
