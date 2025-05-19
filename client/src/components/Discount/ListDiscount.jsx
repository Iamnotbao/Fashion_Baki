import React, { useState } from 'react';
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

const ListDiscount = ({handleClose}) => {
    // State for managing the dialog
    const [open, setOpen] = useState(false);
    const [selectedCode, setSelectedCode] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    console.log("select", selectedCode);


  
    const discountCodes = [
        {
            id: 1,
            code: 'SUMMER25',
            description: 'Summer Sale Discount',
            discount: 25,
            type: 'percentage',
            expiryDate: '2024-08-31',
            minPurchase: 50
        },
        {
            id: 2,
            code: 'WELCOME10',
            description: 'New Customer Discount',
            discount: 10,
            type: 'percentage',
            expiryDate: '2024-12-31',
            minPurchase: 0
        },
        {
            id: 3,
            code: 'FREESHIP',
            description: 'Free Shipping on Orders',
            discount: 15,
            type: 'fixed',
            expiryDate: '2024-07-15',
            minPurchase: 75
        },
        {
            id: 4,
            code: 'FLASH50',
            description: 'Flash Sale - Limited Time',
            discount: 50,
            type: 'percentage',
            expiryDate: '2024-06-30',
            minPurchase: 100
        }
    ];




  
    const handleSelectCode = (code) => {
        setSelectedCode(code);
        setOpen(false);
        setSnackbarMessage('Discount code selected!');
        setSnackbarOpen(true);
    };

  
    const handleCopyCode = () => {
        if (selectedCode) {
            navigator.clipboard.writeText(selectedCode.code)
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
                    <React.Fragment key={code.id}>
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
                                        <Typography variant="subtitle1">{code.code}</Typography>
                                        <Chip
                                            size="small"
                                            label={`${code.discount}${code.type === 'percentage' ? '%' : '$'} off`}
                                            color="primary"
                                            variant="outlined"
                                        />
                                        <IconButton
                                            size="small"
                                            onClick={handleCopyCode}
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
                                        <Typography component="span" variant="body2" color="text.primary">
                                            {code.description}
                                        </Typography>
                                        <Typography component="div" variant="caption" color="text.secondary">
                                            Expires: {formatDate(code.expiryDate)}
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


            {/* Snackbar for notifications */}
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