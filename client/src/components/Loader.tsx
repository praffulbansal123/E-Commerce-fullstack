import { Backdrop, CircularProgress } from '@mui/material'

const Loader = () => {
  return (
    <Backdrop sx={{ color: '#fff'}} open >
        <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default Loader