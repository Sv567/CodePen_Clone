import React, { useState } from 'react'
import { Logo } from '../assets'
import UserAuthInput from './Auth/UserAuthInput'
import { FaEnvelope, FaGithub } from 'react-icons/fa';
import { MdPassword } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { signInWithGithub, signInWithGoogle } from '../utils/helpers';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { fadeInOut } from '../animation';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [getEmailValidation, setGetEmailValidation] = useState(false)

    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('')


    const createNewUser = async () => {
        if (getEmailValidation) {
            await createUserWithEmailAndPassword(auth, email, password).then(userCred => {
                if (userCred) {
                    console.log(userCred);
                }
            }).catch(e => {
                console.log(e)
                if (e.message.includes("auth/email-already-in-use")) {
                    setAlert(true);
                    setAlertMsg("Email is Already Exist! Please LogIn.");
                }
            }
            )
        } else {
            setAlert(true)
            setAlertMsg("Heyyy, Fill All the Input Fields!");
        }
        setInterval(() => {
            setAlert(false)
        }, 4000)


    }

    const loginWithEmailPassword = async () => {
        if (getEmailValidation) {
            await signInWithEmailAndPassword(auth, email, password).then(userCred => {
                if (userCred) {
                    console.log(userCred);
                }
            }).catch((err) => {
                console.log(err.message)
                if (err.message.includes("auth/invalid-credential")) {
                    setAlert(true);
                    setAlertMsg("User Not Found")
                } else if (err.message.includes("wrong-password")) {
                    setAlert(true);
                    setAlertMsg("Mismatched Password!")
                }
                else {
                    setAlert(true);
                    setAlertMsg("Something went wrong!")
                }

                setInterval(() => {
                    setAlert(false)
                }, 4000)
            })
        }

    }

    return (
        <div className='w-full py-6'>
            <img src={Logo} alt='logo' className='w-32' />

            <div className='w-full flex flex-col items-center justify-center py-8 '>
                <p className='py-12 text-2xl text-primaryText'>Join With Us!😇</p>
                <div className='px-8 w-full md:w-auto py-4 rounded-xl bg-secondary items-center justify-center gap-7 shadow-md flex flex-col'>

                    {/* email feed */}
                    <UserAuthInput
                        label='Email'
                        placeholder='Email' isPass={false}
                        setGetEmailValidation={setGetEmailValidation}
                        key='Email' setStateFun={setEmail}
                        Icon={FaEnvelope}

                    />

                    {/* password feed */}

                    <UserAuthInput label='password' placeholder='password' isPass={true} key='password' setStateFun={setPassword} Icon={MdPassword} />

                    {/* alert section */}

                    <AnimatePresence>
                        {alert && (
                            <motion.p
                                key={'AlertMsg'}
                                {...fadeInOut}
                                className='text-red-500'
                            >
                                {alertMsg}
                            </motion.p>
                        )}
                    </AnimatePresence>
                    {/* login button */}

                    {!isLogin ? (

                        <motion.div
                            onClick={createNewUser}
                            whileTap={{ scale: 0.9 }}
                            className=' flex items-center justify-center w-full text-white bg-emerald-500 px-6 py-2 rounded-md text-lg  cursor-pointer font-bold hover:bg-emerald-700'>
                            <p className='text-xl'>Sign Up</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            onClick={loginWithEmailPassword}
                            whileTap={{ scale: 0.9 }}
                            className=' flex items-center justify-center w-full text-white bg-emerald-500 px-6 py-2 rounded-md text-lg  cursor-pointer font-bold hover:bg-emerald-700'>
                            <p className='text-xl'>Login</p>
                        </motion.div>
                    )}
                    {/* account text  section */}

                    {!isLogin ? (
                        <p className='text-sm text-primaryText items-center flex justify-center gap-3'>Already have an account !<span
                            onClick={() => setIsLogin(!isLogin)}
                            className=' cursor-pointer text-emerald-500'>Login Here</span> </p>
                    ) : (
                        <p
                            className='text-sm text-primaryText items-center flex justify-center gap-3'>Doesn't have an account !{' '}<span
                                onClick={() => setIsLogin(!isLogin)}
                                className=' cursor-pointer text-emerald-500'>Create Here</span> </p>
                    )}

                    {/* or section */}

                    <div className='flex items-center justify-center gap-10'>
                        <div className='h-[1px] bg-gray-600
                    rounded-md w-24'></div>
                        <p className='text-sm text-gray-600 '>OR</p>
                        <div className='h-[1px] bg-gray-600 rounded-md w-24'></div>
                    </div>

                    {/* sign in with google */}

                    <motion.div
                        onClick={signInWithGoogle}
                        whileTap={{ scale: .9 }}
                        className='flex w-full py-2 cursor-pointer justify-center items-center bg-gray-600 rounded-md'>
                        <FcGoogle className='text-2xl' />
                        <p className='text-white px-1'>Sign in with Google</p>
                    </motion.div>

                    {/* or section */}

                    <div className='flex items-center justify-center gap-10'>
                        <div className='h-[1px] bg-gray-600
                    rounded-md w-24'></div>
                        <p className='text-sm text-gray-600 '>OR</p>
                        <div className='h-[1px] bg-gray-600 rounded-md w-24'></div>
                    </div>

                    {/* sign in with github */}

                    <motion.div
                        onClick={signInWithGithub}
                        whileTap={{ scale: .9 }}
                        className='flex w-full py-2 cursor-pointer justify-center items-center bg-gray-600 rounded-md'>
                        <FaGithub className='text-2xl' />
                        <p className='text-white px-1'>Sign in with Github</p>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
