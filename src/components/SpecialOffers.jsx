import React from 'react';

const SpecialOffers = () => {


    return (
        <div>

            <div className=''>
                <div className='text-center'>
                    <h1 className='text-2xl md:text-4xl font-semibold text-amber-500'>Special Offers For You</h1>
                    <p className='text-gray-500 mt-2'>New deals are arrived, checkout the best deals</p>
                </div>
                <div className='bg-discount-bg bg-cover bg-no-repeat bg-center h-[100px] py-20 md:h-[700px] relative mt-10 scale-75 md:hover:scale-110'>
                    <div className='absolute md:top-72 md:left-[500px] left-28'>
                        <h1 className='md:text-7xl font-semibold text-gray-600'>Get 15% off for weekend rentals!</h1>
                        <p className='text-xs md:text-[20px] md:text-center md:mt-3 text-gray-500'>Luxury cars at $30/day this holiday season!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialOffers;