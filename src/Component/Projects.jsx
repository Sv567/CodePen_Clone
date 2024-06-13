import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { MdBookmark, MdDelete } from 'react-icons/md';


const Projects = () => {

  const [filter, setFilter] = useState(null);

  const projects = useSelector((state) => state.projects?.projects)


  const searchTerm = useSelector((state) =>
    state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : " ");



  useEffect(() => {
    if (searchTerm.length > 0) {

      // filterd based on characters-
      setFilter(
        projects.filter(project => {
          const lowerCase = project?.title.toLowerCase()
          return searchTerm.split("").every((letter) => lowerCase.includes(letter))
        })
      )

    } else {
      setFilter(null);
    }
  }, [searchTerm]);

  return (
    <div className='w-full py-6 items-center flex justify-center flex-wrap'>
      {filter ? <>
        {filter && filter.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </> : <>
        {projects && projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}</>}
    </div>
  )
}



const ProjectCard = ({ index, project, setProject }) => {

  // const handleDeleteProject = (projectId) => {
  //   const updatProjects = project?.filter(project => project.id !== projectId)
  //   setProject([...project, updatProjects]);
  // }

  return (
    // Project section
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    key={index} className='w-full cursor-pointer md:w-[300px] h-[300px] bg-secondary rounded-md p-2 m-3  flex flex-col gap-4 justify-center'>

    {/* Project Cards */}
    <div className='w-full h-full rounded-md overflow-hidden object-cover'>
      <iframe
        title='Result'
        srcDoc={project.output}
        style={{ border: "none", width: "100%", height: "100%" }}
      />
    </div>

    {/* Project details- name ...etc */}

    <div className='flex items-center justify-start gap-2'>
      {/* image */}
      <div className='w-16 h-12 items-center justify-center flex bg-emerald-500 rounded-md'>
        {project?.user?.photoURL ? (
          <img src={project?.user?.photoURL} alt="User Profile" referrerPolicy='no-referrer'
            className='w-full h-full object-cover' />
        ) : (
          <p
            className='text-xl text-white font-semibold capitalize'
          >{project?.user?.email[0]}</p>
        )}

      </div>
      {/* name */}

      <div className='w-full h-full'>
        {project?.user?.email ?
          <>
            <p className='text-white text-lg capitalize'
            >{project?.title}</p>
          </> : <>
            <p>
              {project?.user?.displayName ?
                project?.user?.displayName :
                (typeof project?.user === 'string' ? project?.user.split("@")[0] : '')
              }
            </p>
          </>}

        <div className=' text-md text-primaryText flex justify-start'>
          {/* {project?.user?.email} */}
          {project?.user?.email.split("@")[0]}
        </div>
      </div>

      {/* Collections */}

      <div className='cursor-pointer ml-auto'>
        <MdBookmark className='text-primaryText text-3xl gap-2'/>
      </div>
    </div>
  </motion.div>
  )
}

export default Projects;
