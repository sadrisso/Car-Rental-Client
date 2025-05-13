import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const axiosPublic = useAxios();
  const { signInUser } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((res) => {
        console.log("Login Successfull -->", res.user);
        form.reset();
        toast.success("Successfully Logged In");

        const user = res?.user?.email;

        axiosPublic
          .post("/jwt", user, {
            withCredentials: true,
          })
          .then((res) => console.log(res.data));

        navigate(from);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        Swal.fire({
          title: `Welcome ${res?.user?.displayName}`,
          icon: "success",
          draggable: true,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  return (
    <div className="text-center container mx-auto py-10 bg-page-bg bg-cover bg-center bg-no-repeat w-full pt-28 px-10">
      <div className="">
        <h1 className="md:text-4xl my-4 font-bold text-orange-400">
          User Login
        </h1>
      </div>
      <div className="card w-full bg-base-300 max-w-sm shrink-0 mx-auto">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="email"
              placeholder="email"
              name="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              placeholder="password"
              name="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover ">
                Forgot password?
              </a>
            </label>
          </div>
          <p className="text-rose-600">{error && error}</p>
          <div className="form-control my-6">
            <button className="btn btn-primary mb-2">Login</button>
            <button className="btn btn-neutral" onClick={handleGoogleLogin}>
              Google
            </button>
          </div>
        </form>
        <p className="mb-5">
          Dont have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
