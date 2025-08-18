


import {forwardRef} from 'react'

const loadingAnimation = forwardRef<HTMLDivElement, React.PropsWithChildren> ((_props, ref) => {
    return (
        <>
            <div ref={ref} className=' h-screen w-screen absolute grid place-content-center z-30 bg-white/10 backdrop-blur-md'>
                <div className='animate-pulse h-30 w-30 relative left-[10px]'>

                    <div className={`bg-violet-900 h-10 w-10 rounded-full z-10 -mb-7 animate-bounce `}>
                        <div className='absolute bg-white h-[10px] w-[10px] rounded-full right-0'> <div className='absolute right-[1px] top-[2px] bg-black h-[5px] w-[5px] rounded-full'></div></div>
                        <div className='h-[10px] w-[2px] bg-violet-900'></div>
                        <div className={`bg-violet-900 h-[20px] w-[30px] animate-spin absolute top-[25px]`}></div></div>
                </div>
                <div className='h-[10px] w-[50px] bg-violet-900 relative left-[3px] top-[40px]'></div>
            </div>

        </>
    )
})

export default loadingAnimation
