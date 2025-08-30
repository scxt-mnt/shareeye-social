import { useEffect, useRef, useState } from "react"
import { FormAbout } from "../axios instances/GlobalAuth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getDetails } from "../axios instances/GlobalUpload";
import { setDetails } from "../Redux Slice/detailsProfileSlice";
import { setUser } from "../Redux Slice/userSlice";
import { storePhoto } from "../axios instances/GlobalUpload";
import type { RootState } from '../Store'
import { posting } from "../axios instances/GlobalPost";


const Posting = () => {
    const showFile = useRef<HTMLInputElement | null>(null);
    const [active, setActive] = useState<'text' | 'images'>('text')
    const dispatch = useDispatch();
    const selector = useSelector((state: RootState) => state.user.value)
    const infoSelector = useSelector((state: RootState) => state.profile.value)
    const [captionWithImage, setCaptionWithImage] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");
    const [captionWithText, setCaptionWithText] = useState<string>();




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

    const Base64 = (image: File | null): Promise<string> => {
        return new Promise((resolve, reject) => {
            try {
                const reader = new FileReader();
                if (image) {
                    reader.readAsDataURL(image);
                    reader.onloadend = () => {
                        if (reader.result) {
                            resolve(reader.result as string)
                        }
                    }
                }
            } catch (e) {
                reject(console.log(e))
            }
        })

    }

    const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const img = e.target.files?.[0] || null
        setImage(img)
        const base64Preview = await Base64(img);
        setPreview(base64Preview)
    }

    const handleWithImage = async (postImage: File | null) => {
        try {
            if (postImage) {
                const baseTo64 = await Base64(postImage)
                const res = await storePhoto.post('/', { image: baseTo64 })
                if (res.status === 401) {
                    return console.log("error occured")
                }
                else if (res.status === 200) {

                    if (!res.data.url) return console.log("no image");

                    const storePost = await posting.post('/', { caption: captionWithImage, imageUrl: res.data.url })

                    if (storePost.status === 401) {
                        return console.log(storePost.data.msg);
                    }

                    console.log(storePost.data.msg);
                }



            }
        } catch (e) {
            console.log(e);
        }
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
                {active === "images" &&
                    <>
                        <main className="w-auto ml-2 mr-2 h-auto bg-white shadow-2xl rounded-2xl flex flex-col items-center p-2 pb-5">
                            <figure className="self-start ml-3 mt-3 h-auto w-auto absolute flex flex-row gap-2 font-bold justify-center">
                                <img src={infoSelector.profileUrl} className='w-[1.6rem] h-[1.6rem] rounded-full' />
                                <figcaption><h1>{`${infoSelector.name} ${infoSelector.lastName}`}</h1></figcaption>
                            </figure>
                            <textarea value={captionWithImage} onChange={(e) => setCaptionWithImage(e.target.value)} placeholder='type your captions here' className='w-[20rem] h-[1rem] p-10 mt-5 outline-none ' />
                            <input ref={showFile} type="file" accept="image/*" className='hidden' onChange={handleFileInput} />
                            {preview ?
                                <div className="h-auto w-auto relative">
                                    <img src={preview && preview} className="  h-[18rem] mt-3 rounded-xl" />
                                    <button onClick={() => setPreview("")} className='absolute text-sm right-2 text-red-900 '>delete</button>
                                </div>
                                :
                                <button onClick={handleClick} className='w-[18rem] h-[16rem] mt-8 rounded-xl border-2 border-violet-400 text-gray-500'>insert an image</button>
                            }
                        </main>
                        <button onClick={() => handleWithImage(image)} className={` w-[1px] transition-all duration-1000 absolute right-0 bottom-10 font-bold text-white bg-violet-500  ${captionWithImage && preview ? 'pr-[3.5rem] pl-[1.5rem] ' : ''}`}>post</button>
                    </>
                }

                {active === 'text' &&
                    <>

                        <main className="w-[20rem] h-[20rem] bg-white shadow-2xl rounded-2xl flex flex-col justify-center relative">
                            <figure className="self-start ml-3 mt-3 h-auto w-auto absolute flex flex-row gap-2 font-bold justify-center top-0">
                                <img src={infoSelector.profileUrl} className='w-[1.6rem] h-[1.6rem] rounded-full' />
                                <figcaption><h1>{`${infoSelector.name} ${infoSelector.lastName}`}</h1></figcaption>
                            </figure>
                            <textarea value={captionWithText} onChange={(e) => setCaptionWithText(e.target.value)} placeholder={`what's on your mind?`} className='w-[20rem] h-auto p-5  outline-none text-center' />
                        </main>
                        <button onClick={() => handleWithImage(image)} className={` w-[1px] transition-all duration-1000 absolute right-0 bottom-10 font-bold text-white bg-violet-500  ${captionWithText ? 'pr-[3.5rem] pl-[1.5rem] ' : ''}`}>post</button>

                    </>

                }




            </main>
        </>
    )
}

export default Posting
