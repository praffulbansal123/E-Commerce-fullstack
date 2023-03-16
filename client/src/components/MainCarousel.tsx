import Carousel from 'react-material-ui-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { shades } from '../theme'
import { Box, Typography, useMediaQuery } from '@mui/material'
import img1 from '../assets/phone.png'
import img2 from '../assets/washing machine.jpg'
import img3 from '../assets/1.jpg'

const images = [img1, img2, img3]
 
const MainCarousel = () => {

    const isNonMobile = useMediaQuery("(min-width: 600px)")
    return (
        <Carousel autoPlay={true} animation='slide' indicators={false} navButtonsAlwaysVisible={true} cycleNavigation={true} navButtonsProps={{style: {backgroundColor:'white', color:'#494949', borderRadius:0, marginTop:-22, height:'104px'}}}>
            {images.map((texture, index) => (
                <Box key={`carousel-image-${index}`}>
                    <img src={texture} alt={`carousel-${index}`} style={{width: '100%', height: '300px', objectFit: "cover", backgroundAttachment: 'fixed'}}/>
                    <Box color='white' padding='20px' borderRadius='1px' textAlign='left' position='absolute' top='30%' sx={{backgroundColor: "rgb(0, 0, 0, 0.4)"}} left={isNonMobile?'7%':'0'} right={isNonMobile?undefined:'0'} margin={isNonMobile?undefined:'0 auto'} maxWidth={isNonMobile?undefined:'240px'}>
                        <Typography color={shades.secondary[200]}>-- NEW ITEMS</Typography>
                        <Typography variant='h1'>Holi Sale</Typography>
                        <Typography variant='h4' >10% Discount on SBI Credit and Debit Cards</Typography>
                    </Box>
                </Box>
            ))}
        </Carousel>
    )
}

export default MainCarousel