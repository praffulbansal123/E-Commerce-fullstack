import { Box, Button, IconButton, Rating, Typography } from '@mui/material'
import { Carousel } from 'react-responsive-carousel'
import { useParams } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { shades } from '../theme';
import ReviewCard from '../components/ReviewCard';
import { formatCurrency } from '../utils/formatCurrency';
import { useAppDispatch, useAppSelector } from '../hooks/useHooksType';
import { getProductDetails } from '../features/product/productDetailSlice';
import { useEffect } from 'react';
import Loader from '../components/Loader';

const ProductDetails = () => {

  const {productId} = useParams()
  const dispatch = useAppDispatch()
  const {product, error, isLoading} = useAppSelector(state => state.productDetails)
  
  useEffect(() => {
    dispatch(getProductDetails(productId))
  }, [dispatch, productId])

  return (
    <Box>
      {isLoading ? (<Loader />) : (
        <Box>
          <Box width='80%' m='80px auto 40px auto' display='flex' flexWrap='wrap' columnGap='40px'>
            {/* IMAGES SECTION */}
            <Box flex='1 1 40%' mb='40px' alignItems='center'>
              <Carousel infiniteLoop={true} showThumbs={false} showIndicators={true} showStatus={false}>
                {product.data && product.data.productImage.map((image, index:number) => (
                  <img key={`${index}-Slide`} src={image.url} alt={`${index}-Slide`} style={{objectFit: 'contain', height:'425px'}}/>
                ))}
              </Carousel>
            </Box>
            <Box flex='1 1 50%' mb='40px'>
              <Box>
                <Typography variant='h2'>{product.data.name}</Typography>
                <Typography>
                  <p>Product # {product.data._id}</p>
                </Typography>
              </Box>
              <Box display='flex' justifyContent='flex-start' alignItems='center' borderTop={`1px solid ${shades.primary[100]}`} p='10px 0px' width='70%' borderBottom={`1px solid ${shades.primary[100]}`}>
                <Rating value={product.data.ratings} readOnly precision={0.5}/>
                <Typography variant='h5'>({product.data.numOfReviews} reviews)</Typography>
              </Box>
              <Box width='70%'>
                <Typography variant='h2' m='20px 0px'>{formatCurrency(product.data.price)}</Typography>
                <Box display='flex' alignItems='center' mb='20px'>
                  <Box display='flex' alignItems='center' p='2px 5px'>
                    <IconButton>
                      <RemoveIcon />
                    </IconButton>
                    <IconButton>
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Button sx={{border:'none', cursor:'pointer', color:'white', backgroundColor: shades.secondary[400], transition:'all 0.5s', borderRadius:'20px', p:'5px 20px', font:'500 10px', '&:hover': {backgroundColor: shades.secondary[600]}}}>Add To Cart</Button>
                </Box>
                <Box display='flex' borderTop={`1px solid ${shades.primary[100]}`} p='10px 0px' borderBottom={`1px solid ${shades.primary[100]}`}>
                  <Typography variant='h3'>
                    Status:
                  </Typography>
                  <Typography variant='h3' color={product.data.availableStock>0?'green':'red'}>
                    {product.data.availableStock>0?'In Stock':'Out of Stock'}
                  </Typography>
                </Box>
              </Box>
              <Box m='20px 0px'>
                <Typography variant='h3'>Description:</Typography>
                <Typography variant='h5' color={shades.primary[400]}>{product.data.description}</Typography>
              </Box>
              <Button sx={{border:'none', cursor:'pointer', color:'white', backgroundColor: shades.secondary[400], transition:'all 0.1s', borderRadius:'20px', p:'5px 20px', font:'500 10px', '&:hover': {backgroundColor: shades.secondary[600], transform: 'scale(1.1)'}}}>Submit Review</Button>
            </Box>
          </Box>
          <Typography variant='h2' color={shades.primary[500]} borderBottom={`1px solid ${shades.primary[100]}`} width='200px' textAlign='center' margin='auto' mb='20px'>Reviews</Typography>
          {product.data.reviews && product.data.reviews[0] ? (
            <Box display='flex' overflow='auto'>
              {product.data.reviews && product.data.reviews.map((review:any) => <ReviewCard review={review} />)}
            </Box>
          ) : (
          <Typography variant='h4' color={shades.primary[500]} textAlign='center' margin='auto'>No reviews Yet</Typography>
          )}
        </Box>
        )}
    </Box>
    
  )
}

export default ProductDetails