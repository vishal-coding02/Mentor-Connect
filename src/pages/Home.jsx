import MentorHome from "./MentorHomePage";
import StudentHomePage from "./StudentHomePage";
import { useSelector } from "react-redux";

const Home = () => {
  const { userType } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      {userType === "mentor" ? <MentorHome /> : <StudentHomePage />}
    </div>
  );
};

export default Home;
