import React from "react"
import Layout from "./Components/Layout/Layout"
import Home from "./Components/Home/Home"
import Login from "./Components/Login/Login"
import Register from "./Components/Register/Register"
import Notfound from "./Components/Notfound/Notfound"
import Movies from "./Components/Movies/Movies"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import Profile from "./Components/Profile/Profile"
import People from "./Components/People/People"
import TvShows from "./Components/TvShows/TvShows"
import MovieDetails from "./Components/MovieDetails/MovieDetails"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import UserContextProvider from "./Context/UserContext"

const routers = createBrowserRouter([
  {path:'', element:<Layout/>, children:[
    {index:true, element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'/profile', element:<ProtectedRoute><Profile/></ProtectedRoute>},
    {path:'/movies', element:<ProtectedRoute><Movies/></ProtectedRoute>},
    {path:'/people', element:<ProtectedRoute><People/></ProtectedRoute>},
    {path:'/tvShows', element:<ProtectedRoute><TvShows/></ProtectedRoute>},
    {path:'/movieDetails/:id/:type', element:<ProtectedRoute><MovieDetails/></ProtectedRoute>},
    {path:'/login', element:<Login/>},
    {path:'/register', element:<Register/>},
    {path:'*', element:<Notfound/>},
  ]}
])
export default function App(){

  return <UserContextProvider>
        <RouterProvider router={routers}></RouterProvider>
  </UserContextProvider>
}