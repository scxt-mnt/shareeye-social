import { useState } from 'react';
import publicInstance from '../publicInstance';

const Login = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    const createUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await publicInstance.post('/user', {
                username: username,
                password: password
            });
            console.log(res.data);
        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <>
            <form onSubmit={createUser}>
                <h1> Login here</h1>
                <input value={username} onChange={(e) => setUsername(e.target.value)} name='username' type='text' /><br />
                <input value={password} onChange={(e) => setPassword(e.target.value)} name='password' type="password" /><br />
                <button>Login</button>
            </form>
        </>
    )
}

export default Login
