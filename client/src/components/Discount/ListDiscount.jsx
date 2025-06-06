import React, { useEffect, useState } from 'react';
import {
    Typography,
    Button,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    IconButton,
    Box,
    Chip,
    Snackbar,
    Alert,

} from '@mui/material';
import {
    LocalOffer as LocalOfferIcon,
    ContentCopy as ContentCopyIcon,
    Check as CheckIcon,
    Close as CloseIcon,
    Percent as PercentIcon,
    AttachMoney as AttachMoneyIcon,
    CalendarToday as CalendarTodayIcon
} from '@mui/icons-material';
import { fetchUserDiscount } from '../../services/userServices';

const ListDiscount = ({ handleClose }) => {
    const [loading, setLoading] = useState(false);
    const [discountCodes, setDiscountCodes] = useState([]);
    const [selectedCode, setSelectedCode] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const { id } = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;



    fetchUserDiscount
    useEffect(() => {
        if (!loading) {
            fetchDiscount();
        }
    }, [loading])



    const fetchDiscount = async () => {
        const response = await fetchUserDiscount(id);
       
        if (response) {
            setDiscountCodes(response)
            setLoading(true)
        }
    }


    const handleSelectCode = (code) => {
        setSelectedCode(code);
         setSnackbarMessage('Discount code has been selected!');
    }

    const handleCopyCode = (code) => {
        handleSelectCode(code);
        if (selectedCode) {
            navigator.clipboard.writeText(selectedCode.discountCode.code)
                .then(() => {
                    setSnackbarMessage('Discount code copied to clipboard!');
                    setSnackbarOpen(true);
                })
                .catch(err => {
                    console.error('Failed to copy code: ', err);
                    setSnackbarMessage('Failed to copy code');
                    setSnackbarOpen(true);
                });
        }
    };


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', my: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>{"Select a Discount Code"}</Typography>
                <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <List sx={{ pt: 0 }}>
                {discountCodes.map((code) => (
                    <React.Fragment key={code.discountCode.id}>
                        <ListItem
                            button
                            onClick={() => handleSelectCode(code)}
                            selected={selectedCode && selectedCode.id === code.id}
                        >
                            <ListItemIcon>
                                <AttachMoneyIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="subtitle1">{code.discountCode.code}</Typography>
                                        <Chip
                                            size="small"
                                            label={`${code.discountCode.percentage}% off`}
                                            color="primary"
                                            variant="outlined"
                                        />
                                        <IconButton
                                            size="small"
                                            onClick={() => { handleCopyCode(code) }}
                                            sx={{
                                                bgcolor: 'primary.main',
                                                color: 'white',
                                                '&:hover': { bgcolor: 'primary.dark' }
                                            }}
                                        >
                                            <ContentCopyIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                }
                                secondary={
                                    <>

                                        <Typography component="div" variant="caption" color="text.secondary">
                                            Expires: {formatDate(code.discountCode.expirationDate)}
                                            {code.minPurchase > 0 && ` • Min. purchase: $${code.minPurchase.toFixed(2)}`}
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ListDiscount;