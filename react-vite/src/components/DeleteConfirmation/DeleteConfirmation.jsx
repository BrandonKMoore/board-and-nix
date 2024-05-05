import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";


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
    <div>
      <span >Are you sure you want to delete?</span>
      <div>
        <button onClick={()=> handleDelete()}>Delete</button>
        <button onClick={()=> closeModal()}>Cancel</button>
      </div>
    </div>
  )
}
