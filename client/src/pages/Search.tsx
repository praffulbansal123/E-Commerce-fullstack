import { Box, Button, TextField } from '@mui/material'
import { height } from '@mui/system'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { shades } from '../theme'

const Search = () => {
    
    const [keyword, setKeyword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if(keyword.trim()) {
            navigate(`/products/${keyword}`)
        } else {
            navigate(`/products`)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box width='100%' height='100vh' zIndex='10' display='flex' justifyContent='center' margin='auto'  alignItems='center' position='fixed'>
                <TextField sx={{width:'60%'}} id="outlined-basic" variant="outlined" type='text' label="Search a Product ..." onChange={(e) => setKeyword(e.target.value)}/>
                <Button variant="contained" sx={{backgroundColor: 'tomato', width:'100px', height: '50px'}} type='submit'>Search</Button>
            </Box>
        </form>
    )
}

export default Search