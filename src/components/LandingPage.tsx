import NavBar from './Nav'
import greetImage from '../assets/greet.png';

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <figure className='absolute left-[135px] top-[140px] h-auto'>
        <img className='h-[300px]' src={greetImage} />

        <figcaption className='font-poppins font-bold'>
          <p>Explore new things!</p>
        </figcaption>
      </figure>

    </>
  )
}

export default LandingPage
