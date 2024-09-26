import React, { useState } from "react";
import { Button, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
    display: 'none',
});

export const Form = ({ formData, setFormData }) => {
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const handleChangeEmail = (event) => {
        const inputValue = event.target.value;
        setFormData({
            ...formData,
            email: inputValue,
        });

        // Email validation pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate the email format
        if (inputValue && !emailPattern.test(inputValue)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };
    const handleUploadImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    image: reader.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChangePhoneNumber = (event) => {
        const inputValue = event.target.value;
        if (/^\d*$/.test(inputValue)) {
            if (inputValue.length === 10) {
                setFormData({
                    ...formData,
                    phone: inputValue,
                });
            } else {
                setPhoneError('Phone number should be exactly 10 digits');
            }
        }
    }
    const handleChangeSalary = (event) => {
        const inputValue = event.target.value;
        if (/^\d*$/.test(inputValue)) {
            setFormData({
                ...formData,
                salary: inputValue,
            });
        }
    }

    const handleChangeAge = (event) => {
        const inputValue = event.target.value;
        if (/^\d*$/.test(inputValue)) {
            setFormData({
                ...formData,
                age: inputValue,
            });
        }
    }

    return (
        <>
            <div>
                <p>Employee Form</p>
                <form>
                    <div className="formRow" >
                        <TextField id="fullName" label="Full Name" variant="outlined" value={formData.fullName} onChange={(event) => {
                            const inputValue = event.target.value;
                            if (/^[a-zA-Z\s]*$/.test(inputValue)) {
                                setFormData({
                                    ...formData,
                                    fullName: inputValue,
                                });
                            }
                        }} />
                        <TextField id="email" label="Email" variant="outlined" value={formData.email} onChange={(event) => handleChangeEmail(event)}
                            error={!!emailError}
                            helperText={emailError} />
                    </div>
                    <div className="formRow" >
                        <TextField id="phone" label="Phone Number" variant="outlined" value={formData.phone} onChange={(event) => handleChangePhoneNumber(event)} error={!!phoneError}
                            helperText={phoneError} />
                        <TextField id="age" label="Age" variant="outlined" value={formData.age} onChange={(event) => handleChangeAge(event)} />
                    </div>
                    <div className="formRow" >
                        <TextField id="salary" label="Salary" variant="outlined" value={formData.salary} onChange={(event) => handleChangeSalary(event)} />
                        <div>
                            <Button
                                color="secondary"
                                component="label"
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload Image
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={handleUploadImage}
                                    accept="image/*"
                                />
                            </Button>
                            {formData.image && (
                                <div>
                                    <p>Preview:</p>
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};