import { useEffect } from 'react'
import { FormAbout } from '../publicInstance'
import { AxiosError } from 'axios'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import type { RootState } from '../Store';
import { setUser } from '../userSlice'
import { getDetails } from '../uploads'
import { setDetails } from '../detailsProfileSlice'
const ProfilePage = () => {
    const selector = useSelector((e: RootState) => e.user.value)
    const detailsSelector = useSelector((e: RootState) => e.profile.value);
    const dispatch = useDispatch();
    useEffect(() => {
        const getCookie = async () => {
            try {

                const res = await FormAbout.get('/');
                dispatch(setUser({ id: res.data.id, isLog: res.data.isLog }))
            } catch (err) {
                const error = err as AxiosError
                console.log(error)
            }
        }
        getCookie();
    }, [dispatch])


    useEffect(() => {
        if (selector.id) {
            const getFullDetails = async () => {
                try {
                    const res = await getDetails.post('/', { id: selector.id });
                    if (res.status === 401) {
                        return console.log('request failed');
                    } else if (res.status === 200) {
                        dispatch(setDetails({
                            name: res.data.name,
                            lastName: res.data.lastName,
                            bio: res.data.bio,
                            profileUrl: res.data.profile,
                            coverUrl: res.data.cover
                        }))
                        console.log();

                    }
                } catch (err) {
                    const error = err as AxiosError
                    console.log(error)
                }
            }
            getFullDetails();
        }
    }, [selector.id, dispatch])

    return (
        <>
            {selector.isLog ? <>

                <main className='h-screen w-screen font-poppins '>
                    {detailsSelector.coverUrl ? <img className='h-[12rem] w-screen rounded-b-[5rem]' src={detailsSelector.coverUrl}></img> : <div className='h-[12rem] w-screen rounded-b-[5rem] bg-white shadow-md'></div>}
                    <figure className='w-screen flex flex-col gap-[5rem] '>
                        {detailsSelector.profileUrl ? <img className=' self-center 
                    h-[7rem] w-[7rem] -m-[4rem] border-[3px] border-violet-500 rounded-full' src={` ${detailsSelector.profileUrl}`}></img> : <div className=' self-center 
                    h-[7rem] w-[7rem] -m-[4rem] border-[3px] border-violet-500 rounded-full bg-white'></div>}
                        <figcaption className='self-center text-2xl font-bold'>{`${detailsSelector.name} ${detailsSelector.lastName}`}</figcaption>
                        <figcaption className='self-center -m-[4rem] text-sm ml-[4rem] mr-[3rem] h-auto'>{detailsSelector.bio}</figcaption>
                    </figure>
                </main>
            </> : "authentication error"}

        </>
    )
}

export default ProfilePage
