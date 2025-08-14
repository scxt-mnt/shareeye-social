import type { RootState } from "../Store"
import { useSelector } from "react-redux"
import DashBoardNav from "./DashBoardNav"; 

const DashBoard = () => {
  const selector = useSelector((state: RootState) => state.user.value);
  return (
    <>
      {selector.isLog ? <>
      <DashBoardNav />
      <h1>{`HELLO! ${selector.username}`}</h1> 
      </>
        : <h1>{`Authentication error`}</h1>
        }
    </>
  )
}

export default DashBoard
