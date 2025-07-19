import React, { useState } from 'react'
import global from '../publicInstance';
import { AxiosError } from 'axios';

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
            <main className='h-screen grid place-items-center'>
                <form className='w-screen h-[100px] flex flex-col items-center gap-4' onSubmit={createUser}>
                    <h1 className=''>login</h1>
                    <input className='' value={username} onChange={(e) => setUsername(e.target.value)} type='username' /><br />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' /><br />
                    <button>login</button>
                </form>
            </main>
        </>
    )
}

export default Login
