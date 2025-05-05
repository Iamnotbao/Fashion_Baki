import { useState, useEffect } from "react";
import MyReview from "./MyReview";
import { Button } from "@mui/material";
import Collapse from '@mui/material/Collapse';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import "../Comment/Comment.css";
import ReviewList from "./PreviewList";
import { Star } from "lucide-react";
import { getReviewsByProduct } from "../../services/reviewServices";

const Comment = ({ isCollapsed, productId }) => {
  const [onReview, setOnReview] = useState(false);
  const [onListReview, setOnListReview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const fetchReviews = async () => {
    try {
      const response = await getReviewsByProduct(productId);
      if (response) {
        setReviews(response.data[0].reviews);
        setAverageRating(response.data[0].averageRating);
        setTotalReviews(response.data[0].totalReviews);
      }
    } catch (error) {
      console.log("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleReviews = () => setOnReview(!onReview);
  const handleListReviews = () => setOnListReview(!onListReview);

  const handleUpdateReview = () => {
    fetchReviews();
  };


  return (
    <Collapse in={isCollapsed}>
      <section className="comment">
        <div className="comment_action">
          <div className="comment_action_star">
            {new Array(5).fill(" ").map((_, index) => (
              <span key={index} style={{ margin: "0" }}>
                <StarOutlineIcon />
              </span>
            ))}
          </div>
          <a onClick={handleListReviews} className="comment_action_title">Reviews</a>
        </div>
        <Button onClick={handleReviews}>Write Your Review</Button>
        {onReview && <MyReview handleUpdateReview={handleUpdateReview} />}
        {onListReview && (
          <div className="review">
            <ReviewList reviews={reviews} totalReviews={totalReviews} averageRating={averageRating} />
          </div>
        )}
      </section>
    </Collapse>
  );
};

export default Comment;