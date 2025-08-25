import logo from '../assets/ShareEyeLogoCircle.png'
import { useState } from 'react'

const DashBoardNav = () => {
    const [isFocus, setIsFocus] = useState<boolean>(false)

    const handleFocus = () => {
        setIsFocus((prevState: boolean) => !prevState);
    }

    return (
        <>
            <main className='w-full h-[55px] bg-violet-700 flex flex-row items-center gap-5 sticky top-0'>



                {isFocus === false &&
                    <figure>
                        <img src={logo} alt='image didnt reload' className='w-[2.5rem] ml-[5px]' />
                    </figure>}
                <button onClick={handleFocus}>search</button>
                {isFocus &&
                    <input
                        placeholder='Search Sheereye' src='text' className='rounded-full pl-4 p-[3px] placeholder:text-violet-900 outline-none' />}

            </main>

        </>
    )
}

export default DashBoardNav
