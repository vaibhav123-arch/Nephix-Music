import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [error, setError] = useState("");
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const googleButtonRef = useRef(null);

  useEffect(() => {
    if (window.google && googleButtonRef.current) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (response) => {
          try {
            await googleLogin(response.credential);
            navigate("/");
          } catch{
            setError("Google login failed");
          }
        },
      });
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        width: 300,
      });
    }
  }, [googleLogin, navigate]);

  return (
    <div className="login-page">
      <h2>Welcome</h2>
      {error && <p className="error">{error}</p>}
      <div ref={googleButtonRef} style={{ margin: "1.5rem 0" }} />
    </div>
  );
};

export default Login;