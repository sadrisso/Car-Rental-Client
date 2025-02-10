import React from 'react';
import Banner from '../components/Banner';
import WhyChooseUs from '../components/WhyChooseUs';
import RecentListed from '../components/RecentListed';
import SpecialOffers from '../components/SpecialOffers';
import HappyCustomers from '../components/HappyCustomers';

const Home = () => {


    return (
        <div className='pt-10'>
            <Banner></Banner>
            <WhyChooseUs></WhyChooseUs>

            <div className='mt-20'>
                <RecentListed></RecentListed>
            </div>

            <div className='mt-20'>
                <SpecialOffers></SpecialOffers>
            </div>

            <div className="mt-20">
                <HappyCustomers></HappyCustomers>
            </div>

        </div>
    );
};

export default Home;