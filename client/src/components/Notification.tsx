import { Snackbar, Alert, SnackbarCloseReason, Slide } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../hooks/useHooksType'
import { NotificationActions } from '../features/notification/notification'

const Notification = () => {
    
    const dispatch = useAppDispatch()
    const {open, type, message, timeout} = useAppSelector(state => state.notifications)
    
    const handleClose = (_event:unknown, reason?:SnackbarCloseReason) => {
        if(reason !== 'clickaway') {
            return
        }
        dispatch(NotificationActions.clearNotification())
    }

    return (
        <Snackbar open={open} autoHideDuration={timeout} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} TransitionComponent={Slide}>
            <Alert variant='filled' onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Notification