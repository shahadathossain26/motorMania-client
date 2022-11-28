import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const { data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/orders?email=${user.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data
        }

    })

    return (
        <div>
            <h2 className='text-2xl md:text-3xl lg:text-4xl text-primary font-bold mt-12 mb-5 ml-5'>My Orders</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {orders &&
                            orders?.map((order, i) => <tr
                                key={order._id}
                            >
                                <td>{i + 1}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-20 h-20">
                                                <img src={order.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {order.productName}
                                </td>
                                <td>{order.price}</td>
                                <th>
                                    <button className="btn btn-primary text-white">Pay</button>
                                </th>
                            </tr>)
                        }

                    </tbody>



                </table>
            </div>
        </div>
    );
};

export default MyOrders;