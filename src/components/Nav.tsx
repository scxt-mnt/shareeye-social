import { Link } from "react-router-dom"
import logo from '../assets/ShareEyeLogo.png';
import {  useState } from "react";


const Nav = () => {
  const [click, setClick] = useState<boolean>(false);
      const handleClick = () => {
    setClick(prevState => !prevState);
  }


  return (
    <>
      <section className={`absolute h-screen w-[200px] right-0 bg-violet-500 z-30 transition-transform duration-1000 ${click ? 'translate-x-0' : 'translate-x-full'} border-l border-left flex flex-col items-center`}>

       <ul className='absolute top-[8rem] font-poppins font-bold text-white text-xl flex flex-col gap-6'>
       <Link to='/SignIn'><li className='border-l-2 cursor-pointer p-1'>Sign in</li></Link> 
        <Link to='/SignUp'><li className='border-l-2  cursor-pointer p-1'>Sign up</li>
       </Link></ul>
      </section>


      <nav className="bg-transparent w-screen h-[70px] absolute bg-violet-400 shadow-md shadow-violet-900 flex items-center z-30">
        <img src={logo} className='h-[100px] -mt-2 ml-2' />
        <button onClick={handleClick} className='text-6xl absolute right-3 cursor-pointer bg-violet-100 pb-5 h-[50px] rounded-3xl'>
          <h1 className={`transform -translate-y-[11.5px] text-blue-500 transition-transform duration-1000 ${click ? 'rotate-180 translate-y-[2px]' : 'rotate-0 -translate-y-[11px]'}`}>←</h1></button>
      </nav>

    </>
  )
}

export default Nav
