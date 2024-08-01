import { BrowserRouter, Routes, Route} from "react-router-dom"
import HeaderFooter from './components/HeaderFooter'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import PersonalShowcase from './components/PersonalShowcase'
import Upload from './components/Upload'
import Project from './components/Project'
import UserProfile from './components/UserProfile'
import NotFound404 from './components/NotFound404'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeaderFooter/>}>
            <Route path="/" element={<Home/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/personal-sanctuary/:userId' element={<PersonalShowcase/>}/>
            <Route path='/upload' element={<Upload/>}/>
            <Route path='/project/:projectId' element={<Project/>}/>
            <Route path='/user-profile' element={<UserProfile/>}/>
            <Route path='*' element={<NotFound404/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
