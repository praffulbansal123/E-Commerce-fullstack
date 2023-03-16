import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import Header from './components/Header'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products'
import Search from './pages/Search'
import { LinearProgress } from '@mui/material'
import Notification from './components/Notification'

const ScrollToTop = () => {
  const {pathname} = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
const App = () => {

  const progress = 50

  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        <LinearProgress variant="determinate" color='secondary' value={progress} />
        <ScrollToTop />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:productId' element={<ProductDetails />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:keyword' element={<Products />} />
            <Route path='/search' element={<Search />} />
          </Routes>
        <Notification />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App