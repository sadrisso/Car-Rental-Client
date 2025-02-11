
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider()

const Registration = () => {

    const { createUser, loading, updateUser } = useContext(AuthContext)
    const [error, setError] = useState({})
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (name.length <= 3) {
            setError({...error, nameErr: "Name must be longer then 3 character!"})
            return
        }

        if (!passwordRegex.test(password)) {
            setError({...error, passErr: "Pass must be 1 uppercase 1 lowercase and 6 character long!"})
            return
        }

        createUser(email, password)
            .then(res => {
                updateUser({displayName: name, photoURL: photo})
                console.log("Register Successfull -->", res.user)
                form.reset()
                alert("Successfully Registered!!")
                navigate("/")
            })
            .catch(err => {
                console.log(err.message)
                setError({...error, authErr: err.message})
            })
    }

    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then(res => {
                console.log("Google Registered User -->", res.user)
                navigate("/")
            })
            .catch(err => {
                console.log("ERR: ", err)
            })
    }

    return (
        <div className='text-center container mx-auto py-10 bg-page-bg bg-cover bg-center bg-no-repeat pt-20 px-10'>
            <div className=''>
                <h1 className='md:text-4xl my-4 font-bold text-yellow-400'>User Registration</h1>
            </div>
            <div className="card w-full bg-base-300 max-w-sm shrink-0 mx-auto">
                <form className="card-body" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <input type="text" placeholder="name" name='name' className="input input-bordered" required />
                        <p className='text-red-600'>{error.nameErr && error.nameErr}</p>
                    </div>
                    <div className="form-control">
                        <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <input type="url" placeholder="photo" name='photo' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                        <p className='text-red-600'>{error.passErr && error.passErr}</p>
                    </div>
                    <p className='text-red-600'>{error.authErr && error.authErr}</p>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Register</button>
                    </div>
                    <div className="form-control">
                        <button className="btn btn-neutral" onClick={handleGoogleLogin}>Goodle</button>
                    </div>
                </form>
                <p className='mb-5'>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Registration;