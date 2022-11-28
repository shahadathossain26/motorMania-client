import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const ReportedProducts = () => {
    let { data: reportedProducts = [], refetch } = useQuery({
        queryKey: ['reportedProducts'],
        queryFn: async () => {
            const res = await fetch('https://motor-mania-server.vercel.app/reportedProducts')
            const data = await res.json();
            return data
        }
    })

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
                        const remaining = reportedProducts.filter(reportedProduct => reportedProduct._id !== id);
                        reportedProducts = remaining
                        toast.success("Deleted Succesfully");
                        refetch();
                    }
                })
        }
    }

    return (
        <section>
            <h2 className='text-2xl md:text-3xl lg:text-4xl text-primary font-bold mt-12 mb-5 ml-5'>Reported Products</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportedProducts.map((reportedProduct, i) => <tr
                                key={reportedProduct._id}
                            >
                                <th>{i + 1}</th>
                                <td>{reportedProduct.name}</td>
                                <td>{reportedProduct.status}</td>
                                <td>{reportedProduct.resale_price}</td>
                                <td><button onClick={() => handleDelete(reportedProduct._id)} className="btn btn-primary text-white">Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ReportedProducts;