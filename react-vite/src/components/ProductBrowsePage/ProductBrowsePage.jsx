import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react";
import { thunkGetAllProducts } from "../../redux/product";
import "./ProductBrowsePage.css"

export default function ProductBrowsePage(){
  const dispatch = useDispatch()
  const allProducts = useSelector(state => state.product.allProducts)

  useEffect(()=>{
    dispatch(thunkGetAllProducts())
  }, [dispatch])

  if (!allProducts) return <span>Loading...</span>
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
              <img src={product.Images.length > 0 ? product.Images.find((image)=> image.is_cover === true).image_url: null} alt="" />
              <div className="details">
                <h4>{product.name}</h4>
                <span>From ${product.price}</span>
              </div>
            </div>)}
        </div>
      </div>
    </div>
  )
}
