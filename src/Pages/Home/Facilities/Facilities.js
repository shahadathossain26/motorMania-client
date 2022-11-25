import React from 'react';
import { FaTruckMoving, FaHeadset, FaShieldVirus, FaTags } from "react-icons/fa";
const Facilities = () => {
    return (
        <section className='flex justify-around mt-5 mb-16'>
            <div className='bg-primary flex justify-center items-center text-white p-10 rounded-2xl'>
                <div><FaTruckMoving className='text-[45px] mr-10'></FaTruckMoving></div>
                <div className='text-xl'>
                    <h5>Free Shipping</h5>
                    <p>For orders from $50
                    </p>
                </div>
            </div>
            <div className='bg-black flex justify-center items-center text-white p-10 rounded-2xl'>
                <div><FaHeadset className='text-[45px] mr-10'></FaHeadset></div>
                <div className='text-xl'>
                    <h5>Support 24/7
                    </h5>
                    <p>Call us anytime


                    </p>
                </div>
            </div>
            <div className='bg-primary flex justify-center items-center  text-white p-10 rounded-2xl'>
                <div><FaShieldVirus className='text-[45px] mr-10'></FaShieldVirus></div>
                <div className='text-xl'>
                    <h5>100% Safety
                    </h5>
                    <p>Only secure payments


                    </p>
                </div>
            </div>
            <div className='bg-black flex justify-center items-center text-white p-10 rounded-2xl'>
                <div><FaTags className='text-[45px] mr-10'></FaTags></div>
                <div className='text-xl'>
                    <h5>Hot Offers
                    </h5>
                    <p>Discounts up to 90%


                    </p>
                </div>
            </div>
        </section>
    );
};

export default Facilities;