import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const AllBuyers = () => {
    const { user } = useContext(AuthContext);

    let { data: buyers = [], refetch } = useQuery({
        queryKey: ['Buyers'],
        queryFn: async () => {
            const res = await fetch(`https://motor-mania-server.vercel.app/buyers?email=${user.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data
        }
    })
    console.log(buyers);

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
                        const remaining = buyers.filter(buyer => buyer._id !== id);
                        buyers = remaining
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers.map((buyer, i) => <tr
                                key={buyer._id}
                            >
                                <th>{i + 1}</th>
                                <td>{buyer.name}</td>
                                <td>{buyer.email}</td>
                                <td>{buyer.account_type}</td>
                                <td><button onClick={() => handleDelete(buyer._id)} className="btn btn-primary text-white">Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AllBuyers;