import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllSellers = () => {
    let { data: sellers = [], refetch } = useQuery({
        queryKey: ['Sellers'],
        queryFn: async () => {
            const res = await fetch('https://motor-mania-server.vercel.app/sellers')
            const data = await res.json();
            return data
        }
    })
    console.log(sellers);

    const handleVerify = id => {
        fetch(`https://motor-mania-server.vercel.app/users/verify/${id}`, {
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
            fetch(`https://motor-mania-server.vercel.app/users/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        const remaining = sellers.filter(seller => seller._id !== id);
                        sellers = remaining
                        toast.success("Deleted Succesfully");
                        refetch();
                    }
                })
        }
    }


    return (
        <section>
            <h2 className='text-2xl md:text-3xl lg:text-4xl text-primary font-bold mt-12 mb-5 ml-5'>All Buyers</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Account</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.map((seller, i) => <tr
                                key={seller._id}
                            >
                                <th>{i + 1}</th>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>{seller.account_type}</td>
                                <td>{seller?.status !== 'verified' ? <button onClick={() => handleVerify(seller._id)} className="btn btn-accent text-white">Verify</button>
                                    :
                                    <p className='text-accent'>Verified</p>}</td>
                                <td><button onClick={() => handleDelete(seller._id)} className="btn btn-primary text-white">Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AllSellers;