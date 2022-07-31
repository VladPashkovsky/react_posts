import About from '../pages/About'
import Login from '../pages/Login'
import Posts from '../pages/Posts'
import PostIdPage from '../pages/PostIdPage'

export const publicRoutes = [
  {path: '/login', element: Login, exact:  true},
]

export const privateRoutes = [
  {path: '/about', element: About, exact: true},
  {path: '/posts', element: Posts, exact: true},
  {path: '/posts/:id', element: PostIdPage, exact: true}
]