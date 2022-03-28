import { useNavigate } from "react-router-dom";

const Signin = () => {
  let navigate = useNavigate();
  return (
    <>
      <div>
        <button onClick={() => navigate('/courses')}>Signin</button>
      </div>
    </>
  );
}

export default Signin;
