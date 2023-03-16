import { Box, IconButton, Typography, useMediaQuery } from '@mui/material'
import playStore from '../assets/playstore.png'
import appStore from '../assets/Appstore.png'
import { shades } from '../theme'
import { Instagram, Facebook, YouTube } from '@mui/icons-material'


const Footer = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)')
  return (
    <Box width='100%' color='white' display='flex' alignItems='center' sx={{backgroundColor: shades.primary[400]}}>
      <Box width='25%' display='flex' flexDirection='column' alignItems='center' mt='25px'>
        <Typography variant='h3'>Download Our APP</Typography>
        <Typography variant='h5' my='15px'>Download App for Android and IOS mobile phones</Typography>
        <img width='50%' style={{cursor:'pointer', margin:'15px'}} src={playStore} alt='PlayStore'/>
        <img width='50%' style={{cursor:'pointer', margin:'15px'}} src={appStore} alt='AppStore'/>
      </Box>
      <Box width='50%' display='flex' flexDirection='column' alignItems='center'>
        <Typography variant={isNonMobile?'h1':'h2'} color={shades.secondary[500]} my='25px'><b>E-Commerce</b></Typography>
        <Typography variant='h4' my='15px'>High Quality is our Top-Most Priority</Typography>
        <Typography variant='h4' my='15px'>Copyrights 2023 &Copy; PraffulBansal </Typography>
      </Box>
      <Box width='25%' display='flex' flexDirection='column' alignItems='center'>
        <Typography variant='h4' sx={{textDecoration: 'underline'}}>Follow Us</Typography>
        <IconButton sx={{color: 'white' }}>
          <Instagram sx={{fontSize: 40}}/>
        </IconButton>
        <IconButton sx={{color: 'white' }}>
          <Facebook sx={{fontSize: 40}}/>
        </IconButton>
        <IconButton sx={{color: 'white' }}>
          <YouTube sx={{fontSize: 40}}/>
        </IconButton>
      </Box>
    </Box>
  )
}

export default Footer