import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../features/user";
import { useNavigate } from "react-router-dom";

function Login() {
  const user = useSelector((state) => state.user.value);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(userActions.login({ email, password }));
  };

  return (
    <div>
      <form>
        <label>
          Email:
          <input
            type={"text"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          Password:
          <input
            type={"text"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <button
          onClick={(e) => {
            handleLogin(e);
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
