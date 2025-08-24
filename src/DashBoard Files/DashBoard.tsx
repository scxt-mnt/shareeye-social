import type { RootState } from "../Store"
import { useSelector } from "react-redux"
import DashBoardNav from "./DashBoardNav"; 
import { useEffect } from "react";
const DashBoard = () => {
  const selector = useSelector((state: RootState) => state.user.value);
  const profileSelector = useSelector((state: RootState) => state.profile.value);

  useEffect(() => {
    
  },[])
  return (
    <>
      {selector.isLog ? <>
      <DashBoardNav />
      <section className='w-screen h-20 shadow mt-2 flex flex-row items-center gap-4 shadow-lg'>
        <img src='' className='w-[3rem] h-[3rem] bg-white ml-5 rounded-full border border-violet-900'></img>
        <input placeholder='post something' type='text' className='pl-10 p-1  rounded-full outline-none placeholder:m-[10rem]'/>
      </section>
      <h1>{profileSelector.name}</h1> 
      </>
        : <h1>{`Authentication error`}</h1>
        }
    </>
  )
}

export default DashBoard
