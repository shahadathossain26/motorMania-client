import React from 'react';

const Category = ({ category }) => {
    const { name, image } = category;
    return (
        <div className='relative mb-16 mt-10'>
            <div className='category'>
                <img className='w-full h-1/2' src={image} alt="" />
            </div>
            <p className='absolute text-black top-2 left-2 md:top-1/5 md:left-3 lg:top-5 lg:left-5'>Power tools of next level</p>
            <h3 className='absolute text-2xl md:text-3xl lg:text-4xl text-black font-bold
            top-12 left-2 md:left-3 md:top-2/5 lg:top-16 lg:left-5'>{name} Bikes</h3>
            <button className="btn btn-primary absolute top-24 left-2 md:top-3/4 md:left-3  lg:left-5 lg:top-[135] text-[12px] md:text-[15px] lg:text-xl text-white">Shop Now</button>
        </div>
    );
};

export default Category;