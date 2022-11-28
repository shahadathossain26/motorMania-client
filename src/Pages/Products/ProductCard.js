
import toast from 'react-hot-toast';
import blueTick from '../../assets/blue-tick.png'


const ProductCard = ({ product, setBookingProduct }) => {
    const { _id, name, image, location, resale_price, original_price, years_of_use, publish_date, seller_name, seller_status } = product;



    const handleReport = id => {
        fetch(`https://motor-mania-server.vercel.app/products/report/${id}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("Reported Succesfully");

                }
            })
    }
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
                    <p className='flex'>Seller:{seller_status === "verified" && <img className='w-5 ml-2' src={blueTick} alt='blueTick'></img>} {seller_name}</p>
                    <p>Use: {years_of_use}years</p>
                </div>
                <p>Date: {publish_date}</p>


                <div className="card-actions justify-end">
                    <button onClick={() => handleReport(_id)} className='btn btn-accent text-white'>Report</button>
                    <label onClick={() => setBookingProduct(product)} htmlFor="booking-modal" className="btn btn-primary text-white">Book Now</label>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;