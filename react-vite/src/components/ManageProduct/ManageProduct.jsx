import ProductFormModal from "../ProductFormModal"
import DeleteConfirmation from "../DeleteConfirmation"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import { thunkRemoveProductById } from "../../redux/product"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import "./ManageProduct.css"

export default function ManageProduct(){
  const user = useSelector(state => state.session.user)
  let allProductsObj = useSelector(state => state.product.allProducts)
  if (!allProductsObj) return

  const userProducts = Object.values(allProductsObj).filter(product => product.user_id == user.id).sort((a , b)=> new Date(b.created_at) - new Date(a.created_at))
  if (!userProducts) return null
  return (
    <div className="manage-product-list">
      {userProducts?.length > 0 ?
      <>
        {userProducts.map((product)=>
        <div className="product-card" key={product.id}>
          <div className="manage-products">
            <Link to={`/products/${product.id}`}>
              <img src={product.Images.length > 0 ? product.Images.find((image)=> image.is_cover === true).image_url: null} alt="" />
            </Link>
            <div className="details">
              <Link to={`/products/${product.id}`}><h4>{product.name}</h4></Link>
              <span>From ${product.price}</span>
            </div>
          </div>
          <div className="manage-buttons">
            <OpenModalButton
              modalComponent={<ProductFormModal props={product}/>}
              buttonText='Edit'
            />
            <OpenModalButton
              modalComponent={<DeleteConfirmation props={[product, thunkRemoveProductById]}/>}
              buttonText='Delete'
            />
          </div>
        </div>)}
      </>
      : <div className="info"> <span>No product was created by you yet.</span><span>What's a better time than now!</span><span>Click on create product to get started.</span></div>}
    </div>
  )
}
