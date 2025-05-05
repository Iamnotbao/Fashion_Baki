import { Star } from "lucide-react"
const RenderStars = ({rating}) => {
    return (
        <div className="stars-container">
          {[1, 2, 3, 4, 5].map((star) => {
            let starClass = "star";
            if (star <= rating) {
              starClass += " star-filled"; // Full star
            } else if (star - rating <= 0.5) {
              starClass += " star-half"; // Half star
            }
    
            return <Star key={star} className={starClass} />;
          })}
        </div>
      );
}
export default RenderStars;