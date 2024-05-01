import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import './ProductForm.css'

export default function ProductFormModal(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [dimension_l, setDimension_l] = useState("")
  const [dimension_w, setDimension_w] = useState("")
  const [dimension_h, setDimension_h] = useState("")
  const [customizable, setCustomizable] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const [imageIsCover, setImageIsCover] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newError = {}

    if (name.length < 3) newError.name = 'Name has to be longer than 3 characters'
    if (!price) newError.price = 'Please enter the price (format: $xxx.xx)'
    if (description.length < 100) newError.description = 'Description has to be longer than 100 characters'
    if (!dimension_l || !dimension_w || !dimension_h) {
      let dimensionError = 'Please enter a'
      if (!dimension_l) dimensionError += ' length'
      if (!dimension_w) dimensionError += ' width'
      if (!dimension_h) dimensionError += ' height'
      newError.dimension = dimensionError
    }
    // if (!imageUrl) newError.imageUrl = 'At least one Image is needed for product to be added'

    console.log(newError)

    if (Object.entries(newError).length > 0) return setErrors(newError)
  }


  return (
    <div className="newProductForm">
      <h1>New Product Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder=" Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {errors.name && <p>{errors.name}</p>}
        <label>
          <input
            type="number"
            step=".01"
            placeholder=" Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            />
        </label>
        {errors.price && <p>{errors.price}</p>}
        <div className="dimensions">
          <span>Dimensions: </span>
          <label>
            <input
              type="number"
              step=".01"
              placeholder=" Length"
              value={dimension_l}
              onChange={(e) => setDimension_l(e.target.value)}
              />
          </label>
          <span>in x</span>
          <label>
            <input
              type="number"
              step=".01"
              placeholder=" Width"
              value={dimension_w}
              onChange={(e) => setDimension_w(e.target.value)}
              />
          </label>
          <span>in x</span>
          <label>
            <input
              type="number"
              step=".01"
              placeholder=" Height"
              value={dimension_h}
              onChange={(e) => setDimension_h(e.target.value)}
              />
          </label>
          <span>in</span>
        </div>
        {errors.dimension && <p>{errors.dimension}</p>}

        <div className="customizable">
          <span>Customizable: </span>
          <label>
            <input
              type="radio"
              value={true}
              name="customizable"
              onChange={(e) => setCustomizable(e.target.value)}
            />
            True
          </label>
          <label >
            <input
              type="radio"
              value={false}
              name="customizable"
              defaultChecked={true}
              onChange={(e) => setCustomizable(e.target.value)}
            />
            False
          </label>
        </div>
        {errors.customizable && <p>{errors.customizable}</p>}
        <label>
          <textarea cols={50} rows={10}
            type="text"
            placeholder=" Enter Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        {errors.description && <p>{errors.description}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
