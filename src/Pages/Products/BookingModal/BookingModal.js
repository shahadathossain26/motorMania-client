import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const BookingModal = ({ bookingProduct, setBookingProduct }) => {
    const { name, image, resale_price } = bookingProduct;
    const { user } = useContext(AuthContext);
    console.log(resale_price);

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const buyerName = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value;
        const price = form.price.value;

        const order = {
            productName: name,
            image: image,
            name: buyerName,
            email,
            phone,
            price
        }
        console.log(order)

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setBookingProduct(null);
                    toast.success('Order placed successfully')
                }

            })


    }
    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative text-black">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-2xl font-bold text-start -mt-4 mb-[20px]">{name}</h3>
                    <form onSubmit={handleBooking}>

                        <div>
                            <label className="label">
                                <span className="label-text text-black">Name</span>
                            </label>
                            <input type="text" name='name' defaultValue={user?.displayName} placeholder="Full Name" className="input input-bordered  w-full  bg-[#E6E6E6]" readOnly />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text text-black">Email</span>
                            </label>
                            <input type="text" name='email' defaultValue={user?.email} placeholder="Email" className="input input-bordered border-slate-400 w-full " readOnly />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text text-black">Phone</span>
                            </label>
                            <input type="text" name='phone' placeholder="Phone Number" className="input input-bordered w-full border-slate-400" />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text text-black">Price</span>
                            </label>
                            <input type="text" name='price' defaultValue={resale_price} placeholder="Price" className="input input-bordered border-slate-400 w-full" readOnly />
                        </div>

                        <div className='mb-10'>
                            <label className="label">
                                <span className="label-text text-black">Meeting Location</span>
                            </label>
                            <input type="text" name='meeting-location' placeholder="Location" className="input input-bordered border-slate-400 w-full" />
                        </div>

                        <button type='submit' className="btn btn-primary text-white w-full">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;