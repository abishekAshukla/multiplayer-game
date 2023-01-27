import { useState, useEffect } from "react";
import Gamepage from "./components/Gamepage";
import Chatpage from "./components/Chatpage";
import { AppState } from "./Context/Context";
import "./App.css";

function App() {
  const { setMatrix, } = AppState();
  const [isTyping, setIsTyping] = useState(false);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-[100%] md:w-[50%]">
        <Gamepage />
      </div>
      {/* <div className="w-[100%] md:w-[50%]">
        <Chatpage />
      </div> */}
    </div>
  );
}

export default App;
