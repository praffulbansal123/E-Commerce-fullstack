import { Box, Rating, Typography, useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import IProduct from '../interface/productInterface'
import { shades } from '../theme'
import { formatCurrency } from '../utils/formatCurrency'

type ProductCard = {
    product: IProduct
}

const ProductCard = ({product}: ProductCard) => {
    const navigate = useNavigate()
    const isNonMobile = useMediaQuery("(min-width:600px)")

    return (
        <Box width='190px' display='flex' flexDirection='column' mt='60px' ml='3vmax' paddingBottom='5px' sx={{transition: 'all 0.5sec', "&:hover": {boxShadow: '0 0 5px', transform: 'translateY(5px)'}}}>
            <Box position='relative'>
                <img alt={product.name} height='300px' width='100%' src={product.productImage[0].url} onClick={() => navigate(`/product/${product._id}`)} />
            </Box>
            <Typography variant='h3'>{product.name}</Typography>
            <Box display='flex' justifyContent='flex-start' m='0.3vmax 0.2vmax 0vmax 0.2vmax' >
                <Rating value={product.ratings} readOnly precision={0.5} size={isNonMobile ? 'medium': 'small'} />
                <Typography margin={isNonMobile ? '2px 5px' : '0px 5px'}>({product.numOfReviews} reviews)</Typography>
            </Box>
            <Typography variant='h3' sx={{color: shades.secondary[500]}}>{formatCurrency(product.price)}</Typography>
        </Box>
    )
}

export default ProductCard