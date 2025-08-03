import { Link } from "react-router-dom"
import logo from '../assets/ShareEyeLogo.png';
import { useState } from "react";


const Nav = () => {
  const [click, setClick] = useState<boolean>(false);

  const handleClick = () => {
    setClick(prevState => !click)
  }

  return (
    <>
      <section className='absolute h-screen w-[200px] right-0 bg-gray-600 z-10'>

      </section>


      <nav className="bg-transparent w-screen h-[70px] absolute bg-violet-400 shadow-sm shadow-black flex items-center ">
        <img src={logo} className='h-[100px] -mt-2 ml-2' />
        <button onClick={handleClick} className='text-6xl absolute right-3 cursor-pointer bg-violet-100 pb-5 h-[50px] rounded-3xl'>
          <h1 className='transform -translate-y-[11.5px] text-blue-500'>←</h1></button>
      </nav>

    </>
  )
}

export default Nav
