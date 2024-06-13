import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Home from "./Component/Home";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase/firebase";
import { collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import Spiner from './Snipers/Sniper'
import { useDispatch } from "react-redux";
import { SET_USER } from "./Context/actions/actions";
import NewProject from "./Component/NewProject";
import { SET_PROJECTS } from "./Context/actions/projectactions";


function App() {

  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch() ;
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        console.log(userCred?.providerData[0])
        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0]).then(() => {
          //dispatch the action to store

          dispatch(SET_USER(userCred?.providerData[0]))
          navigate("/home/projects", {replace: true});
        })
      } else {
        navigate("/home/auth", { replace: true });
      }
      setInterval(() =>{
        setIsLoading(false)
      },2000)
    })

    //clean up the listenerEvent -
    return () => unsubscribe();
  }, [])

  useEffect (() => {
    const projectQuery = query(
    collection(db , "Projects"),
    orderBy("id" , "desc")
    )

    const unsubscribe = onSnapshot(projectQuery,(querySnaps => {
      const projectsList = querySnaps.docs.map((doc) => doc.data())
      dispatch(SET_PROJECTS(projectsList))
    } ))

    return unsubscribe ;
  },[])

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
            <Spiner />
        </div>
      ) : (
        <div className="w-full flex items-start h-screen justify-start overflow-hidden">
          <Routes>
            <Route path="/home/*" element={<Home />} />
            <Route path="/newProject" element={<NewProject />}/>
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;

