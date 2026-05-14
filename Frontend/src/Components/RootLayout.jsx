import Header from './Header.jsx'
import Footer from './Footer.jsx' 
import { Outlet } from 'react-router'
import { useEffect } from 'react'
import { useAuth } from '../Store/AuthStore.js'

function RootLayout() {
  const checkAuth=useAuth((state)=>state.checkAuth);
  const loading =useAuth((state)=>state.loading);
  useEffect(()=>{
    checkAuth();
  },[])
  //wait until the checkauth function 
  if (loading){
    return <p>Loading....</p>
  }
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header/>
          {/* component placeholder */}
          <main className='flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
               <Outlet/>
          </main>
          <Footer/> 
    </div>
  )
}

export default RootLayout