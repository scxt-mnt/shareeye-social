import type { RootState } from  "../Store"
import { useSelector } from "react-redux"

const DashBoard = () => {
  const selector = useSelector((state: RootState) => state.user.value);
  return (
    <>
       <h1>{selector.username}</h1>       
    </>
  )
}

export default DashBoard
