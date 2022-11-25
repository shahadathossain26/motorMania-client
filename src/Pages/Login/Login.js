import React from 'react';
import loginImage from '../../assets/login.jpg';
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const handleLogin = data => {
        console.log(data);
    }
    return (
        <section className='my-28 block lg:flex justify-around'>
            <div className='md:w-full lg:w-1/2 mb-16 lg:mb-0'>
                <img className='md:mx-auto lg:mx-0' src={loginImage} alt="" />
            </div>
            <div className='w-full  md:w-[385px] h-[480px] shadow-xl  border px-[29px] py-[25px] mx-auto'>
                <h2 className='text-xl text-center text-black'>Login</h2>

                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text text-black">Email</span>
                        </label>
                        <input type="text" {...register("email", { required: "Email Address is required" })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p role="alert" className='text-red-700'>{errors.email?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text text-black">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: 'Password is required',
                            minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p role="alert" className='text-red-700'>{errors.password?.message}</p>}
                    </div>
                    <p className='text-[14px] mb-[18px] text-black'>Forgot Password ?</p>


                    <button className="btn btn-primary text-white w-full mb-[11px]">Login</button>
                    <p className='text-black'>New to Doctors Portal? <span className='text-primary'><Link to='/register'>Create new account</Link></span></p>
                    <div className="divider mb-[25px] text-black">OR</div>
                    <button className="btn btn-outline btn-primary w-full text-white">Continue With Goole</button>
                </form>
            </div>
        </section>
    );
};

export default Login;