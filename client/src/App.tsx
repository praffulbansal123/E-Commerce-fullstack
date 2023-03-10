import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import Header from './components/Header'
import ProductDetails from './pages/ProductDetails'
import Loader from './components/Loader'


const ScrollToTop = () => {
  const {pathname} = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
const App = () => {

  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        <ScrollToTop />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sad' element={<Loader />} />
            <Route path='/product/:productId' element={<ProductDetails />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App