import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Dashboard() {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  const handleCreate = () => {
    navigate("/create");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => handleCreate()}>Ajouter</button>
    </div>
  );
}

export default Dashboard;
