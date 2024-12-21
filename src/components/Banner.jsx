import React from 'react';

const Banner = () => {


    return (
        <div className='bg-hero-bg bg-no-repeat bg-cover bg-center h-[670px]'>
            <div className='shadow-xl w-2/3 mx-auto py-10'>
                <h1 className='md:pt-20 pt-10 text-4xl md:text-7xl text-orange-400 font-semibold text-center'>Drive Your Dreams Today</h1>
                <div className='mx-auto text-center mt-10'>
                    <button className="btn btn-outline btn-neutral">View Available Cars</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;