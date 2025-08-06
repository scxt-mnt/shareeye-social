import { useSelector } from "react-redux"
import type { RootState } from "../Store";
import { useDispatch } from "react-redux";
import { setUser } from "../userSlice";
import { useEffect } from "react";
import { FormAbout } from "../publicInstance";
const Form = () => {
    const selector = useSelector((state: RootState) => state.user.value);
    const dispatch = useDispatch();


    useEffect(() => {
            console.log('hello')
        try {
            const getToken = async () => {
                const resGet = await FormAbout.get('/');
                if (resGet.status === 200) {
                    dispatch(setUser({ id: resGet.data.id }))
                }
            }
            getToken();
        } catch (e) {
            console.log('no session')
        }
    },[])


  return (
    <>

    
    <h1>{`hello ${selector.id}`}</h1>
    </>
  )
}

export default Form
