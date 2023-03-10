import { SearchOutlined, PersonOutlineOutlined, MenuOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import {Badge, Box, IconButton} from '@mui/material'
// import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { shades } from '../theme'

const Header = () => {

    const navigate = useNavigate()
    // const dispatch = useDispatch()
    return (
        <Box display='flex' alignItems='center' width='100%' height='60px' color='white' position='fixed' top='0' left='0' zIndex='1' sx={{backgroundColor:'whitesmoke'}}>
            <Box display='flex' alignItems='center' width='80%' margin='auto' justifyContent='space-between'>
                <Box onClick={() => navigate('/')} sx={{"&:hover": {cursor: "pointer"}}} color={shades.secondary[500]}>
                    <h3>E-Commerce</h3>
                </Box>
                <Box display='flex' justifyContent='space-between' columnGap='20px' zIndex='2'>
                    <IconButton sx={{color: 'black'}}>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton sx={{color: 'black'}}>
                        <PersonOutlineOutlined />
                    </IconButton>
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