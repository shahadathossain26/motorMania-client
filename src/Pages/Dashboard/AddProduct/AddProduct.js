
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [currentUser, setCurrentUser] = useState(null)
    const { user } = useContext(AuthContext);
    console.log(user)
    const navigate = useNavigate();

    useEffect(() => {
        if (user.email) {
            fetch(`https://motor-mania-server.vercel.app/user/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setCurrentUser(data)
                })
        }
    }, [user.email])


    const imageBBKey = process.env.REACT_APP_imgbb_key

    const current = new Date();
    // By default US English uses 12hr time with AM/PM
    const time = current.toLocaleTimeString("en-US");
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const postDate = `${time}, ${date}`;
    let categoryId = "";


    const handleAddProduct = data => {
        console.log(data);
        const image = data.image[0];

        const formdata = new FormData();
        formdata.append('image', image);
        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageBBKey}`
        fetch(url, {
            method: 'POST',
            body: formdata
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const product = {
                        name: data.productName,
                        image: imgData.data.url,
                        location: data.location,
                        resale_price: data.price,
                        original_price: data.originalPrice,
                        years_of_use: (2022 - data.purchase).toString(),
                        year_of_perchase: data.purchase,
                        condition: data.condition,
                        category_id: data.product_category,
                        seller_name: user.displayName,
                        seller_status: currentUser.status,
                        publish_date: postDate,
                        status: "available",
                        advertise: "false"
                    }
                    console.log(product);

                    // save product information to the database
                    fetch('https://motor-mania-server.vercel.app/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success('Product Added Successfully');
                            navigate('/dashboard/myproducts')
                        })
                }
            })
    }

    return (
        <div className='w-full md:w-[550px]  shadow-xl  border px-[29px] py-[25px] mx-auto mt-16'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl text-center text-primary font-bold'>Add A Product</h2>

            <form onSubmit={handleSubmit(handleAddProduct)}>
                <div className="form-control w-full">
                    <label className="label"><span className="label-text text-black">Product Name</span>
                    </label>
                    <input type="text" {...register("productName")} placeholder='Product Name' className="input input-bordered border-slate-400 w-full  text-black" required />
                </div>

                <div className="form-control w-full">
                    <label className="label"><span className="label-text text-black">Product Image</span>
                    </label>
                    <input type="file" {...register("image")} placeholder='' className="input input-bordered border-slate-400 w-full  text-black" required />
                </div>

                <div>
                    <label className="label"><span className="label-text text-black">Product Category</span>
                    </label>
                    <select {...register("product_category")} className="select select-bordered w-full  border-slate-400  text-black">
                        <option selected>63809ebb57bfdf11ee0e270b</option>
                        <option>63809ebb57bfdf11ee0e270c</option>
                        <option>63809ebb57bfdf11ee0e270d</option>
                    </select>
                </div>

                <div className="form-control w-full ">
                    <label className="label"><span className="label-text text-black">Price</span>
                    </label>
                    <input type="text" {...register("price")} placeholder="Price" className="input input-bordered w-full  text-black" required />
                    {/* {errors.email && <p role="alert" className='text-red-700'>{errors.email?.message}</p>} */}
                </div>

                <div className="form-control w-full ">
                    <label className="label"><span className="label-text text-black">Original Price</span>
                    </label>
                    <input type="text" {...register("originalPrice")} placeholder="Original Price" className="input input-bordered w-full  text-black" required />
                    {/* {errors.email && <p role="alert" className='text-red-700'>{errors.email?.message}</p>} */}
                </div>

                <div className="form-control w-full  ">
                    <label className="label"><span className="label-text text-black">Location</span>
                    </label>
                    <input type="text" {...register("location")} placeholder='Location' className="input input-bordered w-full " required />
                    {/* {errors.password && <p role="alert" className='text-red-700'>{errors.password?.message}</p>} */}
                </div>

                <div className="form-control w-full  ">
                    <label className="label"><span className="label-text text-black">Mobile Number</span>
                    </label>
                    <input type="text" {...register("mobileNumber")} placeholder='Mobile Number' className="input input-bordered w-full " required />
                    {/* {errors.password && <p role="alert" className='text-red-700'>{errors.password?.message}</p>} */}
                </div>

                <div className="form-control w-full  ">
                    <label className="label"><span className="label-text text-black">Purchase Year</span>
                    </label>
                    <input type="text" {...register("purchase")} placeholder='' className="input input-bordered w-full " required />
                    {/* {errors.password && <p role="alert" className='text-red-700'>{errors.password?.message}</p>} */}
                </div>

                <div>
                    <label className="label"><span className="label-text text-black">Condition</span>
                    </label>
                    <select {...register("condition")} className="select select-bordered w-full  border-slate-400  text-black">
                        <option selected>fair</option>
                        <option>good</option>
                        <option>excellent</option>
                    </select>
                </div>

                <div className="form-control w-full  ">
                    <label className="label"><span className="label-text text-black">Description</span>
                    </label>
                    <textarea {...register("description")} className="textarea textarea-bordered mb-5 h-28" placeholder="Description"></textarea>
                    {/* <input type="text"  placeholder='Description' className="input input-bordered w-full "/> */}
                    {/* {errors.password && <p role="alert" className='text-red-700'>{errors.password?.message}</p>} */}
                </div>

                {/* <div>
                    {
                        registerError && <p className='text-red-700 mb-5'>{registerError}</p>
                    }
                </div> */}

                <button className="btn btn-primary texl-2xl text-white w-full mb-[11px]">Add</button>

            </form>
        </div>
    );
};

export default AddProduct;