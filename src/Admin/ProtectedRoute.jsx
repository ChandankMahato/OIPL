import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
      if (!user) {
        navigate("/");
      } else if (user.email !== "cmahato2000@gmail.com") {
        navigate("/");
      }
    }, 2000);
    return () => clearTimeout(loadingTimer); // Cleanup the timer if the component unmounts.
  }, [user, navigate]);

  if (loading) {
    return <div style={{paddingTop: '100px'}}>Authenticating Admin...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
