import { AlertColor } from "@mui/material"
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { createSlice } from "@reduxjs/toolkit";


export interface NotificationState {
    open?: boolean,
    type?: AlertColor,
    message?: string,
    timeout?: number | null
}

export const notificationInitialState: NotificationState = {
    open: false,
    type: "info",
    message: "",
    timeout: 5000
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: notificationInitialState,
    reducers: {
        addNotification: (_state: NotificationState, action: PayloadAction<NotificationState>) => ({
            ...notificationInitialState,
            ...action.payload,
            open: true
        }),
        clearNotification: (state: NotificationState) => ({...state, open: false})
    },
})

export const NotificationActions = notificationSlice.actions 

export default notificationSlice.reducer
    