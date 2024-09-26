import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CallWithOutAuth } from "../actions/apiActions";
import { Form } from "./Form";
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import { Notification } from "../components/Notification";

//api end points
const addEmployee_url = '/users/employee/create';


export const CreateEmployee = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [isCreateLoading, setIsCreateLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [notificationType, setNotificationType] = useState("");
    const [showNotification, setShowNotification] = useState(false);

    const handleAddEmployee = async () => {
        setIsCreateLoading(true);
        try {
            const response = await CallWithOutAuth("POST", addEmployee_url, formData);
            if (response.res.status === 201 && response.res.data) {
                setIsCreateLoading(false);
                setMessage("Employee Created successfully!");
                setNotificationType("success");
                setShowNotification(true);
                setTimeout(() => {
                    navigate('/');
                }, 3000); navigate('/');
            } else {
                if (response.res.data.message) {
                    setMessage(response.res.data.message);
                } else {
                    setMessage("Something went wrong. Please try again.");
                }

                throw new Error("Unexpected response format");
            }
            // console.log(response.res.data.data);
        } catch (error) {
            console.log(error);

            setNotificationType("error");
            setShowNotification(true);
        } finally {
            setIsCreateLoading(false);
        }
    };

    return (
        <>

            <Notification
                message={message}
                type={notificationType}
                showNotification={showNotification}
                setShowNotification={setShowNotification}
            />

            <Form formData={formData} setFormData={setFormData} />
            <Stack direction="row" spacing={2} justifyContent="center">
                <LoadingButton loading={isCreateLoading} color="secondary" variant="contained" onClick={() => handleAddEmployee()}>Save</LoadingButton>

                <Button color="secondary" variant="outlined" onClick={() => navigate('/')}>Cancel</Button>
            </Stack>
        </>
    );
};