import Login from "../components/Login";
import TypingWindow from "../components/TypingWindow";

const page = () => {
  return (
    <div >
      <Login/>
      <div className="flex justify-center mt-25">
      
     <TypingWindow/>
      </div>
      
    </div>
  );
};

export default page;
