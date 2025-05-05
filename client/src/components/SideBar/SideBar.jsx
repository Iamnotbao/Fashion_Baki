import "./SideBar.css";

const SideBar = ({ cat, brand, handleCategoryClick, fetchBrand, selectedSubCat, categoryName, catID }) => {
  console.log("baby", catID);
  
  return (
    <>
      <div className="col-md-2 sidebar">
        <ul className="row">
          <li className="nav">
            <a
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "18px",
                fontWeight: 800,
                textTransform: "uppercase",
              }}
              href=""
            >
              {categoryName}
              <span>
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </a>
          </li>
          {cat &&
            cat.map((c) => (
              <li
                className={`category__items ${selectedSubCat && selectedSubCat.id === c.id ? "active" : ""}`}
                key={c.id}
                onClick={() => {
                  handleCategoryClick(c);
                }}
              >
                <a style={{ textDecoration: "none" }}>{c.name}</a>
              </li>
            ))}
          <li className="nav">
            <a
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "18px",
                fontWeight: 800,
                textTransform: "uppercase",
              }}
              href=""
            >
              Brand
              <span>
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </a>
          </li>
          {brand &&
            brand.map((b) => (
              <li
                className="category__items"
                key={b.id}
                onClick={() => {
                  fetchBrand(b.id);
                }}
              >
                <a>{b.name}</a>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default SideBar;