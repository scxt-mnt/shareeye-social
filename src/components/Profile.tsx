import { useState, useRef, useEffect } from "react";
import { storePhoto } from "../uploads";
import LoadingAnimation from "./LoadingAnimation";



const Profile = () => {

    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const profileButton = useRef<HTMLInputElement | null>(null);
    const coverButton = useRef<HTMLInputElement | null>(null);
    const loading = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (loading.current)
            loading.current.style.visibility = 'hidden'
    }, [loading])



    const buttons = [
        { title: "Upload Profile", values: profileImage, setValue: setProfileImage, ref: profileButton, msg: "Profile Submitted" },
        { title: "Upload Cover", values: coverImage, setValue: setCoverImage, ref: coverButton, msg: "Cover Submitted", }
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    const DataToBase64 = (file: File | null): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            if (file) {
                reader.readAsDataURL(file)
                reader.onloadend = () => {
                    if (reader.result) {
                        resolve((reader.result as string).split(',')[1])
                    }
                }
            } else {
                reject(new Error('file failed to read'));
            }
        }
        )

    }

    const handleUploads = async (profile: File | null, cover: File | null) => {
        if (loading.current) loading.current.style.visibility = 'visible'
        try {
            if (profile) {
                const profilePic = await DataToBase64(profile);
                const res = await storePhoto.post('/', { image: profilePic })

                if (res.status === 401) {
                    console.log('didnt upload')
                }

                if (res.status === 200) {
                    console.log('image uploaded')
                }
            }

            if (cover) {
                const coverBase64 = await DataToBase64(cover);
                const res = await storePhoto.post('/', { image: coverBase64 })
                if (res.status === 401) {
                    console.log('didnt upload')
                }

                if (res.status === 200) {
                    console.log('image uploaded')
                }
            }
            if (loading.current) loading.current.style.visibility = 'hidden'

        } catch (err) {
            console.log(err);
        }
    }



    return (
        <>


            <main className='h-screen w-screen grid place-items-center font-poppins font-bold '>
                <h1 className='text-2xl text-black -mt-[100px] text-violet-800'>Upload Pictures</h1>
                <LoadingAnimation ref={loading} />
                {buttons.map((field, index) => {
                    return (
                        <form onSubmit={handleSubmit} key={index} className='flex flex-col gap-10 -mt-[12rem] relative'>
                            <input ref={field.ref} onChange={e => {
                                const img = e.target.files?.[0] || null;
                                field.setValue(img);
                            }} type='file' accept='image/*' className="hidden" />
                            <button disabled={field.values ? true : false} onClick={() => { field.ref.current?.click() }} className='h-[10rem] w-[20rem] border border-2 border-violet-900 rounded-lg'>{field.values ? field.msg : field.title}</button>
                            {field.values && <button onClick={() => {
                                field.setValue(null);
                            }} className='text-red-900 text-sm absolute right-[10px] mt-1  pl-1 pr-1 rounded'>Remove</button>}
                        </form>
                    )
                })}
                <button onClick={() => {
                    handleUploads(profileImage, coverImage);
                }} className={` w-[1px] transition-all duration-1000 absolute right-0 bottom-10 font-bold text-white bg-violet-500 ${profileImage && coverImage ? 'pr-[5rem] pl-[2rem]' : ''} `}>finish</button>
            </main >

        </>
    )
}

export default Profile
