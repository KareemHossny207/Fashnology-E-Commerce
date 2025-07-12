import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './components/Login';
import SideBar from './components/SideBar';
import Create from './components/Create';
import Orders from './components/Orders';
import Allproducts from './components/Allproducts';
import Dashboard from './components/Dashboard';
import { ToastContainer} from 'react-toastify';


const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'): '');
    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);
    return (
        <div className='bg-gray-50 min-h-screen'>
            <ToastContainer/>
            {token === ""
                ? <Login setToken={setToken}/>
                : <>
                    <NavBar setToken={setToken}/>
                    <hr/>
                    <div className='flex w-full'>
                        <SideBar/>
                        <div className='flex-1 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8'>
                            <Routes>
                                <Route path='/' element={<Dashboard token={token}/>} />
                                <Route path='/Create' element={<Create token={token}/>} />
                                <Route path='/All' element={<Allproducts token={token}/>} />
                                <Route path='/Orders' element={<Orders token={token}/>} />
                            </Routes>
                        </div>
                    </div>
                </>}
        </div>
    )
}

export default App