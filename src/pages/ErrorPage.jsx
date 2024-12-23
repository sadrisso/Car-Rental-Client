import React from 'react';
import error from '../../public/errorLottieAnimation.json'
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {


    return (
        <div>
            <Link className='btn btn-link' to="/">Back to Home</Link>
            <Lottie animationData={error} loop={true}></Lottie>
        </div>
    );
};

export default ErrorPage;