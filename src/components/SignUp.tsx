import React, { useEffect, useState } from 'react'
import SignUp from '../publicInstance';
import { AxiosError } from 'axios';
import usernameLogo from '../assets/username.png'
import closedPassword from '../assets/closedPassword.png';
import passwordLogo from '../assets/password.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../userSlice';
import { FormAbout } from '../publicInstance';

const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [toShow, setToShow] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const createUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await SignUp.post('/', { username: username, password: password });
            if (res.status === 201) {
                console.log('user created');
                navigate('/Form-about');
            }

        } catch (err) {
            const error = err as AxiosError
            if (error.response?.status === 409) {
                console.log(error.response.data);
            } if (error.response?.status === 500) {
                console.log(error.response.data);
            } else {
                console.log('unknown error', error);
            }
        }
    }

    const handleClick = () => {
        setToShow(state => !state);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    

    return (
        <>
            <main className='h-screen grid place-items-center bg-indigo-300'>
                <form className='w-[350px] h-[420px] flex flex-col justify-center items-center gap-2 font-poppins bg-indigo-900/30 shadow-2xl shadow-white relative rounded-md backdrop-blur-md border boder-white ' onSubmit={createUser}>
                    <h1 className='text-[40px] font-bold absolute top-6 text-white'>Sign Up</h1>
                    <figure className='relative h-auto'>
                        <input placeholder='username' className={`  
                        border-2 border-blue-300 rounded-xl h-[45px] mt-[80px] outline-none placeholder:text-indigo-400 p-1`} value={username} onChange={(e) => setUsername(e.target.value)} type='username' /><br />
                        <img className='absolute top-[85px] right-[10.5px] h-[30px]' src={usernameLogo} alt="can't load image" />
                    </figure>

                    <figure className='relative'>
                        <input placeholder='password' className={` border-2 border-indigo-300 rounded-xl h-[45px] outline-none placeholder:text-indigo-400 p-1`} value={password} onChange={handleChange} type={`${toShow ? 'text' : 'password'}`} /><br />


                        {password &&
                            <>
                                {toShow === false &&
                                    <button onClick={handleClick} className={`absolute top-3 right-3 `}>
                                        <img className={`h-[25px]`} src={passwordLogo} alt="can't load image" />
                                    </button>}
                            </>
                        }




                        {password &&
                            <>
                                {toShow === true && <button onClick={handleClick} className={`absolute top-3 right-3 h-auto`}>
                                    <img className={`
                         h-[25px] `} src={closedPassword} alt="can't load image" />
                                </button>}
                            </>}


                    </figure>
                    <div></div>
                    <button className='mt-4 bg-indigo-500 pl-10 pr-10 p-[5px] rounded-md font-bold text-white border '>sign in</button>
                    <p className='text-white mt-7'>Already have account? <Link to='/SignIn' className='font-bold text-indigo-600 shadow-black shadow-xl shadow-white rounded-md' >Log in</Link></p>

                </form>
            </main>
        </>
    )
}

export default Login
