import { useRef, useState } from "react"

const Posting = () => {
    const showFile = useRef<HTMLInputElement | null>(null);

    const [active, setActive] = useState<'text' | 'images'>('text')


    const buttons = [
        { name: "Text", value: 'text' },
        { name: "Images", value: 'images' }
    ] as const;

    const handleClick = () => {
        if (showFile) showFile.current?.click()
    }

    return (
        <>

            <main className='w-screen h-screen grid place-content-center gap-5 relative '>
                <section className='flex gap-2 w-auto justify-self-end bg-violet-500 text-white font-poppins font-bold rounded p-2'>
                    {buttons.map((fields, index) => {
                        return (
                            <button key={index} onClick={() => setActive(fields.value)} className={`pt-[2px] pb-[2px] pr-[20px] pl-[20px] rounded-xl transition-bg duration-700 ${active === fields.value ? 'bg-violet-400' : 'bg-violet-500'}`}>{fields.name}</button>)
                    })}
                </section>
                {active === "images" ? <main className="w-[20rem] h-[27rem] bg-white shadow-2xl rounded-2xl flex flex-col items-center">
                    <textarea placeholder='type your captions here' className='w-[20rem] h-auto p-10 mt-5 outline-none ' />
                    <div className='w-[17rem] bg-gray-300 h-[2px] -mt-10 ' />
                    <input ref={showFile} type="file" accept="image/*" className='hidden' />
                    <button onClick={handleClick} className='w-[18rem] h-[16rem] mt-8 rounded-xl border-2 border-violet-400 text-gray-500'>insert a image</button>
                </main>
                    : <main className="w-[20rem] h-[20rem] bg-white shadow-2xl rounded-2xl flex flex-col justify-center">
                        <textarea placeholder={`what's on your mind?`}  className='w-[20rem] h-auto p-5  outline-none text-center' />
                    </main>
                }


            </main>
        </>
    )
}

export default Posting
