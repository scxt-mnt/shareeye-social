import type { RootState } from "../Store"
import { useSelector } from "react-redux"
import DashBoardNav from "./DashBoardNav";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FormAbout } from "../axios instances/publicInstance";
import { setUser } from "../Redux Slice/userSlice";
import { getDetails } from "../axios instances/uploads";
import { setDetails } from "../Redux Slice/detailsProfileSlice";
import { Link } from "react-router-dom";

const DashBoard = () => {
  const selector = useSelector((state: RootState) => state.user.value);
  const profileSelector = useSelector((state: RootState) => state.profile.value);
  const dispatch = useDispatch();
  useEffect(() => {
    const getToken = async () => {
      try {
        const resGet = await FormAbout.get('/');

        if (resGet.status === 400) {
          return console.log(resGet.data.msg)
        }

        if (resGet.status === 200) {
          dispatch(setUser({ id: resGet.data.id, isLog: resGet.data.isLog }));
        }
      } catch (e) {
        console.log(e);
      }
    }
    getToken();

  }, [dispatch])

  useEffect(() => {
    const getCookie = async () => {
      if (selector.id) {
        const res = await getDetails.post('/', { id: selector.id })
        if (res.status === 401) {
          return console.log(res.data.msg)
        }
        if (res.status === 200) {
          dispatch(setDetails({
            name: res.data.name,
            lastName: res.data.lastName,
            bio: res.data.bio,
            profileUrl: res.data.profile,
            coverUrl: res.data.cover
          }))
        }
      }
    }
    getCookie();
  }, [dispatch, selector.id])


  return (
    <>
      {selector.isLog ? <>
          <DashBoardNav />
                  <main className='w-screen h-screen flex flex-col items-center overflow-auto'>
          <section className='w-screen h-[10rem] shadow flex flex-row gap-4 shadow-lg pt-4 pb-4 items-center'>
            <Link to='/Profile-page'><img src={profileSelector.profileUrl} className='w-[2.5rem] h-[2.5rem] bg-white ml-5 rounded-full cursor-pointer'></img>
            </Link>
            <Link to="/Posting-Sheereye">
              <input placeholder='post something' type='text' className='pl-10 p-1  rounded-full outline-none placeholder:m-[10rem]' /></Link>
          </section>
          <section className='flex flex-col gap-5 mt-5'>
            <div className='w-[22rem] h-[25rem] bg-white  shadow shadow-xl rounded-xl'>
            </div>
            <div className='w-[22rem] h-[25rem] bg-white  shadow shadow-xl rounded-xl'>
            </div>
          </section>
        </main>
      </>
        : <h1>{`Authentication error`}</h1>
      }
    </>
  )
}

export default DashBoard
