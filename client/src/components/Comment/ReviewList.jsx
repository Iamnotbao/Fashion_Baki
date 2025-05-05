import Review from "./Review";

const ReviewList = ({reviews,selectedRating,searchQuery,showOnlyImages,renderStars}) => {
    return (<>
        <div className="reviews-list">
            {reviews
                .filter((review) => {
                    if (selectedRating && review.rating !== selectedRating) return false
                    if (showOnlyImages && !review.hasImage) return false
                    if (searchQuery && !review.comment.toLowerCase().includes(searchQuery.toLowerCase())) return false
                    return true
                })
                .map((review) => (
                    <Review key={review.id} review={review} renderStars={renderStars} />
                ))}

            <div className="pagination">
                <button className="pagination-button">
                    <span className="sr-only">Previous page</span>
                    <span>←</span>
                </button>
                <button className="pagination-button pagination-number">1</button>
                <button className="pagination-button">
                    <span className="sr-only">Next page</span>
                    <span>→</span>
                </button>
            </div>
        </div>

    </>);
}

export default ReviewList;