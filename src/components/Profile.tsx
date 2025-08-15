import { useState } from "react";



const Profile = () => {

    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);

    const buttons = [
        { title: "Upload Profile", values: profileImage, setValue: setProfileImage },
        { title: "Upload Cover", values: coverImage, setValue: setCoverImage} 
    ]

    return (
        <>


            <main className='h-screen w-screen grid place-items-center font-poppins font-bold '>
                <h1 className='text-2xl text-black -mt-[100px] text-violet-800'>Upload Pictures</h1>
                {buttons.map((field, index) => {
                    return (
                        <form key={index} className='flex flex-col gap-10 -mt-[250px]'>
                            <input onChange={e => {
                                const img = e.target.files?.[0] || null;
                                field.setValue(img);
                            }} type='file' accept='image/*' className="hidden" />
                            <button className='h-[10rem] w-[20rem] border border-violet-900 rounded-lg '>{field.title}</button>
                        </form>
                    )
                })}
                <button className={` w-[1px] transition-all duration-1000 absolute right-0 bottom-10 font-bold text-white bg-violet-500 p-2`}>finish</button>
            </main>
            
        </>
    )
}

export default Profile
