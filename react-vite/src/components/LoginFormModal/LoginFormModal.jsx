import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { Link } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {}

    if(!email) newErrors.email = 'The email you have entered is invalid'
    if(!password || password.length < 8) newErrors.password = 'Password require at least 8 characters'


    if (Object.keys(newErrors).length > 1) return setErrors(newErrors)

      const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    )

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }

  }

  const handleDemoButton = async (e) => {
    e.preventDefault()

    await dispatch(
      thunkLogin({
        email: 'demo@aa.io',
        password: 'password',
      }));
    closeModal();
  }



  return (
    <div className="loginModal">
      <h1>Log In</h1>
          {errors.email && <p className="loginErrors">{errors.email}</p>}
          {errors.password && <p className="loginErrors">{errors.password}</p>}
      <form className='.loginModalForm' onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className='loginBtn' type="submit">Log In</button>
      </form>
        <Link className='loginBtn' onClick={(e)=> {handleDemoButton(e)}}>Demo User</Link>
    </div>
  );
}

export default LoginFormModal;
