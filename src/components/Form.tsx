import { useSelector } from "react-redux"
import type { RootState } from "../Store";
import { useDispatch } from "react-redux";
import { setUser } from "../userSlice";
import { useEffect } from "react";
import { FormAbout } from "../publicInstance";
const Form = () => {
    const selector = useSelector((state: RootState) => state.user.value);
    const dispatch = useDispatch();


    useEffect(() => {
        console.log('hello')
        try {
            const getToken = async () => {
                const resGet = await FormAbout.get('/');
                if (resGet.status === 200) {
                    dispatch(setUser({ id: resGet.data.id, isLog: resGet.data.isLog}))
                }
            }
            getToken();
        } catch (e) {
            console.log('no session')

        }
    }, [])


    return (
        <>

            {selector.isLog ? <main className='absolute h-screen w-screen grid place-items-center font-poppins text-lg'>
                <h1 className='text-2xl font-bold'>{`Please tell us about yourself`}</h1>
                <section className='transform '>
                    <h1>first name</h1>
                    <input className='w-[13rem] ' type='text' /></section>
                <br />
                <section className='-translate-y-[130px]'>
                    <h1>last name</h1>
                    <input className='w-[13rem] h-[2rem]' type='text' />
                </section>
                <section className='-translate-y-[170px]'>
                    <h1>bio</h1>
                    <textarea className='w-[13rem] h-[8rem]'></textarea></section>
            </main>
                : <h1>auth error</h1>

            }

        </>
    )
}

export default Form
