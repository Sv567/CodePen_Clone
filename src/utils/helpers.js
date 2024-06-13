import { signInWithRedirect } from "firebase/auth"
import { auth } from '../firebase/firebase'
import { GoogleAuthProvider } from "firebase/auth"
import { GithubAuthProvider } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';


const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = async () => {
  try {
    await signInWithRedirect(auth, googleProvider).then(userCred => {
      window.location.reload();
    })

  } catch (Error) {
    console.log('error', Error)
  }  
}

export const signInWithGithub = async () => {
  try {
    await signInWithRedirect(auth, githubProvider).then(userCred => {
      window.location.reload();
    })

  } catch (Error) {
    console.log('error', Error)
  }
}

export const Menus = [
  {id: uuidv4() , name:"Projects" , uri:"/home/projects"},
  {id: uuidv4() , name:"Collections" , uri:"/home/collection"},
  {id: uuidv4() , name:"Profile" , uri:"/home/profile"}
]

export const signOutAction = async () => {
    await auth.signOut().then(() => {
      window.location.reload()
    })
}