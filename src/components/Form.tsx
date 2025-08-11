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
    const [bioClick, setBioClick] = useState<boolean>(false);



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

            console.log('no session', e);

        }
    })


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

            {selector.isLog ? <main className='absolute h-screen w-screen grid place-content-center font-poppins text-lg bg-violet-400 gap-4'>
                <div className=' border-r-4 bg-violet-700 h-[300px] w-[300px] absolute rounded-full z-0'></div>
                <div className=' border-l-4 bg-violet-800 h-[200px] w-[200px] absolute rounded-full z-0 bottom-0 right-0'></div>
                <h1 className='text-2xl 
                    font-bolds  top-10 font-bold text-white whitespace-pre border-b-4 border-violet-300 z-20 w-20'>{`Please tell us 
about yourself`}</h1>
                <section className='  border-t-4 border-white  z-20 h-[380px] relative flex flex-col justify-center gap-5 pr-[7px] pl-[10px]  '>
                    <section className={`border-r-[6px] transition-border duration-1000 h-[85px] w-[300px] pl-5 pt-3 -mb-4 z-20   relative ${nameClick ? 'border-violet-900' : 'border-white'}`}>
                        <h1 className={`pointer-events-none  transition-transform duration-1000 ml-2 absolute z-20 left-[30px] ${nameClick ? 'transiton-text-md text-violet-100 -translate-y-[9px]' : 'translate-y-[22px] text-sm text-gray-500'} `}>first name</h1>
                        <div className={`absolute right-2 bg-violet-900 h-10 w-10 rounded-full z-10  ${nameClick ? 'animate-bounce' : 'animate-none'}`}>
                            <div className='absolute bg-white h-[10px] w-[20px] rounded-full'></div>
                            <div className='absolute left-[10px] bg-black h-[5px] w-[5px] rounded-full'></div>

                        </div>
                        <div className={`z-0 absolute right-0 top-[20px] bg-violet-900 h-[20px] w-[30px] ${nameClick ? 'animate-spin' : 'animate-none'}`}></div>
                        <input onFocus={handleNameFocus} onBlur={handleNameBlur} className='nameForm w-[15rem] rounded outline-none absolute left-[27px] top-[30px] hover:border-violet-900 z-10 ' type='text' /></section>
                    <br />
                    <section className={`border-l-[6px] transition-border duration-1000 h-[85px] w-[300px] pl-5  pt-2 z-20 relative ${lNameClick ? 'border-violet-900' : 'border-white'}`}>
                        <h1 className={`pointer-events-none transition-transform duration-1000 ml-2 z-20 absolute left-[32px] ${lNameClick ? '-translate-y-[6px] transiton-text-md text-violet-100 text-white' : 'translate-y-[26px] text-sm text-gray-500'} `}>last name</h1>
                        <input onFocus={handleLnameFocus} onBlur={handleLnameBlur} className='w-[15rem] h-[30px] outline-none absolute left-[30px] z-0 top-[30px] rounded' type='text' />
                    </section>
                    <section className={`border-l-[6px] transition-border duration-1000 h-[110px] w-[300px] pl-5 pt-3 z-20 relative ${bioClick ? 'border-violet-900' : 'border-white'} `}>
                        <h1 className={`pointer-events-none transition-transform  duration-1000 ml-2 z-10 absolute left-[30px] ${bioClick ? '-translate-y-[15px] transiton-text-md text-violet-100' : 'translate-y-[35px] text-sm text-gray-500'} `}>bio</h1>
                        <textarea onFocus={handleBioFocus} onBlur={handleBioBlur} className='w-[15rem] h-[4rem] outline-none absolute left-[30px] z-0 top-[25px]'></textarea></section></section>

            </main>
                : <h1>auth error</h1>

            }

        </>



    )
}

export default Form
