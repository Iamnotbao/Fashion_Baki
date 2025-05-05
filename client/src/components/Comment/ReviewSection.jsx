
import { useState } from "react"
import { Star } from "lucide-react"
import "./ReviewSection.css"
import ReviewList from "./ReviewList"
import ReviewSideBar from "./ReviewSideBar"


export default function ReviewSection({reviews=[],totalReviews,averageRating}) {
  const [selectedRating, setSelectedRating] = useState(null)
  const [showOnlyImages, setShowOnlyImages] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  console.log("all good",totalReviews,averageRating);
  


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
    <div className="review-container">
      <div className="review-layout">
        <ReviewSideBar renderStars={renderStars} setSelectedRating= {setSelectedRating} selectedRating={selectedRating} showOnlyImages={showOnlyImages} setShowOnlyImages={setShowOnlyImages} averageRating={averageRating} totalReviews={totalReviews}  searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <ReviewList reviews={reviews} selectedRating ={selectedRating} searchQuery={searchQuery} showOnlyImages={showOnlyImages} renderStars={renderStars} />
      </div>
    </div>
  )
}

