import image from '../assets/purple.jpg'
import image2 from '../assets/username.png'
const ProfilePage = () => {
    return (
        <>
            <main className='h-screen w-screen font-poppins '>
                <img className='h-[12rem] w-screen rounded-b-[5rem]' src={image}></img>
                <figure className='w-screen flex flex-col gap-[5rem] '>
                    <img className=' self-center 
                    h-[7rem] w-[7rem] -m-[4rem] border-[3px] border-black rounded-full' src={image2}></img>
                    <figcaption className='self-center text-2xl font-bold'>Scott Boragay</figcaption>
                    <figcaption className='self-center -m-[4rem] text-sm'>Hello im scott boragay!</figcaption>
                </figure>
            </main>
        </>
    )
}

export default ProfilePage
