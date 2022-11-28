import React, { useContext, useState } from 'react';
import loginImage from '../../assets/login.jpg';
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import useToken from '../../Hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { logIn, googleLogin } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);

    const location = useLocation();
    const navigate = useNavigate();

    const from = location?.state?.from?.pathname || '/'
    const googleProvider = new GoogleAuthProvider();

    if (token) {
        navigate(from, { replace: true });
    }
    const handleLogin = data => {
        console.log(data);
        setLoginError('');
        logIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(data.email);

            })
            .catch(err => {
                console.log(err.message);
                setLoginError(err.message);
            })
    }

    const handleGoogleLogin = () => {
        googleLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                saveUser(user?.displayName, user?.email)

            })
            .catch(error => console.error(error))
    }
    const saveUser = (name, email,) => {
        const user = {
            name,
            email,
            account_type: "Buyer"
        };
        fetch('https://motor-mania-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json)
            .then(data => {
                console.log(data);
                setLoginUserEmail(email)

            })
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
                        <input type="text" {...register("email", { required: "Email Address is required" })} className="input input-bordered w-full max-w-xs text-black" />
                        {errors.email && <p role="alert" className='text-red-700'>{errors.email?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text text-black">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: 'Password is required',
                            minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                        })} className="input input-bordered w-full max-w-xs text-black" />
                        {errors.password && <p role="alert" className='text-red-700'>{errors.password?.message}</p>}
                    </div>
                    <p className='text-[14px] mb-[18px] text-black'>Forgot Password ?</p>


                    <button className="btn btn-primary text-white w-full mb-[11px]">Login</button>
                    <div>
                        {
                            loginError && <p className='text-red-700 mb-5'>{loginError}</p>
                        }
                    </div>
                    <p className='text-black'>New to Doctors Portal? <span className='text-primary'><Link to='/register'>Create new account</Link></span></p>
                    <div className="divider mb-[25px] text-black">OR</div>
                    <button onClick={handleGoogleLogin} className="btn btn-outline btn-primary w-full text-white">Continue With Google</button>
                </form>
            </div>
        </section>
    );
};

export default Login;