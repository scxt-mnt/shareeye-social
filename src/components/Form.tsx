import { useSelector } from "react-redux"
import type { RootState } from "../Store";
import { useDispatch } from "react-redux";
import { setUser } from "../userSlice";
import { useEffect, useState } from "react";
import { FormAbout } from "../publicInstance";
const Form = () => {
    const selector = useSelector((state: RootState) => state.user.value);
    const dispatch = useDispatch();
    const [nameClick, setNameClick] = useState<boolean>(false);
    const [lNameClick, setLnameClick] = useState<boolean>(false);
    const [BioClick, setBioClick] = useState<boolean>(false);



    useEffect(() => {
        console.log('hello')
        try {
            const getToken = async () => {
                const resGet = await FormAbout.get('/');
                if (resGet.status === 200) {
                    dispatch(setUser({ id: resGet.data.id, isLog: resGet.data.isLog }))
                }
            }
            getToken();
        } catch (e) {
            console.log('no session')

        }
    }, [])


    const handleNameFocus = () => {
        setNameClick(true);
    }
    const handleNameBlur = () => {
        setNameClick(false);
    }
    const handleLnameFocus = () => {
        setLnameClick(true);
    }
    const handleLnameBlur = () => {
        setLnameClick(false);
    }
    const handleBioFocus = () => {
        setBioClick(true);
    }
    const handleBioBlur = () => {
        setBioClick(false);
    }

    return (
        <>

            {selector.isLog ? <main className='absolute h-screen w-screen grid place-items-center font-poppins text-lg'>
                <h1 className='text-2xl font-bold'>{`Please tell us about yourself`}</h1>
                <section className='h-[100px]'>
                    <h1 className={`pointer-events-none  transition-transform  duration-1000 ${nameClick ? 'translate-y-0 transiton-text-md' : 'translate-y-[26px] text-sm text-gray-500'} `}>first name</h1>
                    <input onFocus={handleNameFocus} onBlur={handleNameBlur} className='nameForm w-[13rem]' type='text' /></section>
                <br />
                <section className=' transform -translate-y-[200px]'>
                    <h1 className={`pointer-events-none transition-transform  duration-1000 ${lNameClick ? 'translate-y-0 transiton-text-md' : 'translate-y-[26px] text-sm text-gray-500'} `}>last name</h1>
                    <input onFocus={handleLnameFocus} onBlur={handleLnameBlur} className='w-[13rem] h-[2rem]' type='text' />
                </section>
                <section className='-translate-y-[220px]'>
                    <h1 className={`pointer-events-none transition-transform  duration-1000 ${BioClick ? 'translate-y-0 transiton-text-md' : 'translate-y-[26px] text-sm text-gray-500'} `}>bio</h1>
                    <textarea onFocus={handleBioFocus} onBlur={handleBioBlur} className='w-[13rem] h-[8rem]'></textarea></section>
            </main>
                : <h1>auth error</h1>

            }

        </>
    )
}

export default Form
