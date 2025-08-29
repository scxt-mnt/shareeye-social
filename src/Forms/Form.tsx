import { useSelector } from "react-redux"
import type { RootState } from "../Store";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux Slice/userSlice";
import { useEffect, useRef, useState } from "react";
import { FormAbout } from "../axios instances/GlobalAuth";
import type { AxiosError } from "axios";
import { Link } from "react-router-dom";
import LoadingAnimation from "../animations/LoadingAnimation";
const Form = () => {
    const selector = useSelector((state: RootState) => state.user.value);
    const dispatch = useDispatch();
    const [nameClick, setNameClick] = useState<boolean>(false);
    const [lNameClick, setLnameClick] = useState<boolean>(false);
    const [bioClick, setBioClick] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [aboutBio, setAboutBio] = useState<string>("");
    const loading = useRef<HTMLDivElement>(null);




    useEffect(() => {

        if (loading.current) loading.current.style.visibility = 'visible';
        const getToken = async () => {
            try {
                const resGet = await FormAbout.get('/');
                if (resGet.status === 200) {
                    dispatch(setUser({ id: resGet.data.id, isLog: resGet.data.isLog }))
                }
                if (resGet.status === 400) return console.log(resGet.data);


            } catch (e) {
                console.log('no session', e);
            } finally {
                if (loading.current) loading.current.style.visibility = 'hidden';
            }
        }
        getToken();

    }, [dispatch])

    const aboutUserSend = async () => {
        try {
            await FormAbout.post('/', {
                id: selector.id,
                name: name,
                lastName: lastName,
                aboutBio: aboutBio
            })
            console.log('info saved');
        } catch (err) {
            const error = err as AxiosError;
            if (error.response?.status === 500) {
                return console.log('database error');
            }
        }
    }

    const fields = [
        { name: "name", setFocus: setNameClick, clickValue: nameClick,value: name, setValue: setName},
        { name: "last name", setFocus: setLnameClick,clickValue: lNameClick, value: lastName, setValue: setLastName},
        { name: "bio", setFocus: setBioClick,clickValue: bioClick, value: aboutBio, setValue: setAboutBio}
    ]


    return (
        <>

            {selector.isLog ? <main className='absolute h-screen w-screen grid place-content-center font-poppins text-lg bg-violet-400 gap-4'>
                <div className='border-r-4 bg-violet-700 h-[300px] w-[300px] absolute rounded-full z-0'></div>
                <LoadingAnimation ref={loading} />
                <h1 className='text-2xl 
                    font-bolds  top-10 font-bold text-white whitespace-pre border-b-4 border-violet-300 z-20 w-20'>{`Please tell us 
about yourself`}</h1>
                <section className='border-t-4 border-white  z-20 h-[380px] relative flex flex-col justify-center gap-5 pr-[7px] pl-[10px]  '>

                    {fields.map((field) => {
                        return (
                            <section key={field.name} className={`border-r-[6px] transition-border duration-1000 h-[85px] w-[300px] pl-5 pt-3 -mb-4 z-20   relative ${field.clickValue ? 'border-violet-900' : 'border-white'}`}>
                                <h1 className={`pointer-events-none  transition-transform duration-1000 ml-2 absolute z-20 left-[30px] ${field.clickValue ? 'transiton-text-md text-violet-100 -translate-y-[9px]' : 'translate-y-[22px] text-sm text-gray-500'} `}>{field.name}</h1>
                                <input value={field.value} onChange={(e) => field.setValue(e.target.value)} onFocus={() => field.setFocus(true)} onBlur={() => !field.value && field.setFocus(false)} className='nameForm w-[15rem] rounded outline-none absolute left-[27px] top-[30px] hover:border-violet-900 z-10 pl-2' type='text' /></section>
                        )
                    })}
                </section>
                <Link to="Profile-Upload"> <button onClick={aboutUserSend} className={` w-[1px] transition-all duration-1000 absolute right-0 bottom-10 font-bold text-white bg-violet-500  ${name && lastName && aboutBio ? 'pr-[5rem] pl-[2rem]' : ''}`}>next</button></Link>
            </main>
                : <h1>auth error</h1>

            }

        </>



    )
}

export default Form
