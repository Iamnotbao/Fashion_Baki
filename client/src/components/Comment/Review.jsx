const Review = ({ review,renderStars }) => {
    return (<div key={review.id} className="review-card">
        <div className="review-content">
            <div className="avatar">
                <div className="avatar-content">
                    <img src={review.user_avatar}/>
                </div>
            </div>
            <div className="review-details">
                <div className="review-header">
                    <div>
                        <h3 className="reviewer-name">{review.user_name}</h3>
                        {renderStars(review.rating)}
                    </div>
                    <span className="review-date">{review.createdAt}</span>
                </div>
                <p className="review-text">{review.content}</p>
            </div>
        </div>
    </div>);
}

export default Review;