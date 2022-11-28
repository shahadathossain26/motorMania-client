import React from 'react';
import article1 from '../../../assets/banner.jpg';
import article2 from '../../../assets/article1.jpg';
import article3 from '../../../assets/article2.jpg';


const Articles = () => {
    return (
        <section className=''>
            <h2 className="mb-10 ml-10 text-2xl md:text-3xl lg:text-4xl text-black text-left font-bold">Latest Articles</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-5'>
                <div className="card card-compact  bg-base-100 shadow-xl mb-5">
                    <figure><img src={article1} alt="" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Electric cars aren’t pollution-free; they have to get their energy from somewhere</h2>
                    </div>
                </div>
                <div className="card card-compact  bg-base-100 shadow-xl mb-5">
                    <figure><img src={article2} alt="" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">You can know or not know how a car runs and still enjoy riding in a car</h2>
                    </div>
                </div>
                <div className="card card-compact bg-base-100 shadow-xl mb-5">
                    <figure><img src={article3} alt="" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Race cars, no matter what size or shape they are, they do the same things. It is not complicated</h2>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Articles;