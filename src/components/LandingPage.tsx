import NavBar from './Nav'
import greetImage from '../assets/greet.png';

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <figure className='absolute left-[110px] top-[140px] h-auto'>
        <img className='h-[300px]  ' src={greetImage} />

        <figcaption className='font-poppins font-bold text-2xl text-violet-500'>
          <p className='-ml-3'>Share your ideas</p>
        </figcaption> 
      </figure>

    </>
  )
}

export default LandingPage
