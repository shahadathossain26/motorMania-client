import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllSellers = () => {
    const { data: sellers = [] } = useQuery({
        queryKey: ['Sellers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/sellers')
            const data = await res.json();
            return data
        }
    })
    console.log(sellers);

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
                                <td><button className="btn btn-accent text-white">Verify</button></td>
                                <td><button className="btn btn-primary text-white">Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AllSellers;