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

            {selector.isLog ? <main className='absolute h-screen w-screen grid place-content-center font-poppins text-lg gap-5 bg-violet-400'>
                <div className='bg-violet-700 h-[300px] w-[300px] absolute rounded-full z-0'></div>
                <div  className='bg-violet-700 h-[200px] w-[200px] absolute rounded-full z-0 bottom-0 right-0'></div>
                <h1 className='text-2xl 
                font-bolds absolute left-[20px] top-10 font-bold text-white'>{`Please tell us about yourself`}</h1>
                <section className='bg-violet-700 h-[85px] w-[300px] pl-5 rounded-xl pt-3 -mb-4 z-20'>
                    <h1 className={`pointer-events-none  transition-transform duration-1000 ml-2 ${nameClick ? 'a   -y-0 transiton-text-md text-white' : 'translate-y-[23.5px] text-sm text-gray-500'} `}>first name</h1>
                    <input  onFocus={handleNameFocus} onBlur={handleNameBlur} className='nameForm w-[15rem] rounded' type='text' /></section>
                <br />
                <section className='bg-violet-700 h-[85px] w-[300px] pl-5 rounded-xl pt-2 z-20'>
                    <h1 className={`pointer-events-none transition-transform  duration-1000 ml-2 ${lNameClick ? 'translate-y-0 transiton-text-md text-white' : 'translate-y-[26px] text-sm text-gray-500'} `}>last name</h1>
                    <input onFocus={handleLnameFocus} onBlur={handleLnameBlur} className='w-[15rem] h-[2rem]' type='text' />
                </section>
                <section className='bg-violet-700 h-[150px] w-[300px] pl-5 rounded-xl pt-3 z-20'>
                    <h1 className={`pointer-events-none transition-transform  duration-1000 ml-2 ${BioClick ? 'translate-y-0 transiton-text-md text-white' : 'translate-y-[26px] text-sm text-gray-500'} `}>bio</h1>
                    <textarea onFocus={handleBioFocus} onBlur={handleBioBlur} className='w-[15rem] h-[5rem]'></textarea></section>
            </main>
                : <h1>auth error</h1>

            }

        </>
    )
}

export default Form
