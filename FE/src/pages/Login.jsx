import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "../features/users/userSlice";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error, message } = useSelector((state) => state.users);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let result = await dispatch(loginUser(formData)).unwrap();
      toast.success(result.message);
      setFormData({ email: "", password: "" });
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h1>Login to get more opportunities</h1>
        <h4>
          Right opportunity is waiting for you.{" "}
          <Link to="/register">Join Today</Link>
        </h4>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="abc@example.com"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="abc@123"
            required
            autoComplete="off"
          />

          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Logging in..." : "Login"}
          </button>

          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};
