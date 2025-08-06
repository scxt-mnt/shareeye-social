import type { RootState } from "../Store"
import { useSelector } from "react-redux"

const DashBoard = () => {
  const selector = useSelector((state: RootState) => state.user.value);
  return (
    <>
      {selector.isLog ? <>
      <h1>{`HELLO! ${selector.username}`}</h1>
      </> 
        : <h1>{`Authentication error`}</h1>}
    </>
  )
}

export default DashBoard
