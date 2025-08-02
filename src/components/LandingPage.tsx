import NavBar from './Nav'
import greetImage from '../assets/greet.png';

const LandingPage = () => {
  return (
    <>
      <NavBar />
=      <figure className='absolute left-[120px] top-[60px]'>
          <img className='h-[350px]' src={greetImage} />
        </figure>
      <figcaption  >
         <p>Welcome!</p>
      </figcaption>  
    </>
  )
}

export default LandingPage
