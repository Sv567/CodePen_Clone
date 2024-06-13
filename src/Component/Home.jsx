import React, { useState } from 'react'
import SignUp from './SignUp';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import { HiChevronDoubleLeft } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { Logo } from '../assets'
import { MdHome } from 'react-icons/md'
import { FaSearchengin } from 'react-icons/fa'
import Projects from './Projects';
import UserProfileDetails from './UserProfileDetails';
import { useDispatch, useSelector } from 'react-redux';
import { SET_SEARCH_TERM } from '../Context/actions/searchactions';


const Home = () => {
    const [isSideMenu, setSideMenu] = useState(false);
    const user = useSelector(state => state.user?.user)
    const searchTerm = useSelector((state) =>
        state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : " ");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <>
            <div className={`w-2 ${isSideMenu ? 'w-2' : 'flex-[.2] xl:flex-[.2]'
                } min-h-screen max-h-screen relative bg-secondary px-3 py-6 flex flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out`}>
                {/* anchor section */}
                <motion.div whileTap={{ scale: .9 }}
                    onClick={() => setSideMenu(!isSideMenu)}
                    className='w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg justify-center cursor-pointer items-center absolute -right-6 flex '>
                    <HiChevronDoubleLeft className='text-white text-xl' />
                </motion.div>

                <div className='overflow-hidden flex  flex-col w-full gap-4'>
                    {/* logo section */}

                    <Link to='/home' className='object-contain w-42 h-auto'>
                        <img src={Logo} alt='logo' />
                    </Link>

                    {/* start coding section */}

                    <>
                        <div className='px-6 py-3 flex w-full items-center justify-center rounded-xl border border-gray-400 cursor-pointer group-hover:border-gray-200'>
                            <button
                                onClick={(e) => {
                                    user?.email ? (
                                        navigate("/newProject")
                                    ) : (
                                        alert("Awww! it seems you are not logged in👼")
                                    )
                                }

                                }
                                className='text-gray-400 group-hover:text-gray-200 capitalize'>Start coding
                            </button>
                        </div>


                    </>

                    {/* home section */}
                    {user && (
                        <Link to={'/home/projects'} className='flex items-center justify-center gap-6'>
                            <MdHome className='text-primaryText text-xl' />
                            <p className='text-lg text-primaryText'>Home</p>
                        </Link>
                    )}

                </div>
            </div >
            <div className='flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 md:px-14 py-4 md:py-12'>
                {/* top section */}
                <div className='w-full flex items-center justify-between gap-4'>
                    {/* search section */}
                    <div className='flex items-center justify-center bg-secondary  w-full px-4 py-3 rounded-m gap-3'>
                        <FaSearchengin className='text-2xl text-primaryText ' />
                        <input type='text'
                            className='flex-1 px-4 py-1 text-xl bg-transparent outline-none border-none text-primaryText placeholder:text-gray-700' placeholder='Search'
                            value={searchTerm}
                            onChange={(e) => { dispatch(SET_SEARCH_TERM(e.target.value)) }}
                        />
                    </div>
                    {/* profile section */}
                    {!user && (
                        <motion.div
                            whileTap={{ scale: 0.9 }}
                            className='flex justify-center items-center gap-3'>
                            <Link
                                to={'/home/auth'} className='text-white bg-emerald-500 px-6 py-2 rounded-md text-lg  cursor-pointer font-bold hover:bg-emerald-700'>
                                <button>SignUp</button>
                            </Link>
                        </motion.div>
                    )}
                    {user && <UserProfileDetails />}
                </div>
                {/*  {bottom section} */}

                <div className='w-full'>
                    <Routes>
                        <Route path='/*' element={<Projects />} />
                        <Route path='/auth' element={<SignUp />} />
                    </Routes>

                </div>
            </div>
        </>
    )
}

export default Home

