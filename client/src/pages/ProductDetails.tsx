import { Box, Button, IconButton, Rating, Typography } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import { useParams } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { shades } from '../theme';
import ReviewCard from '../components/ReviewCard';
import { formatCurrency } from '../utils/formatCurrency';
import { useAppDispatch, useAppSelector } from '../hooks/useHooksType';
import { getProductDetails } from '../features/product/productDetailSlice';
import { useEffect } from 'react';
import LoadingBar from '../components/LoadingBar';
import { NotificationActions } from '../features/notification/notification';

const ProductDetails = () => {

  const {productId} = useParams()
  const dispatch = useAppDispatch()
  const {product, error, isLoading, progress} = useAppSelector(state => state.productDetails)
  
  useEffect(() => {
    if(error) {
      dispatch(NotificationActions.addNotification({message: error, type: 'error'}))
    }
    dispatch(getProductDetails(productId))
    dispatch(NotificationActions.addNotification({message: product.message, type: 'success'}))
  }, [dispatch, productId, error])

  return (
    <Box>
      {isLoading ? (<LoadingBar progress={progress} />) : (
        <Box>
          <Box width='80%' m='80px auto 40px auto' display='flex' flexWrap='wrap' columnGap='40px'>
            {/* IMAGES SECTION */}
            <Box flex='1 1 40%' mb='40px' alignItems='center'>
              <Carousel autoPlay={true} animation='slide' indicators={false} navButtonsAlwaysVisible={true} cycleNavigation={true} >
                {product.data && product.data.productImage.map((image, index:number) => (
                  <img  key={`${index}-Slide`} src={image.url} alt={`${index}-Slide`} style={{maxWidth:'100%', maxHeight:'500px', display:'block', margin:'auto'}}/>
                ))}
              </Carousel>
            </Box>
            {/* Discription section */}
            <Box flex='1 1 50%' mb='40px'>
              <Box>
                <Typography variant='h2'>{product.data.name}</Typography>
                <Typography>
                  <p>Product # {product.data._id}</p>
                </Typography>
              </Box>
              <Box display='flex' justifyContent='flex-start' alignItems='center' borderTop={`1px solid ${shades.primary[100]}`} p='10px 0px' width='70%' borderBottom={`1px solid ${shades.primary[100]}`}>
                <Rating value={product.data.ratings} readOnly precision={0.5}/>
                <Typography variant='h5' marginTop='4px' marginLeft='10px'>({product.data.numOfReviews} reviews)</Typography>
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
            <Box display='flex' pb='80px'>
              {product.data.reviews && product.data.reviews.map((review:any) => <ReviewCard review={review} />)}
            </Box>
          ) : (
          <Typography variant='h4' color={shades.primary[500]} textAlign='center' margin='auto' pb='80px'>No reviews Yet</Typography>
          )}
        </Box>
        )}
    </Box>
    
  )
}

export default ProductDetails