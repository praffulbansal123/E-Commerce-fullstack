import React, { ReactNode } from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { NavigateNext, NavigateBefore } from '@mui/icons-material'
import { shades } from '../theme'
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material'
import img1 from '../assets/phone.png'
import img2 from '../assets/washing machine.jpg'
import img3 from '../assets/1.jpg'

const images = [img1, img2, img3]

// Import all Images from assets folder
// const importAll = (r: any) => {
//     r.keys().reduce((acc: any, key: any) => {
//         acc[key.replace("./", "")] = r[key]
//         return acc
//     }, {})
// }


// const heroTextureImports = importAll(
//     require.context("../assets", false, /\.(png|jpg|jpeg|svg)$/)
// )

// console.log(heroTextureImports)
 
const MainCarousel = () => {

    const isNonMobile = useMediaQuery("(min-width: 600px)")
    return (
        <Carousel infiniteLoop={true} showThumbs={false} showIndicators={true} showStatus={false} renderArrowPrev={(onclickHandler:() => void, hasPrev:boolean, label:string):any => {
            <IconButton onClick={onclickHandler} sx={{position: 'absolute', top: '50%', left: '0', color: 'white', p: '5px', zIndex: '30'}}>
                <NavigateBefore sx={{fontSize: '40px'}}/>
            </IconButton>
        }}
        renderArrowNext={(onclickHandler:() => void, hasPrev:boolean, label:string):any => {
            <IconButton onClick={onclickHandler} sx={{position: 'absolute', top: '50%', right: '0', color: 'black', p: '5px', zIndex: '10'}}>
                <NavigateNext sx={{fontSize: '40px'}}/>
            </IconButton>
        }}>
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