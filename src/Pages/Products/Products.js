
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import background from '../../assets/products.jpg';
import BookingModal from './BookingModal/BookingModal';
import ProductCard from './ProductCard';

const Products = () => {
    // const { name, image, location, resale_price, original_price, years_of_use, publish_date, seller_name } = useLoaderData();
    const products = useLoaderData();
    const [bookingProduct, setBookingProduct] = useState({});

    return (
        <section className='mt-5 mb-16'>
            <div className="hero" style={{ backgroundImage: `url(${background})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content p-20">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl text-white text-left font-bold">Products</h1>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-5 lg:mx-16 my-28'>
                {
                    products.map(product => <ProductCard
                        key={product._id}
                        product={product}
                        setBookingProduct={setBookingProduct}
                    ></ProductCard>)
                }
            </div>
            <BookingModal
                bookingProduct={bookingProduct}
            ></BookingModal>
        </section>

    );
};

export default Products;