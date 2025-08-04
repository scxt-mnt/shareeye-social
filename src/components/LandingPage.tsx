import NavBar from './Nav'
import greetImage from '../assets/greet.png';
import background from '../assets/purple.jpg'

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <div className='w-screen absolute h-screen z-0 bg-violet-500' />
        <figure className='absolute left-[110px] bottom-[100px] h-auto z-20'>
        <img className='h-[300px]' src={greetImage} />
    
        <figcaption className='font-poppins font-bold text-2xl text-white  translate-y-20'>
          <p className='mt-2 text-xl p-2 transform -translate-x-[90px] w-[300px] border-l-4  ' >Make friends. Stay connected. All in one <span className='text-violet-900'>Shareeye!</span></p>
          <button className='text-xl bg-violet-600 pl-2 pr-2 rounded border'>About</button>
        </figcaption> 
    
      </figure>
      
        <img src={background} className='h-[360px] w-[200px] bg-white rounded-6xl absolute left-[100px] rounded-full bottom-[200px] z-10 border '></img>
        <div className='h-[500px] w-[500px] bg-violet-600 rounded-6xl absolute right-0 rounded-full top-0 z-0'></div>
        <div className='h-[150px] w-[150px] bg-violet-600 rounded-full absolute right-0 rounded-full bottom-0 z-0'></div>
    </>
  )
}

export default LandingPage
