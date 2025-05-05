import Typography from '@mui/material/Typography';
import { Button, Grid, InputAdornment, TextField, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "../Comment/MyReview.css";
import { useState } from 'react';
import { createReview } from '../../services/reviewServices';
import { useParams } from 'react-router-dom';
import StarRating from './StarRating';
import Avatar from '../../assets/images/avatar/j97.jpg';

const MyReview = ({ handleUpdateReview }) => {
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);
    const maxLength = 500;
    const { avatar, fullName, username } = JSON.parse(localStorage.getItem("user"));
    const userAvatar = avatar || Avatar;
    const { id } = useParams();    
    const handleReviewChange = (e) => {
        if (e.target.value.length <= maxLength) {
            setReviewText(e.target.value);
        }
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = async() => {
        if (reviewText.trim() && rating > 0) {
            const review = {
                productId: id,
                username: username,
                avatar: userAvatar,
                content: reviewText,
                rating: rating
            };
            try {
                const response = await createReview(review);
                if(response){
                    console.log(response);
                    setReviewText("");
                    setRating(0);
                    handleUpdateReview();
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <section className="review">
            <Grid container spacing={2}>
                <Grid xs={12} container>
                    <div className="avatar">
                        <div className="avatar-content">
                            <img src={`${avatar ? avatar : Avatar}`} style={{maxWidth:"100%"}} alt="User avatar" />
                        </div>
                    </div>
                    <div className="review-details">
                        <div className="review-header">
                            <div>
                                <h3 className="reviewer-name">{fullName}</h3>
                                <div style={{ marginBottom: '10px' }}>
                                    <StarRating initialRating={rating} onRatingChange={handleRatingChange} />
                                </div>
                            </div>
                        </div>
                        <Paper elevation={0} variant="outlined" className="review-input-container">
                            <TextField
                                fullWidth
                                multiline
                                minRows={2}
                                maxRows={4}
                                variant="standard"
                                placeholder="Share your thoughts..."
                                value={reviewText}
                                onChange={handleReviewChange}
                                InputProps={{
                                    disableUnderline: true,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Typography
                                                variant="caption"
                                                color={reviewText.length >= maxLength ? "error" : "text.secondary"}
                                            >
                                                {reviewText.length}/{maxLength}
                                            </Typography>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    "& .MuiInputBase-root": {
                                        padding: "12px",
                                    },
                                }}
                            />
                            <div className="review-actions">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    endIcon={<SendIcon />}
                                    disabled={!reviewText.trim() || rating === 0}
                                    onClick={handleSubmit}
                                    size="small"
                                >
                                    Post
                                </Button>
                            </div>
                        </Paper>
                    </div>
                </Grid>
            </Grid>
        </section>
    );
};

export default MyReview;