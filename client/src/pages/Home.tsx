import { useEffect } from 'react'
import MainCarousel from '../components/MainCarousel'
import Product from '../components/Product'
import { Box, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../hooks/useHooksType'
import { getProducts } from '../features/product/productSlice'

const Home = () => {

  const dispatch = useAppDispatch()
  const {products, error, isLoading} = useAppSelector(state => state.products)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])
  
  return (
    <Box mt='70px' >
      <MainCarousel />
      <Box width='80%' margin='50px auto'>
        <Typography variant='h3' textAlign='center'>
          Our Featured <b>Products</b>
        </Typography>
        <Box margin='0 auto' display='grid' gridTemplateColumns='repeat(auto-fill, 300px)' justifyContent='space-around' rowGap='20px' columnGap='1.13%'>
          {products.data.map((product) =>
            <Product product={product} key={product._id} />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Home