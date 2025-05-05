const ReviewSideBar = ({renderStars,setSelectedRating,selectedRating,averageRating,totalReviews,searchQuery,showOnlyImages,setSearchQuery}) => {
    return (
    <div className="review-sidebar">
        <div className="rating-overview">
            <h2 className="section-title">Reviews Product</h2>
            <div className="rating-display">
                <span className="rating-number">{averageRating}</span>
                {renderStars(averageRating)}
            </div>
            <p className="rating-count">Dựa trên {totalReviews} đánh giá từ khách hàng</p>
        </div>

        <div className="filter-section">
            <input
                className="search-input"
                placeholder="Tìm kiếm đánh giá"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select className="sort-select" onChange={(e) => console.log(e.target.value)}>
                <option value="high-to-low">Đánh giá: Cao đến thấp</option>
                <option value="low-to-high">Thấp đến cao</option>
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
            </select>

            <div className="rating-filter">
                <h3 className="filter-title">Phân loại xếp hạng</h3>
                {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                        key={rating}
                        onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                        className={`rating-button ${selectedRating === rating ? "rating-button-selected" : ""}`}
                    >
                        {renderStars(rating)}
                        <span className="rating-label">{rating}</span>
                    </button>
                ))}
            </div>

            <div className="image-filter">
                <h3 className="filter-title">Lọc phản hồi</h3>
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="images"
                        checked={showOnlyImages}
                        onChange={(e) => setShowOnlyImages(e.target.checked)}
                        className="filter-checkbox"
                    />
                    <label htmlFor="images" className="checkbox-label">
                        Chỉ có hình ảnh
                    </label>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ReviewSideBar;