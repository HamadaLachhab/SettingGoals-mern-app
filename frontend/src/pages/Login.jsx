import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; // useSelector to select something from the state ,to dspatch function like register
import { FaSignInAlt } from "react-icons/fa";
import { login, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
      dispatch(reset());
    }
  }, [user, isError, isSuccess, navigate, dispatch, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              {" "}
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
