import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import BookingModal from '../../Products/BookingModal/BookingModal';
import AdvertisedItem from './AdvertisedItem';

const AdvertisedItems = () => {
    const [bookingProduct, setBookingProduct] = useState(null);

    const { data: advertisedItems = [] } = useQuery({
        queryKey: ['advertisedItems'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/advertisedItems')
            const data = await res.json();
            return data
        }
    })
    console.log(advertisedItems);


    if (advertisedItems.length !== 0) {
        return (
            <section>
                <h2 className="mb-10 ml-10 text-2xl md:text-3xl lg:text-4xl text-black text-left font-bold">Advertised Items</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-5 lg:mx-16 my-28'>
                    {
                        advertisedItems.map(advertisedItem => <AdvertisedItem
                            key={advertisedItem._id}
                            advertisedItem={advertisedItem}
                            setBookingProduct={setBookingProduct}
                        ></AdvertisedItem>)
                    }
                </div>
                {
                    bookingProduct &&
                    <BookingModal
                        bookingProduct={bookingProduct}
                        setBookingProduct={setBookingProduct}
                    ></BookingModal>
                }
            </section>
        )
    }

};

export default AdvertisedItems;