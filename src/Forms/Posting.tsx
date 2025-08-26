import { useState } from "react"

const Posting = () => {

    const [activate, setActive] = useState<'text' | 'images'>('text')


    const buttons = [
        { name: "Text", value: 'text' },
        { name: "Images", value: 'images' }
    ] as const;

    return (
        <>

            <main className='w-screen h-screen grid place-content-center gap-5 relative '>
                <section className='flex gap-2 w-auto justify-self-end bg-violet-500 text-white font-poppins font-bold rounded p-2'>
                    {buttons.map((fields, index) => {
                        return (
                            <button key={index} onClick={() => setActive(fields.value)} className={`pt-[2px] pb-[2px] pr-[20px] pl-[20px] rounded-xl ${activate === fields.value ? 'bg-violet-400' : 'bg-violet-500'}`}>{fields.name}</button>)
                    })}
                </section>
                <section className="w-[20rem] h-[25rem] bg-white shadow-2xl rounded-2xl ">

                </section>
                
            </main>
        </>
    )
}

export default Posting
