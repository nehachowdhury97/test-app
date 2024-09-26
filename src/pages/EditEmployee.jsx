import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from "./Form";
import { CallWithOutAuth } from "../actions/apiActions";
import { Loader } from "../components/Loader";
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import { useAppContext } from "../hooks/useAppContext";

//api end points
const getEmployee_url = '/users/employee';
const updateEmployee_url = '/users/employee-update';

export const EditEmployee = () => {
    const { setUserInfo } = useAppContext();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);

    const getData = async () => {
        try {
            const response = await CallWithOutAuth("GET", `${getEmployee_url}/${id}`);
            if (response.res.status === 200 && response.res.data) {
                setFormData(response.res.data.data);
                setUserInfo(response.res.data.data);
            }
            console.log(response.res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleUpdate = async () => {
        setIsUpdateLoading(true);
        try {
            const response = await CallWithOutAuth("PUT", `${updateEmployee_url}/${id}`, formData);
            if (response.res.status === 200 && response.res.data) {
                setIsUpdateLoading(false);
            }
            // console.log(response.res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsUpdateLoading(false);
            navigate('/');
        }
    };

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <Form formData={formData} setFormData={setFormData} />
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <LoadingButton loading={isUpdateLoading} color="secondary" variant="contained" onClick={() => handleUpdate()}>Save</LoadingButton>

                        <Button color="secondary" variant="outlined" onClick={() => navigate('/')}>Cancel</Button>
                    </Stack>
                </>
            }
        </>
    );
};