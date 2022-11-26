import React from 'react';

const ProductCard = ({ product }) => {
    const { name, image, location, resale_price, original_price, years_of_use, publish_date, seller_name } = product;
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img className='h-[300px]' src={image} alt="Shoes" /></figure>
            <div className="card-body text-black">
                <div className='flex justify-between'>
                    <h2 className="card-title">{name}</h2>
                    <p className='ml-[60px]'>Resale Price: BDT {resale_price}</p>
                </div>
                <div className='flex justify-between'>
                    <p>Location: {location}</p>
                    <p className='ml-[50px]'>Original Price: BDT {original_price}</p>
                </div>
                <div className='flex justify-between'>
                    <p>Seller: {seller_name}</p>
                    <p>Use: {years_of_use}years</p>
                </div>
                <p>Date: {publish_date}</p>

                <div className="card-actions justify-end">
                    <button className="btn btn-primary text-white">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;