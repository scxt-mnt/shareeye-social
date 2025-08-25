import logo from '../assets/ShareEyeLogoCircle.png'
import { useRef, useState, useEffect } from 'react'

const DashBoardNav = () => {
    const [isFocus, setIsFocus] = useState<boolean>(false)
    const inputFocus = useRef<HTMLInputElement | null>(null);

    const handleFocus = () => {
        setIsFocus((prevState: boolean) => !prevState);
    }

    useEffect(() => {
        if (inputFocus.current && isFocus) {
            inputFocus.current.focus();
        }},[inputFocus, isFocus])


return (
    <>


        <main className='w-full h-[55px] bg-violet-700 flex flex-row items-center gap-2 sticky top-0 z-50  '>
            {isFocus === false &&
                <figure>
                    <img src={logo} alt='image didnt reload' className='w-[2.5rem] ml-[5px] z-0' />
                </figure>
            }

            <button onClick={handleFocus} className='ml-2 text-white font-poppins font-bold'>{isFocus ? <h1 className='text-[2rem] -mt-2 self-center'>&larr;</h1> : <h1 className='text-md bg-violet-400 rounded-2xl pl-2 pr-2 z-20'>search</h1>}</button>

            {isFocus &&

                <input ref={inputFocus} onBlur={handleFocus}
                    placeholder='Search Sheereye' src='text' className='rounded-full pl-4 p-[3px] placeholder:text-violet-900 outline-none z-20' />
            }
        </main>
        {isFocus && <div className='w-[18rem] h-auto bg-white absolute rounded flex justify-center pb-2 pt-2 shadow shadow-lg'><p>no recent searches</p></div>}
    </>
)
}

export default DashBoardNav
