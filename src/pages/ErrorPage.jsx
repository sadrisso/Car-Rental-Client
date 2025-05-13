import error from '../../public/errorLottieAnimation.json'
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {

    return (
        <div className='flex justify-center items-center'>
            <Link className='btn btn-warning text-orange-500' to="/">Back to Home</Link>
            <Lottie animationData={error} loop={true}></Lottie>
        </div>
    );
};

export default ErrorPage;