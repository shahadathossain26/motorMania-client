import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    let { data: myProducts = [], refetch } = useQuery({
        queryKey: ['myProducts'],
        queryFn: async () => {
            const res = await fetch(`https://motor-mania-server.vercel.app/products?name=${user.displayName}`)
            const data = await res.json();
            return data
        }
    })
    console.log(myProducts);

    const handleAdvertise = id => {
        fetch(`https://motor-mania-server.vercel.app/products/advertise/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("Seller Varified");
                    refetch();
                }
            })
    }

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure you want to delete this review?');
        if (proceed) {
            fetch(`https://motor-mania-server.vercel.app/products/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        const remaining = myProducts.filter(myProduct => myProduct._id !== id);
                        myProducts = remaining
                        toast.success("Deleted Succesfully");
                        refetch();
                    }
                })
        }
    }
    return (
        <section>
            <h2 className='text-2xl md:text-3xl lg:text-4xl text-primary font-bold mt-12 mb-5 ml-5'>My Products</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myProducts.map((myProduct, i) => <tr
                                key={myProduct._id}
                            >
                                <th>{i + 1}</th>
                                <td>{myProduct.name}</td>
                                <td>{myProduct.status}</td>
                                <td>{myProduct.resale_price}</td>
                                <td>{myProduct?.advertise !== 'true' ? <button onClick={() => handleAdvertise(myProduct._id)} className="btn btn-accent text-white">Advertise</button>
                                    :
                                    <p className='text-accent'>Advertised</p>}</td>
                                <td><button onClick={() => handleDelete(myProduct._id)} className="btn btn-primary text-white">Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default MyProducts;