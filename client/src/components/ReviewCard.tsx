import { Box, Rating, Typography } from '@mui/material'
import { shades } from '../theme'

type IReview = {
    review: {
    user: string,
    name: string,
    rating: number,
    userProfileImage: string
    comment: string,
    _id: string
    }
}


const ReviewCard = ({review}: IReview) => {
    return (
        <Box display='flex' alignItems='center' flexDirection='column' width='300px' border={`1px solid ${shades.primary[200]}`} boxShadow={`0 0 5px ${shades.primary[100]}`} padding='30px' margin='10px'>
            <img style={{width: '50px', borderRadius:'50%'}} src={review.userProfileImage} alt='user'/>
            <Typography variant='h4' color={shades.secondary[400]}>{review.name}</Typography>
            <Rating value={review.rating} readOnly precision={0.5} style={{padding: '5px 0px'}}/>
            <Typography variant='h5' fontFamily='cursive'>{review.comment}</Typography>
        </Box>
    )
}

export default ReviewCard