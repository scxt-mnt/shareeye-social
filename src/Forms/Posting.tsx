import { useEffect, useRef, useState } from "react"
import { FormAbout } from "../axios instances/publicInstance";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getDetails } from "../axios instances/uploads";
import { setDetails } from "../Redux Slice/detailsProfileSlice";
import { setUser } from "../Redux Slice/userSlice";
import type { RootState } from '../Store'

const Posting = () => {
    const showFile = useRef<HTMLInputElement | null>(null);
    const [active, setActive] = useState<'text' | 'images'>('text')
    const dispatch = useDispatch();
    const selector = useSelector((state: RootState) => state.user.value)
    const infoSelector = useSelector((state: RootState) => state.profile.value)

    useEffect(() => {
        const getToken = async () => {
            const res = await FormAbout.get('/');
            if (res.status === 401) {
                return console.log(res.data.msg);
            } else if (res.status === 200) {
                dispatch(setUser({ id: res.data.id, isLog: res.data.isLog }));
            }
        }
        getToken();
    }, [dispatch])

    useEffect(() => {
        const getProfile = async () => {
            if (selector.id) {
                const res = await getDetails.post('/', { id: selector.id });
                if (res.status === 401) {
                    return console.log('request failed');
                } else if (res.status === 200) {
                    dispatch(setDetails({
                        name: res.data.name,
                        lastName: res.data.lastName,
                        bio: res.data.bio,
                        profileUrl: res.data.profile,
                        coverUrl: res.data.cover
                    }))
                }
            }
        }
        getProfile();
    }, [dispatch, selector.id]);



    const buttons = [
        { name: "Text", value: 'text' },
        { name: "Images", value: 'images' }
    ] as const;

    const handleClick = () => {
        if (showFile) showFile.current?.click()
    }

    return (
        <>

            <main className='w-screen h-screen grid place-content-center gap-5 relative font-poppins '>
                <section className='flex gap-2 w-auto justify-self-end bg-violet-500 text-white font-poppins font-bold rounded p-2'>
                    {buttons.map((fields, index) => {
                        return (
                            <button key={index} onClick={() => setActive(fields.value)} className={`pt-[2px] pb-[2px] pr-[20px] pl-[20px] rounded-xl transition-bg duration-700 ${active === fields.value ? 'bg-violet-400' : 'bg-violet-500'}`}>{fields.name}</button>)
                    })}
                </section>
                {active === "images" ? <main className="w-[20rem] h-[27rem] bg-white shadow-2xl rounded-2xl flex flex-col items-center">
                    <figure className="self-start ml-3 mt-3 h-auto w-auto absolute flex flex-row gap-2 font-bold justify-center">
                        <img src={infoSelector.profileUrl} className='w-[1.6rem] h-[1.6rem] rounded-full' />
                        <figcaption><h1>{`${infoSelector.name} ${infoSelector.lastName}`}</h1></figcaption>
                    </figure>
                    <textarea placeholder='type your captions here' className='w-[20rem] h-auto p-10 mt-5 outline-none ' />
                    <div className='w-[17rem] bg-gray-300 h-[2px] -mt-10 ' />
                    <input ref={showFile} type="file" accept="image/*" className='hidden' />
                    <button onClick={handleClick} className='w-[18rem] h-[16rem] mt-8 rounded-xl border-2 border-violet-400 text-gray-500'>insert an image</button>
                </main>
                    : <main className="w-[20rem] h-[20rem] bg-white shadow-2xl rounded-2xl flex flex-col justify-center relative">
                        <figure className="self-start ml-3 mt-3 h-auto w-auto absolute flex flex-row gap-2 font-bold justify-center top-0">
                            <img src={infoSelector.profileUrl} className='w-[1.6rem] h-[1.6rem] rounded-full' />
                            <figcaption><h1>{`${infoSelector.name} ${infoSelector.lastName}`}</h1></figcaption>
                        </figure>
                        <textarea placeholder={`what's on your mind?`} className='w-[20rem] h-auto p-5  outline-none text-center' />
                    </main>
                }


            </main>
        </>
    )
}

export default Posting
