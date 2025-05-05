import React, { useState } from 'react';
import { Star } from "lucide-react";
import { Typography } from "@mui/material";

const StarRating = ({ initialRating = 0, onRatingChange }) => {
    const [rating, setRating] = useState(initialRating);
    const [hoverRating, setHoverRating] = useState(0);


    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
        if (onRatingChange) {
            onRatingChange(selectedRating);
        }
    };

    const handleStarHover = (hoveredRating) => {
        setHoverRating(hoveredRating);
    };

    const handleStarLeave = () => {
        setHoverRating(0);
    };

    return (
        <div 
            className="rating-selector" 
            style={{ display: 'flex', alignItems: 'center' }}
            onMouseLeave={handleStarLeave}
        >
            {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                    key={star}
                    className={`star ${(hoverRating || rating) >= star ? 'star-filled' : ''}`}
                    style={{ 
                        cursor: 'pointer', 
                        marginRight: '5px',
                        fill: (hoverRating || rating) >= star ? 'gold' : 'none',
                        stroke: (hoverRating || rating) >= star ? 'gold' : 'currentColor'
                    }}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => handleStarHover(star)}
                />
            ))}
        </div>
    );
};

export default StarRating;