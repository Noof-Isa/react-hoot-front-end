// src/App.jsx

// import { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import NavBar from './components/NavBar/NavBar';

// const App = () => {
//   // const [user, setUser] = useState(null)

//   return (
//     <>
//       <NavBar  /> 
//       <Routes>
//         <Route path='/' element={<h1>Hello World</h1>} />
        
//         <Route path='/' element={<h1>404</h1>} />

//       <Routes/>
//       <h1>Hello world!</h1>
//     </>
//   )
// }

// export default App

// before hoot 

// import './App.css'
// import NavBar from './components/NavBar/NavBar'
// import SignUp from './components/SignUp/SignUp'
// import SignIn from './components/SignIn/SignIn'
// import { Route, Routes } from 'react-router-dom'
// import * as authService from './services/authService.js'
// import { useState } from 'react'


// const App = () => {

//   const initialState = authService.getUser()

//   const [user, setUser] = useState(initialState)

//   const handleSignUp = async (formData) => {
//    const res = await authService.signUp(formData)
//    setUser(res)
//   }

//     const handleSignOut = () => {
//     localStorage.removeItem('token')
//     setUser(null)
//   }
//   const handleSignIn = async (formData) => {
//     const res = await authService.signIn(formData)
//     setUser(res)
//   }
//   return (
//     <>
//       <NavBar user={user} handleSignOut={handleSignOut} />
//       <Routes>
//           <Route path='/' element={<h1>Hello world!</h1>} />
//           <Route path='/sign-up' element={<SignUp handleSignUp={handleSignUp} />} />
//           <Route path='/sign-in' element={<SignIn handleSignIn={handleSignIn} />} />


//           <Route path='*' element={<h1>404</h1>} />
//       </Routes>
//     </>
//   )
// }

// export default App
import './App.css'
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import HootList from './components/HootList.jsx'
import { Route, Routes } from 'react-router-dom'
import * as authService from './services/authService.js'
import * as hootService from './services/hootService'
import { useState, useEffect } from 'react'

const App = () => {

  const initialState = authService.getUser()

  const [user, setUser] = useState(initialState)
  const [hoots, setHoots] = useState([])

  useEffect(() => {
    // going to run a service to fetch all hoots
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index()
      setHoots(hootsData)
    }
    fetchAllHoots()
  }, [])


  const handleSignUp = async (formData) => {
    try {
      const res = await authService.signUp(formData)
      setUser(res)
      // return success
      return { success: true }
    } catch(err){
      // return failure flag (then signup form can display message)
      // add message?
      return { success: false, message: err.message }
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const handleSignIn = async (formData) => {
    const res = await authService.signIn(formData)
    setUser(res)
  }

  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
          <Route path='/' element={<h1>Hello world!</h1>} />
          <Route path='/hoots' element={<HootList hoots={hoots} />} />
          <Route path='/sign-up' element={<SignUp handleSignUp={handleSignUp} user={user} />} />
          <Route path='/sign-in' element={<SignIn handleSignIn={handleSignIn} user={user} />} />
          <Route path='*' element={<h1>404</h1>} />
    </Routes>
    </>

  )
}

export default App

