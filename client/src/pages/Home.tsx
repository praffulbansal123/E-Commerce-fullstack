import { useEffect } from 'react'
import MainCarousel from '../components/MainCarousel'
import ProductCard from '../components/ProductCard'
import { Box, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../hooks/useHooksType'
import { getProducts } from '../features/product/productSlice'
import LoadingBar from '../components/LoadingBar'

const Home = () => {

  const dispatch = useAppDispatch()
  const {products, error, isLoading, progress} = useAppSelector(state => state.products)

  useEffect(() => {
    dispatch(getProducts({currentPage:1}))
  }, [dispatch])
  
  return (
    <Box>
      {isLoading ? (<LoadingBar progress={progress} />) : (
      <Box mt='70px' >
        <MainCarousel />
        <Box width='80%' margin='50px auto'>
          <Typography variant='h2' textAlign='center' width='500px' margin='0px auto' borderBottom='1px solid black'>
            Our Featured <b>Products</b>
          </Typography>
          <Box margin='0 auto' display='grid' gridTemplateColumns='repeat(auto-fill, 250px)' justifyContent='space-around' rowGap='5px' columnGap='1%'>
            {products.data.map((product) =>
              <ProductCard product={product} key={product._id} />
            )}
          </Box>
        </Box>
      </Box>
      )}
    </Box>
  )
}

export default Home