import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailConstraint = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    const newErrors = {}

    if (!email || !emailConstraint.test(email)) newErrors.email = "Please enter a valid email"
    if (!username || username.length < 3) newErrors.username = "Username must be more than 3 characters"
    if (password.length < 8) newErrors.password = "Password field must contain atleast 8 characters"
    if (password !== confirmPassword) newErrors.confirmPassword = "Confirm Password field must be the same as the Password field"

    if(Object.keys(newErrors).length > 0) return setErrors(newErrors)

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="signupModal">
      <h1>Sign Up</h1>
      {errors.server && <p className="signupErrors">{errors.server}</p>}
      <form className='.signupModalForm' onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {errors.email && <p className="signupErrors">{errors.email}</p>}
        <label>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        {errors.username && <p className="signupErrors">{errors.username}</p>}
        <label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {errors.password && <p className="signupErrors">{errors.password}</p>}
        <label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {errors.confirmPassword && <p className="signupErrors">{errors.confirmPassword}</p>}
        <button className='signupBtn'  type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
