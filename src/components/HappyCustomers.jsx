import React from 'react';

const HappyCustomers = () => {



    return (
        <div>
            <div className=''>
                <div className='text-center'>
                    <h1 className='text-2xl md:text-4xl font-semibold text-amber-500'>Our Happy Customers</h1>
                    <p className='text-gray-500 mt-2'>Meet our happy customers and know their opinion about us</p>
                </div>
                <div className='mt-10'>
                    <div className='flex flex-col md:flex-row p-5 gap-10 items-center justify-center'>
                        <div>
                            <img className='md:w-[300px] md:h-[270px] rounded-full' src="https://i.ibb.co.com/2kwYBMS/happy-Customer-1.webp" alt="" />
                        </div>
                        <div>
                            <img className='md:w-[300px] md:h-[270px] rounded-full' src="https://i.ibb.co.com/JxLzkt4/happy-Customer-3.jpg" alt="" />
                        </div>
                        <div>
                            <img className='md:w-[300px] md:h-[270px] rounded-full' src="https://i.ibb.co.com/9HJKGD0/happy-Customer-4.jpg" alt="" />
                        </div>
                        <div>
                            <img className='md:w-[300px] md:h-[270px] rounded-full' src="https://i.ibb.co.com/5LRyVNc/happy-Customer-2.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HappyCustomers;