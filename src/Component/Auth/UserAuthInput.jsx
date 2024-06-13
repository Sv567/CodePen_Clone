import React, { useState } from 'react'
import { FaEnvelope, FaEyeSlash } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa';
import { motion } from 'framer-motion';

const UserAuthInput = ({ label, placeholder, isPass, setStateFun, Icon, setGetEmailValidation }) => {
    const [value, setValue] = useState("");
    const [showPass, setShowPass] = useState(true);
    const [isValid, setIsValid] = useState(false)

    const handleTextChange = (e) => {
        setValue(e.target.value);
        setStateFun(e.target.value);

        if (placeholder === 'Email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const status = emailPattern.test(value);
            setIsValid(status);
            setGetEmailValidation(status)
        }
    }

    return (
        <div className='flex flex-col items-start justify-start w-full gap-2'>
            <label className='text-sm text-gray-300'>{label}</label>
            <div
             className={`flex items-center justify-center gap-3 w-full md:w-96 rounded-md py-1 px-3 bg-gray-200 ${!isValid &&
                placeholder === 'Email' &&
                value.length > 0 &&
                'border-2 border-red-500'
                }`}
            >

                <Icon className='text-text555 text-2xl' />
                <input
                    type={isPass && showPass ? 'password' : 'text'} placeholder={placeholder} className='flex-1 w-full outline-none border-none bg-transparent text-text555 text-lg'
                    value={value}
                    onChange={handleTextChange}
                />
                {
                    isPass && (
                        <motion.div
                            onClick={() => setShowPass(!showPass)}
                            whileTap={{ scale: 0.9 }}
                            className='cursor-pointer  '
                        >
                            {!showPass ? (
                                <FaEye className='text-text555 text-2xl' />

                            ) : (
                                
                                <FaEyeSlash className='text-text555 text-2xl' />
                            )
                            }

                        </motion.div>
                    )
                }
            </div>
        </div>
    )
}

export default UserAuthInput;

