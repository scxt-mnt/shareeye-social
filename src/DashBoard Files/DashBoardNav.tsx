import logo from '../assets/ShareEyeLogoCircle.png'
import { useRef, useState, useEffect } from 'react'
import { fetchSearch } from "../axios instances/GlobalSearch";
import { useDispatch } from 'react-redux';
import { setSearch } from '../Redux Slice/SearchSlice'
import { useSelector } from 'react-redux';
import type { RootState } from '../Store';
import { setClear } from '../Redux Slice/SearchSlice';
import { Link } from 'react-router-dom';
const DashBoardNav = () => {
    const [isFocus, setIsFocus] = useState<boolean>(false)
    const inputFocus = useRef<HTMLInputElement | null>(null);
    const [searchValue, setSearchValue] = useState<string>("");
    const dispatch = useDispatch();
    const selector = useSelector((state: RootState) => state.search.value)

    const handleFocus = () => {
        setIsFocus((prevState: boolean) => !prevState);
    }

    useEffect(() => {
        if (inputFocus.current && isFocus) {
            inputFocus.current.focus();
        }
    }, [inputFocus, isFocus])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }
    useEffect(() => {
        if (!searchValue || !isFocus) {
            setSearchValue("");
            dispatch(setClear())
        }
        setTimeout(() => {
            const getSearch = async () => {

                if (searchValue) {
                    const res = await fetchSearch.post('/', { searchValue: searchValue })

                    if (res.status === 404) {
                        return console.log(res.data.msg)
                    }

                    if (res.status === 200) {
                        dispatch(setSearch(res.data))
                    }


                }
            }
            getSearch();
        }, 200)

    }, [searchValue, dispatch, isFocus])

    return (
        <>


            <main className='w-full h-[70px] bg-violet-700 flex flex-ro~w items-center gap-2 sticky top-0 z-50  pb-2 pt-2'>
                {isFocus === false &&
                    <figure>
                        <img src={logo} alt='image didnt reload' className='w-[2.5rem] ml-[5px] z-0' />
                    </figure>
                }

                <button onClick={handleFocus} className='ml-2 text-white font-poppins font-bold'>{isFocus ? <h1 className='text-[2rem] -mt-2 self-center'>&larr;</h1> : <h1 className='text-md bg-violet-400 rounded-2xl pl-2 pr-2 z-20'>search</h1>}</button>

                {isFocus &&

                    <input onChange={handleSearch} ref={inputFocus} 
                        placeholder='Search Sheereye' className='rounded-full pl-4 p-[3px] placeholder:text-violet-900 outline-none z-20' />
                }
            </main>
            {isFocus &&
                <>
                    {selector.length !== 0 ?
                        <section className='w-[18rem] h-auto bg-white absolute rounded-xl flex flex-col pb-2 pt-2 shadow-lg items-center gap-4 '>

                            {selector.map(((fields) => {
                                return (
                                    <Link to={`View-Profile/${fields.id}`}><section key={fields.id} className='w-auto h-auto pt-3 pb-3 pl-2 flex flex-row gap-2 text-lg font-poppins -ml-10 border-l-2 border-violet-900'>
                                        {fields.profileImage && <img src={fields.profileImage} className='w-[2rem] h-[2rem] rounded-full border-2 border-violet-900 ' />}
                                        <p>{fields.name}</p>
                                        <p>{fields.lastName}</p>
                                    </section></Link>)
                            }))}

                        </section> 
                        : 
                        <section className='w-[18rem] h-auto bg-white absolute rounded-xl flex flex-col pb-2 pt-2 shadow-lg items-center gap-4'>
                            <h1 className='text-md text-gray-500'>no searches</h1>
                        </section>

                    }

                </>
            }




        </>
    )
}

export default DashBoardNav
