import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import "./ManageProduct.css"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation"
import { thunkRemoveProductById } from "../../redux/product"
import { useEffect } from "react"

export default function ManageProduct(){
  const user = useSelector(state => state.session.user)
  let allProductsObj = useSelector(state => state.product.allProducts)
  if (!allProductsObj) return

  useEffect(()=>{
    thunkRemoveProductById
  }, [thunkRemoveProductById])

  const userProducts = Object.values(allProductsObj).filter(product => product.user_id == user.id).sort((a , b)=> new Date(b.created_at) - new Date(a.created_at))
  console.log(userProducts)
  if (!userProducts) return null
  return (
    <div className="manage-product-list">
      {userProducts.map((product)=>
      <div className="product-card" key={product.id}>
        <Link to={`/products/${product.id}`}>
          <img src={product.Images.length > 0 ? product.Images.find((image)=> image.is_cover === true).image_url: null} alt="" />
        </Link>
        <div className="details">
          <Link to={`/products/${product.id}`}><h4>{product.name}</h4></Link>
          <span>From ${product.price}</span>
        </div>
        <div>
          <button onClick={()=> <DeleteConfirmation />}>Edit</button>
          <OpenModalButton
            modalComponent={<DeleteConfirmation props={[product, thunkRemoveProductById]}/>}
            buttonText='Delete'
          />
        </div>
      </div>)}
    </div>
  )
}
