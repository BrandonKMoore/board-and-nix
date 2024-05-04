import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./ProductBrowsePage.css"

export default function ProductBrowsePage(){
  const allProductsObj = useSelector(state => state.product.allProducts)
  if (!allProductsObj) return

  const allProducts = Object.values(allProductsObj).sort((a , b)=> new Date(b.created_at) - new Date(a.created_at))
  return(
    <div className="productBrowserPage">
      <div className="hero">
        <div className="overlay">
          <div className="content">
            <h1>Furniture Collection</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="product-card-list">
          {allProducts.map((product)=>
            <div className="product-card" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img src={product.Images.length > 0 ? product.Images.find((image)=> image.is_cover === true).image_url: null} alt="" />
              </Link>
              <div className="details">
                <Link to={`/products/${product.id}`}><h4>{product.name}</h4></Link>
                <span>From ${product.price}</span>
              </div>
            </div>)}
        </div>
      </div>
    </div>
  )
}
