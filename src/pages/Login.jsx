import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className='text-center container mx-auto'>
            <div>
                <h1 className='text-3xl my-4 font-bold'>User Login</h1>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 border mx-auto">
                <form className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
                <p className='mb-5'>Dont have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;