import Typography from '@mui/material/Typography';
import { Button, Dialog, DialogTitle, Grid } from "@mui/material";
import Avatar from "../../assets/images/signup.jpg"
import "../Comment/PreviewList.css"
import ReviewSection from './ReviewSection';
import { useState } from 'react';
import Review from './Review';
import { Star } from "lucide-react"

const PreviewList = ({ reviews = [], totalReviews,averageRating  }) => {
  const [onReviews, setOnReviews] = useState(false);
  console.log("pass", totalReviews, averageRating );
  const renderStars = (rating) => {
    return (
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => {
          let starClass = "star"
          if (star <= rating) {
            starClass += " star-filled"
          } else if (star - rating <= 0.5) {
            starClass += " star-half"
          }
          return <Star key={star} className={starClass} />
        })}
      </div>
    )
  }
  return (
    <section className="review_list">
      <Grid container spacing={2}>
        <Grid xs={12} container>
          <Grid xs={12}>
            {reviews.slice(0,3).map((review) => <Review key={review.id} review={review} renderStars={renderStars} type={"preview"} />)}
          </Grid>
        </Grid>
        <Grid xs={12} container>
          <Button onClick={() => setOnReviews(!onReviews)}>View More</Button>
        </Grid>
      </Grid>
      <Dialog open={onReviews} onClose={() => setOnReviews(false)} maxWidth="md" fullWidth>
        <ReviewSection reviews={reviews} totalReviews={totalReviews} averageRating={averageRating} />
      </Dialog>
    </section>);
}

export default PreviewList;