import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Menus, signOutAction } from '../utils/helpers';
import { Link } from 'react-router-dom';
import { slideUpOut } from '../animation';

const UserProfileDetails = () => {

  const user = useSelector((state) => state.user?.user);
  const [isMenu, setIsMenu] = useState(false);


  return (
    <div className='flex items-center justify-center gap-4 relative'>
      <div className='w-12 h-12 items-center justify-center flex text-white
          rounded-md overflow-hidden cursor-pointer bg-emerald-500'>
        {
          user?.photoURL ?
            <>
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={user?.photoURL}
                alt={user?.displayName}
                referrerPolicy='no-referre'
                className='w-full h-full object-cover'
              />
            </>
            : <p className='text-xl font-extrabold capitalize'>
              {user?.email[0]}
            </p>
        }
      </div>
      <motion.div
        {...slideUpOut}
        onClick={() => setIsMenu(!isMenu)}
        whileTap={{ scale: 0.9 }}
        className='px-4 py-4 rounded-md flex justify-center items-center bg-secondary cursor-pointer'
      >
        <FaChevronDown className='text-primaryText' />
      </motion.div>

      <AnimatePresence>
        {isMenu && (
          <motion.div className='bg-black z-10 absolute top-16 right-0 px-4 py-3 rounded-xl shadow-md items-start justify-start gap-4 min-w-[225px]'>
            {Menus && Menus.map(menu => (
              <Link to={menu.url}
                key={menu.id}
                className='text-primaryText text-md py-1 hover:bg-[rgba(255 , 255 , 255 , 0.05)] px-1 flex flex-col w-full rounded-md'
              >{menu.name}</Link>
            ))}
            <motion.p
              onClick={signOutAction}
              className='text-gray-300 text-md hover:bg-slate-700 px-1 py-2 shadow-xl cursor-pointer w-full rounded-md'>
              Sign Out
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserProfileDetails

