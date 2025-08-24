import type { RootState } from "../Store"
import { useSelector } from "react-redux"
import DashBoardNav from "./DashBoardNav";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FormAbout } from "../publicInstance";
import { setUser } from "../userSlice";
import { getDetails } from "../uploads";
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
      const res = await getDetails.post('/', { id: selector.id })
      console.log(res.data)
    }
    getCookie();
  }, [])


  return (
    <>
      {selector.isLog ? <>
        <DashBoardNav />
        <section className='w-screen h-20 shadow mt-2 flex flex-row items-center gap-4 shadow-lg'>
          <img src='' className='w-[3rem] h-[3rem] bg-white ml-5 rounded-full border border-violet-900'></img>
          <input placeholder='post something' type='text' className='pl-10 p-1  rounded-full outline-none placeholder:m-[10rem]' />
        </section>
        <h1>{profileSelector.name}</h1>
      </>
        : <h1>{`Authentication error`}</h1>
      }
    </>
  )
}

export default DashBoard
