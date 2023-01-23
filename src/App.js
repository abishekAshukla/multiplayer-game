import Gamepage from "./components/Gamepage";
import Chatpage from "./components/Chatpage";
import "./App.css";

function App() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-[100%] md:w-[50%]">
        <Gamepage />
      </div>
      <div className="w-[100%] md:w-[50%]">
        <Chatpage />
      </div>
    </div>
  );
}

export default App;
