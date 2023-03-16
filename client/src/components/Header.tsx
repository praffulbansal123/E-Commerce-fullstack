import { SearchOutlined, PersonOutlineOutlined, MenuOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import {Avatar, Badge, Box, IconButton, Typography, useMediaQuery} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { shades } from '../theme'

const Header = () => {

    const navigate = useNavigate()
    const isNonMobile = useMediaQuery('(min-width: 600px)')

    return (
        <Box display='flex' alignItems='center' width='100%' height='60px' color='white' position='fixed' top='0' left='0' zIndex='10' sx={{backgroundColor:'#edebe8'}}>
            <Box display='flex' alignItems='center' width='80%' margin='auto' justifyContent='space-between'>
                <Box display='flex' alignItems='center' onClick={() => navigate('/')} sx={{"&:hover": {cursor: "pointer"}}} color={shades.secondary[400]}>
                    <Typography variant='h4'><b>E-Commerce</b></Typography>
                </Box>
                {isNonMobile && <Box display='flex' columnGap='60px' pr='290px' >
                    <Typography variant='h4' color={shades.secondary[400]} onClick={() => navigate('/')} sx={{"&:hover": {cursor: "pointer", color: shades.secondary[600]}}}>
                        Home
                    </Typography>
                    <Typography variant='h4' color={shades.secondary[400]} onClick={() => navigate('/products')} sx={{"&:hover": {cursor: "pointer", color: shades.secondary[600]}}}>
                        Products
                    </Typography>
                    <Typography variant='h4' color={shades.secondary[400]} onClick={() => navigate('/about')} sx={{"&:hover": {cursor: "pointer", color: shades.secondary[600]}}}>
                        About
                    </Typography>
                </Box>}
                <Box display='flex' justifyContent='space-between' columnGap='20px' zIndex='2'>
                    <IconButton sx={{color: 'white', backgroundColor: shades.secondary[400], width: 34, height: 34, '&:hover': {backgroundColor: shades.secondary[600]}}} onClick={() => navigate('/search')}>
                        <SearchOutlined fontSize="large" />
                    </IconButton>
                    <Avatar sx={{backgroundColor: shades.secondary[400], width: 34, height: 34}}>
                        PB
                    </Avatar>
                    <Badge badgeContent='2' color='secondary' sx={{"& .MuiBadge-badge": {right:5,top:5,p:'0 4px',height:'14px',minWidth:'13px'}}}>
                        <IconButton sx={{color: 'black'}}>
                            <ShoppingCartOutlined />
                        </IconButton>
                    </Badge>
                    <IconButton sx={{color: 'black'}}>
                        <MenuOutlined />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default Header