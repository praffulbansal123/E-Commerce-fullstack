import { Box, CircularProgress } from '@mui/material'

const Spinner = () => {
  return (
    <Box display='flex' alignItems='center' >
        <CircularProgress color="secondary" />
    </Box>
  )
}

export default Spinner