import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import { CallWithOutAuth } from "../actions/apiActions";
//api end points
const getEmployeeList_url = '/users/employee/list';
const deleteEmployee_url = '/users/employee-remove';

export const Home = () => {
    const navigate = useNavigate();
    const [employeesData, setEmployeesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRemoveLoading, setIsRemoveLoading] = useState({});

    const getData = async () => {
        try {
            const response = await CallWithOutAuth("GET", getEmployeeList_url);
            if (response.res.status === 200 && response.res.data) {
                setEmployeesData(response.res.data.data)
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

    const handleDelete = async (id) => {
        console.log('id', id);
        setIsRemoveLoading(prev => ({ ...prev, [id]: true }));
        try {
            const response = await CallWithOutAuth("DELETE", `${deleteEmployee_url}/${id}`);
            if (response.res.status === 200 && response.res.data) {
                getData();
            }
            console.log(response.res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsRemoveLoading(prev => ({ ...prev, [id]: false }));
        }
    };
    return (
        <>
            <Header />
            <div className="page-header">
                <h2>Employee List</h2>
                <Button color="secondary" variant="contained" onClick={() => navigate(`/employee-form/create`)}>Create Employee</Button>
            </div>
            {loading ? <Loader /> :
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Sr. No</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Age</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {employeesData && employeesData.length > 0 ? employeesData.map((item, index) => (
                            <tr key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.fullName}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.age}</td>
                                <td>{item.salary}</td>
                                <td className="button-container">
                                    <Stack direction="row" spacing={2}>
                                        <Button color="secondary" variant="contained" onClick={() => navigate(`/employee-form/edit/${item._id}`)}>Edit</Button>
                                        <LoadingButton loading={isRemoveLoading[item._id] || false} color="secondary" variant="outlined" onClick={() => handleDelete(item._id)}>Delete</LoadingButton>
                                    </Stack>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="7"><strong>No Data Found</strong></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            }
        </>
    );
};