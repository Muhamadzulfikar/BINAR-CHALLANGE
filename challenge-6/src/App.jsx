import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import SearchCar from './pages/searchCar'

function App() {

  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Home />} />
        <Route path='search-car' element={<SearchCar />}/>
        <Route path='login' element={<Login />}/>
        <Route path='register' element={<Register />}/>
      </Route>
      <Route path='*' element={<h1>Page Not Found</h1>} />
    </Routes>
  )
}

export default App
