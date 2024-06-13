import React, { useEffect, useState } from 'react'
import { FaChevronDown, FaCss3, FaHtml5, FaJs } from 'react-icons/fa'
import { FcSettings } from 'react-icons/fc'
import SplitPane from 'react-split-pane'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { Logo } from '../assets';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { MdCheck, MdEdit } from 'react-icons/md';
import { useSelector } from 'react-redux';
import UserProfileDetails from './UserProfileDetails';
import Alert from './Alert';
import { db } from '../firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';

const NewProject = () => {
    const [html, setHtml] = useState("")
    const [css, setCss] = useState("")
    const [js, setJs] = useState("")
    const [output, setOutput] = useState("")
    const [isTitle, setIsTitle] = useState("");
    const [title, setTitle] = useState("Untitled");
    const[alert , setAlert] = useState(false)
    const [alertMsg , setAlertMsg] = useState('')


    const user = useSelector(state => state.user.user)

    const savProject = async () => {
      const id = `${Date.now()}`
      const _doc = {
        id: id,
        title: title,
        html:html,
        css: css,
        js:js,
        output :output,
        user:user,
      }
      await setDoc(doc(db , "Projects" , id), _doc).then((res) => {
          setAlert(true)
      }).catch((err) => console.log(err) )

      setInterval(() => {
        setAlert(false)
      }, 2000)
    }

    useEffect(() => {
        updateOutput()
    }, [html, css, js])

    const updateOutput = () => {
        const combinedOutput = `
        <html>
           <head> 
           <style>${css}</style>
           </head>

           <body> 
           ${html}
           <script>${js}</script>
           </body>
        </html>
        `;
        setOutput(combinedOutput)
    }

    return (
        <>
            <div className='w-full h-screen flex flex-col items-start justify-start overflow-hidden flex-wrap'>
                {/* alert section */}
                {alert && <Alert status={"Success"} alertMsg={"Project Saved..."}/> }

                {/* header section */}

                <header className='w-full flex items-center justify-between px-10 py-4'>
                    <div className='flex items-center justify-center gap-5'>
                        
                            <img className='w-32 h-auto object-contain' src={Logo} />

                        <div className='flex flex-col items-start justify-start'>
                            {/* title */}
                            <div className='flex justify-center  items-center'>
                                <AnimatePresence>
                                    {isTitle ? <>
                                        <motion.input
                                            key={"TitleInput"}
                                            onChange={(e) => setTitle(e.target.value)}
                                            type='text'
                                            placeholder='Your Title'
                                            value={title}
                                            className='text-base outline-none border-none font-semi text-white bg-transparent px-3 py-2 rounded-md '
                                        />
                                    </> : <>
                                        <motion.p key={"titleLabel"}
                                            className='px-3 py-2 text-lg text-primaryText'>
                                            {title}
                                        </motion.p>
                                    </>}
                                </AnimatePresence>

                                <AnimatePresence>
                                    {isTitle ? <>
                                        <motion.div key={"MdCheck"}
                                            whileTap={{ scale: 0.9 }}
                                            className='cursor-pointer'
                                            onClick={() => setIsTitle(false)}
                                        >
                                            <MdCheck className='text-2xl text-emerald-500' />
                                        </motion.div>
                                    </> : <>
                                        <motion.div key={MdEdit}
                                            whileTap={{ scale: 0.9 }}
                                            className='cursor-pointer'
                                            onClick={() => setIsTitle(true)}
                                        >
                                            <MdEdit className='text-2xl text-primaryText' />
                                        </motion.div>
                                    </>
                                    }
                                </AnimatePresence>

                            </div>

                            {/* follow up */}

                            <div className='flex items-center justify-center px-3 -mt-2 gap-2 '>
                                <p className='text-primaryText  text-sm'>

                                    {user?.displayName ? user?.displayName : `${user?.email.split("@")[0]}`}

                                </p>
                                <motion.p
                                    whileTap={0.9}
                                    className='text-[10px] bg-emerald-500 rounded-sm px-2 py-[1px] text-black font-semibold'>
                                    + Follow
                                </motion.p>

                            </div>
                        </div>
                    </div>

                    {/* user section */}
                    {
                        user && (
                            <div className='flex items-center justify-center gap-4 '>
                                <motion.button 
                                onClick={savProject}
                                whileTap={{scale:0.9}}
                                className='font-bold text-base text-white rounded-md cursor-pointer w-14 h-12 bg-gray-500'>
                                    Save
                                </motion.button>
                                <UserProfileDetails />
                            </div>
                        )
                    }
                </header>

                {/* coding section  */}

                <div className=' all-unset w-full overflow-hidden'>
                    {/* horizontal */}
                    <SplitPane
                        split='horizontal'
                        minSize={100}
                        maxSize={-100} defaultSize={"50%"}>

                        {/* top coding section */}
                        <SplitPane split='vertical' minSize={400}>
                            {/* html code */}
                            <div className='w-full h-full flex flex-col items-start justify-start'>
                                <div className='w-full flex items-center justify-between'>

                                    <div className='bg-secondary px-4 py-2 border-t-gray-500 flex items-center justify-center gap-3'>
                                        <FaHtml5 className='text-xl text-red-500' />
                                        <p className='text-primaryText font-semibold'>HTML</p>
                                    </div>

                                    {/* icons section */}

                                    <div className='cursor-pointer flex items-center justify-center gap-5 px-4'>
                                        <FcSettings className='text-xl' />
                                        <FaChevronDown className='text-xl text-primaryText ' />

                                    </div>
                                </div>
                                <div className='w-full px-2'>
                                    <CodeMirror
                                        value={html}
                                        height="300px"
                                        theme={'dark'}
                                        extensions={[javascript({ jsx: true })]}
                                        onChange={(value, viewUpdate) => { setHtml(value) }}
                                    />
                                </div>
                            </div>
                            <SplitPane split='vertical' minSize={500}>


                                {/* css code */}

                                <div className='w-full h-full flex flex-col items-start justify-start'>
                                    <div className='w-full flex items-center justify-between'>

                                        <div className='bg-secondary px-4 py-2 border-t-gray-500 flex items-center justify-center gap-3'>
                                            <FaCss3 className='text-xl text-blue-500' />
                                            <p className='text-primaryText font-semibold'>CSS</p>
                                        </div>

                                        {/* icons section */}

                                        <div className='cursor-pointer flex items-center justify-center gap-5 px-4'>
                                            <FcSettings className='text-xl' />
                                            <FaChevronDown className='text-xl text-primaryText ' />

                                        </div>
                                    </div>
                                    <div className='w-full px-2'>
                                        <CodeMirror
                                            value={css}
                                            height="300px"
                                            theme={'dark'}
                                            extensions={[javascript({ jsx: true })]}
                                            onChange={(value, viewUpdate) => { setCss(value) }}
                                        />
                                    </div>
                                </div>

                                {/* js code */}

                                <div className='w-full h-full flex flex-col items-start justify-start'>
                                    <div className='w-full flex items-center justify-between'>

                                        <div className='bg-secondary px-4 py-2 border-t-gray-500 flex items-center justify-center gap-3'>
                                            <FaJs className='text-xl text-yellow-500' />
                                            <p className='text-primaryText font-semibold'>JS</p>
                                        </div>

                                        {/* icons section */}

                                        <div className='cursor-pointer flex items-center justify-center gap-5 px-4'>
                                            <FcSettings className='text-xl' />
                                            <FaChevronDown className='text-xl text-primaryText ' />

                                        </div>
                                    </div>
                                    <div className='w-full px-2'>
                                        <CodeMirror
                                            value={js}
                                            height="300px"
                                            theme={'dark'}
                                            extensions={[javascript({ jsx: true })]}
                                            onChange={(value, viewUpdate) => { setJs(value) }}
                                        />
                                    </div>
                                </div>

                            </SplitPane>
                        </SplitPane>
                        {/* bottom result section */}
                        <div className='bg-white w-full h-full overflow-hidden'>
                            <iframe
                                srcDoc={output}
                                titlt="Result"
                                style={{ border: "none", width: "100%", height: "100%" }}
                            />

                        </div>

                    </SplitPane>
                </div>

            </div>
        </>
    )
}

export default NewProject