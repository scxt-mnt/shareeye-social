import { useState } from "react"

const Posting = () => {
    const [textIsClicked, setTextIsClicked] = useState<Boolean>(false);
    const [imageIsClicked, setImageIsClicked] = useState<boolean>(false);

    const buttons = [
        { name: "Text" },
        { name: "Images" }
    ]
    return (
        <>

            <main className='w-screen h-screen grid place-content-center gap-5 relative '>
                <section className='flex gap-2 w-auto relative left-[8rem] bg-violet text-white font-poppins font-bold '>
                    {buttons.map((fields, index) => {
                        return(
                        <button key={index} className='pt-[2px] pb-[2px] pr-[20px] pl-[20px] bg-violet-500 rounded-xl'>{fields.name}</button>)
                    })}
                </section>
                <section className="w-[20rem] h-[25rem] bg-white shadow-2xl rounded-2xl ">

                </section>
            </main>
        </>
    )
}

export default Posting
