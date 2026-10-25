import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { auth } from './firebase'

export const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)

export const registra = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password)

export const logout = () => signOut(auth)

export const osservaUtente = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback)
