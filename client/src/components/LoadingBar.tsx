import { Box, LinearProgress } from '@mui/material'

type Progress = {
    progress: number
}

const LoadingBar = ({progress}:Progress) => {
  return (
    <Box mt='56px' width='100%' height='100vh' position='fixed'>
        <LinearProgress variant='determinate' color='secondary' value={progress}></LinearProgress>
    </Box>
  )
}

export default LoadingBar