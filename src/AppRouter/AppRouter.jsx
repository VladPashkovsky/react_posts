import React, { useContext } from 'react'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import About from '../pages/About'
import Posts from '../pages/Posts'
import PostIdPage from '../pages/PostIdPage'
import Login from '../pages/Login'
import RequireAuth from '../hoc/RequireAuth'
import { AuthProvider } from '../hoc/AuthProvider'
import { publicRoutes, privateRoutes } from '../router/routes'
import {AuthContext} from '../context'
import MyLoader from '../UI/loader/MyLoader'
import PostsTwo from '../pages/PostsTwo'


const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext)

  if (isLoading) {
    return <MyLoader/>
  }

  return (
      <Routes>
        <Route path='/' element={<About />} />
        <Route path='*' element={<Navigate to='/' replace />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/posts/:id' element={<PostIdPage />} />
        <Route path='/posts_2' element={<PostsTwo />}/>
      </Routes>

  )
}

export default AppRouter