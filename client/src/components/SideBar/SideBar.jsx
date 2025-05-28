import { Link } from "react-router-dom";
import "./SideBar.css";

const SideBar = ({ cat, brand, handleCategoryClick, fetchBrand, selectedSubCat, categoryName, catID,handleToList}) => {
  console.log("baby", catID);
  
  return (
    <>
      <div className="col-md-2 sidebar">
        <ul className="row">
          <li className="nav" onClick={()=>handleToList(catID,categoryName)}>
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "18px",
                fontWeight: 800,
                textTransform: "uppercase",
              }}
              to=""
            >
              {categoryName}
              <span>
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </Link>
          </li>
          {cat &&
            cat.map((c) => (
              <li
                className={`category__items ${selectedSubCat && selectedSubCat.id === c.id ? "active" : ""}`}
                key={c.id}
                onClick={() => {
                  handleCategoryClick(c,catID);
                }}
              >
                <Link>{c.name}</Link>
              </li>
            ))}
          <li className="nav">
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "18px",
                fontWeight: 800,
                textTransform: "uppercase",
              }}
              to=""
            >
              Brand
              <span>
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </Link>
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
                <Link>{b.name}</Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default SideBar;