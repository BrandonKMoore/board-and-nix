import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './DeleteConfirmation.css'

export default function DeleteConfirmation({props}){
  const { closeModal } = useModal();
  const dispatch = useDispatch()
  const instance = props[0]
  const deleteAction = props[1]

  const handleDelete = async () =>{
    await dispatch(deleteAction(instance.id))
    closeModal()
  }

  return (
    <div id="delete-confirmation-container">
      <h2>Delete Product</h2>
      <span >Are you sure you want to delete?</span>
      <div className="selection">
        <button className='delete' onClick={()=> handleDelete()}>Delete</button>
        <button onClick={()=> closeModal()}>Cancel</button>
      </div>
    </div>
  )
}
