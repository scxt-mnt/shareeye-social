import React, { useState } from 'react'
import global from '../publicInstance';
import { AxiosError } from 'axios';
import usernameLogo from '../assets/username.png'
import passwordLogo from '../assets/password.png'
import styles from './LoginDesign.module.css';

const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const createUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await global.post('/', { username: username, password: password });
            if (res.status === 201) {
                console.log('user created');
            }
        } catch (err) {
            const error = err as AxiosError
            if (error.response?.status === 409) {
                console.log(error.response.data);
            } if (error.response?.status === 500) {
                console.log(error.response.data);
            } else {
                console.log('unknown error');
            }
        }
    }



    return (
        <>
            <main className='h-screen grid place-items-center bg-indigo-300'>
                <form className='w-[350px] h-[420px] flex flex-col justify-center items-center gap-2 font-poppins bg-indigo-900/30 shadow-2xl relative rounded-md backdrop-blur-md border boder-white' onSubmit={createUser}>
                    <h1 className='text-[40px] font-bold absolute top-6 text-white'>login</h1>
                    <figure className='relative h-auto'>
                        <input placeholder='username' className={` ${styles.username} 
                        border-2 border-blue-300 rounded-xl h-[45px] mt-[50px] outline-none placeholder:text-indigo-400`} value={username} onChange={(e) => setUsername(e.target.value)} type='username' /><br />
                        <img className='absolute top-[55px] right-[10.5px] h-[30px]' src={usernameLogo} alt="can't load image" />
                    </figure>

                    <figure className='relative'>                    <input placeholder='password' className={` ${styles.password} border-2 border-indigo-300 rounded-xl h-[45px] outline-none placeholder:text-indigo-400`} value={password} onChange={(e) => setPassword(e.target.value)} type='password' /><br />
                        <img className={`${styles.eyeLogo}
                        absolute top-3 right-3 h-[25px] `} src={passwordLogo} alt="can't load image" />

                    </figure>
                    <button className='mt-10 bg-indigo-600 pl-10 pr-10 p-1 rounded-md font-bold text-white '>sign in</button>

                </form>
            </main>
        </>
    )
}

export default Login
