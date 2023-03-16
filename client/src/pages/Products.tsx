import { Box, List, ListItem, ListItemButton, ListItemText, Pagination, Slider, TextField, Typography, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingBar from '../components/LoadingBar'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../features/product/productSlice'
import { useAppDispatch, useAppSelector } from '../hooks/useHooksType'
import { shades } from '../theme'
import { formatCurrency } from '../utils/formatCurrency'
import { NotificationActions } from '../features/notification/notification'


const categories = ["Laptop", "Mobile Phone", "Washing Machine"]
const Products = () => {

    const dispatch = useAppDispatch()
    const {products, error, isLoading, progress} = useAppSelector(state => state.products)

    const isNonMobile = useMediaQuery("(min-width:600px)")
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0,100000])
    const [category, setCategory] = useState("")
    const [ratings, setRatings] = useState(0)

    const {keyword} = useParams()
    
    useEffect(() => {
        if(error) {
            dispatch(NotificationActions.addNotification({message: error, type: 'error'}))
        }
        dispatch(getProducts({keyword, currentPage, price, category, ratings}))
        dispatch(NotificationActions.addNotification({message: products.message, type: 'success'}))
    }, [dispatch, keyword, currentPage, price, category, ratings, error])
    
    return (
        <Box>
            {isLoading ? <LoadingBar progress={progress} /> : (
                <Box width='80%' margin='60px auto 60px auto' pt='30px' minHeight='425px'>
                    <Typography variant='h2' textAlign='center' width='200px' margin='0px auto' borderBottom='1px solid black'>
                        Products
                    </Typography>
                    <Box margin='5px auto' display='grid' gridTemplateColumns='repeat(auto-fill, 250px)' justifyContent='space-around' rowGap='5px' columnGap='1%'>
                        {products.data.map((product) =>
                            <ProductCard product={product} key={product._id} />
                        )}
                    </Box>
                    <Box width={isNonMobile?'120px':'240px'} position={isNonMobile? 'absolute':'static'} top='230px' left='30px' margin={isNonMobile?'':'auto'}>
                        <Typography variant='h3'>Price</Typography>
                        <Slider 
                            value={price}
                            onChange={(e, value) => setPrice(value as number[])}
                            valueLabelDisplay='auto'
                            getAriaLabel={() => 'Temperature range'}
                            getAriaValueText={(value) => formatCurrency(value)}
                            min={0}
                            max={100000}
                            step={10000}
                            color='secondary'
                        />
                        <Typography variant='h3' pt='20px'>Categories:</Typography>
                        <List>
                            {categories.map((category) =>(
                                <ListItem key={category} disablePadding sx={{'&:hover': {color: shades.secondary[500], cursor:'pointer' }}}>
                                    <ListItemText primary={category} onClick={() => setCategory(category)} sx={{fontSize:'700px'}} />
                                </ListItem>
                            ))}
                        </List>
                        <Typography variant='h4' pt='20px'>Ratings Above</Typography>
                        <Slider 
                            value={ratings}
                            onChange={(e, value) => setRatings(value as number)}
                            valueLabelDisplay='auto'
                            getAriaLabel={() => 'Temperature range'}
                            min={0}
                            max={5}
                            step={1}
                            color='secondary'
                        />
                    </Box>
                    {products.filteredProductsCount > products.productsPerPage && 
                    <Box display='flex' alignItems='center' justifyContent='center' marginTop='60px'>
                        <Pagination 
                            count={Math.ceil(products.totalProducts/products.productsPerPage)}
                            size="large"
                            color="secondary"
                            showFirstButton={true}
                            showLastButton={true}
                            page={currentPage}
                            onChange={(e, value) => setCurrentPage(value)}
                        />
                    </Box>}
                </Box>
            )}
        </Box>
    )
}

export default Products