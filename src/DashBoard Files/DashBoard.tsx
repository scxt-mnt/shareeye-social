import type { RootState } from "../Store"
import { useSelector } from "react-redux"
import DashBoardNav from "./DashBoardNav";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FormAbout } from "../axios instances/publicInstance";
import { setUser } from "../userSlice";
import { getDetails } from "../axios instances/uploads";
import { setDetails } from "../detailsProfileSlice";
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
        <section className='w-screen h-20 shadow mt-2 flex flex-row items-center gap-4 shadow-lg'>
          <Link to='/Profile-page'><img src={profileSelector.profileUrl} className='w-[3rem] h-[3rem] bg-white ml-5 rounded-full border border-violet-900 cursor-pointer'></img>
          </Link>
          <input placeholder='post something' type='text' className='pl-10 p-1  rounded-full outline-none placeholder:m-[10rem]' />
        </section>
      </>
        : <h1>{`Authentication error`}</h1>
      }
    </>
  )
}

export default DashBoard
