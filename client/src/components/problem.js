import { Typography, Box, TextField, Select, MenuItem, Button, InputLabel, Grid } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import SelectInput from '@mui/material/Select/SelectInput';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import AddIcon from '@mui/icons-material/Add';

const Problem = () => {
    const id = localStorage.getItem("userId")
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        company: '',
        problem: '',
        location: '',
        description: '',
        url: '',
    });
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    const handleInputChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("http://localhost:8000/api/job/create-job", {
                company: formData.company,
                problem: formData.problem,
                location: formData.location,
                description: formData.description,
                url: formData.url,
                user: id,
            })

            toast.success("Blog Created");
            navigate("/all-jobs")

        } catch (error) {
            console.log('Error creating job:', error);
            // Handle error state or display error message
        }
    };


    return (
        <>
            <Typography variant='h4' textAlign='center' sx={{ color: '#00589f', fontWeight: 'bold' }}>
                Post A Feedback
            </Typography>
            <Grid container justifyContent={'center'} spacing={4}>
                <Grid item>
                    <Box
                        display='flex'
                        flexDirection='row'
                        alignItems='center'
                        justifyContent='center'
                        boxShadow='10px 10px 20px #ccc'
                        backgroundColor='#fff'
                        padding='20px 20px'
                        margin='auto'
                        borderRadius={5}
                    >
                        <form onSubmit={handleSubmit}>
                            <Typography variant='h5' sx={{ textAlign: 'center', fontWeight: 'bold' }}>Review Details</Typography>
                            <TextField
                                label='Company'
                                name='company'
                                value={formData.company}
                                onChange={handleInputChange}
                                required
                                fullWidth size='small'
                            />
                            <TextField
                                label='problem'
                                name='problem'
                                value={formData.problem}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                size='small'
                            />
                            <TextField
                                label='Location'
                                name='location'
                                value={formData.location}
                                onChange={handleInputChange}
                                fullWidth
                                size='small'
                            />
                            <InputLabel id='category-label'>Category</InputLabel>
                            <Select
                                labelId='category-label'
                                name='category'
                                value={formData.category}
                                onChange={handleInputChange}
                                fullWidth
                                size='small'
                            >
                                <MenuItem value='software'>Software</MenuItem>
                                <MenuItem value='hardware'>Hardware</MenuItem>
                                <MenuItem value='otherproblem'>Other</MenuItem>
                                {/* Add more options as needed */}
                            </Select>
                            <TextField
                                label='Description'
                                name='description'
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                multiline
                                rows={4}
                                size='small'
                            />
                            <TextField
                                label='Image URL or Upload'
                                name='url'
                                value={formData.url}
                                onChange={handleInputChange}
                                fullWidth
                                size='small'
                            />
                            <input type="file" onChange={handleChange} />
                            <img src={file}/>
                            <br/>
                            <Button type='submit' variant='contained' sx={{ marginLeft: '40%', backgroundImage: 'linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);', color: 'white' }} endIcon={<AddIcon />}>
                                Post Review
                            </Button>
                        </form>
                        {<Toaster position="top-right" reverseOrder={false} />}
                    </Box>
                </Grid>

                <Grid item>
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/customer-review-3949823-3277284.png" className='img-fluid' height={'20px'} />
                </Grid>
            </Grid>

        </>
    );
};

export default Problem;