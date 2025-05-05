import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useAuthentication } from "../../pages/authentication/AuthProvider";
import { useNavigate } from 'react-router-dom';


export default function Logout({ open, handleClickOpen }) {

    const { logout } = useAuthentication();
    const navigation = useNavigate();
    const baseURL = "/api/service";
    const logOutURL = "/api/auth/logout"
    const handleLogout = async () => {
        try {
            const response = await axios.post(logOutURL);
            if (response.data) {
                logout();
                navigation("/Fashion_Baki/authentication/signIn");
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClickOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Log Out"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to Log Out ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickOpen}>Cancle</Button>
                    <Button onClick={handleLogout} >
                        Sure
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}