
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';

const Registration = () => {

    const { createUser, loading } = useContext(AuthContext)

    const handleSubmit = e => {
        e.preventDefault()

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then(res => {
                console.log("Register Successfull -->", res.user)
                form.reset()
                alert("Successfully Registered!!")
            })
            .catch(err => {
                console.log("ERR -->", err)
            })
    }

    return (
        <div className='text-center container mx-auto'>
            <div>
                <h1 className='text-3xl my-4 font-bold'>User Registration</h1>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 border mx-auto">
                <form className="card-body" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="name" name='name' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Register</button>
                    </div>
                    <div className="form-control">
                        <button className="btn btn-neutral">Goodle</button>
                    </div>
                </form>
                <p className='mb-5'>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Registration;