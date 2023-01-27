import React from "react";
import { useEffect, useState } from "react";
import Timer from "./Timer";
import { AppState } from "../Context/Context";
import io from "socket.io-client";
import { wait } from "@testing-library/user-event/dist/utils";

const ENDPOINT = "http://localhost:5000";
var socket;
var room = "room2";

const Gamepage = () => {
  const [myChance, setMyChance] = useState(false);
  const [winner, setWinner] = useState("");
  const [lastClick, setLastClick] = useState("no one");
  const [roomJoined, setRoomJoined] = useState(false);
  const [post1, setPost1] = useState("");
  const [post2, setPost2] = useState("");
  const [post3, setPost3] = useState("");
  const [post4, setPost4] = useState("");
  const [post5, setPost5] = useState("");
  const [post6, setPost6] = useState("");
  const [post7, setPost7] = useState("");
  const [post8, setPost8] = useState("");
  const [post9, setPost9] = useState("");
  const {
    userName,
    setUserName,
    userId,
    setUserId,
    setSocketConnected,
    socketConnected,
    setRestartTime,
    currentTime,
  } = AppState();

  useEffect(() => {
    setUserName(localStorage.getItem("name"));
    wait(100);
    socket = io(ENDPOINT);
    socket.emit("setup", "user1");
    socket.on("connected", () => setSocketConnected(true));
    socket.on("joined successfully", (data) => {
      setUserId(data);
      setRoomJoined(true);
      if (data === "X") {
        setMyChance(true);
      }
    });
    socket.on("typing", (postitionAndVal) => {
      const updateMatrix = () => {
        eval(`setPost${postitionAndVal.position}('${postitionAndVal.value}')`);
        setLastClick(postitionAndVal.value);
        if (postitionAndVal.value !== userId && postitionAndVal.value !== "N") {
          setMyChance(true);
        }
      };
      updateMatrix();
    });
    socket.on("winner decided", (data) => {
      setWinner(data);
      console.log("winner decided other");
    });

    // eslint-disable-next-line
  }, []);

  // identify winning situations and winner
  useEffect(() => {
    console.log("clicked");
    // below line make sure's that timer restarts after a click on matrix
    setRestartTime(true);

    // Conditions when any user
    if (post1 === post2 && post2 === post3 && post1 !== "") {
      console.log("same");
      if (post1 === userId) {
        console.log(userName);
        setWinner(userName);
        socket.emit("winner", { room: room, winnerName: userName });
      }
    } else if (post4 === post5 && post5 === post6 && post4 !== "") {
      console.log("same");
      if (post4 === userId) {
        console.log(userName);
        setWinner(userName);
        socket.emit("winner", { room: room, winnerName: userName });
      }
    } else if (post7 === post8 && post8 === post9 && post7 !== "") {
      console.log("same");
      if (post7 === userId) {
        console.log(userName);
        setWinner(userName);
        socket.emit("winner", { room: room, winnerName: userName });
      }
    } else if (post1 === post4 && post4 === post7 && post1 !== "") {
      console.log("same");
      if (post1 === userId) {
        console.log(userName);
        setWinner(userName);
        socket.emit("winner", { room: room, winnerName: userName });
      }
    } else if (post2 === post5 && post5 === post8 && post2 !== "") {
      console.log("same");
      if (post2 === userId) {
        console.log(userName);
        setWinner(userName);
        socket.emit("winner", { room: room, winnerName: userName });
      }
    } else if (post3 === post6 && post6 === post9 && post3 !== "") {
      console.log("same");
      if (post3 === userId) {
        console.log(userName);
        setWinner(userName);
        socket.emit("winner", { room: room, winnerName: userName });
      }
    } else if (post1 === post5 && post5 === post9 && post1 !== "") {
      console.log("same");
      if (post1 === userId) {
        console.log(userName);
        setWinner(userName);
        socket.emit("winner", { room: room, winnerName: userName });
      }
    } else if (post3 === post5 && post5 === post7 && post3 !== "") {
      console.log("same");
      if (post3 === userId) {
        console.log(userName);
        setWinner(userName);
        socket.emit("winner", { room: room, winnerName: userName });
      }
    }
  }, [post1, post2, post3, post4, post5, post6, post7, post8, post9]);

  // update matrix after win
  useEffect(() => {
    if (winner !== "") {
      setTimeout(() => {
        for (let i = 1; i <= 9; i++) {
          const updateMatrixAfterWin = () => {
            eval(`setPost${i}("")`);
          };
          updateMatrixAfterWin();
        }
        setRestartTime(true);
        setWinner("");
        setLastClick("no one");
        setRestartTime(false);
      }, 3000);
    }
  }, [winner]);

  // When timer becomes '0'
  useEffect(() => {
    if (currentTime === "00") {
      if (lastClick === "no one") {
        setWinner("no one");
        socket.emit("winner", { room: room, winnerName: "no one" });
        setRestartTime(true);
        // setWinner("");
      }
      if (lastClick === userId) {
        setWinner(userName);
        socket.emit("winner", { room: room, winnerName: userName });
        setRestartTime(true);
      }
    }
  }, [currentTime]);

  return (
    <div className="bg-gray-100 h-[50vh] md:h-[100vh] flex justify-around items-center flex-col">
      <div style={roomJoined?{visibility:'visible'}:{visibility:'hidden'}} className="timer text-red-500">
        <Timer />
      </div>
      <div className="matrix flex flex-col items-center">
        <div className="row-1 flex mb-5">
          <div
            className={`bg-white h-[70px] md:h-[100px] w-[70px] md:w-[100px] rounded-xl mr-5 flex justify-center items-center text-[3em] md:text-[5em]  text-${
              post1 === "X" ? "red" : "blue"
            }-400`}
            id="box-1"
            onClick={() => {
              if (myChance === true && userId !== "N" && post1 === "") {
                socket.emit("typing", {
                  room: room,
                  name: userName,
                  position: "1",
                });
                setPost1(userId);
                setLastClick(userId);
                setMyChance(false);
              }
            }}
          >
            {post1}
          </div>
          <div
            className={`bg-white h-[70px] md:h-[100px] w-[70px] md:w-[100px] rounded-xl mr-5 flex justify-center items-center text-[3em] md:text-[5em]  text-${
              post2 === "X" ? "red" : "blue"
            }-400`}
            id="box-2"
            onClick={() => {
              if (myChance === true && userId !== "N" && post2 === "") {
                socket.emit("typing", {
                  room: room,
                  name: userName,
                  position: "2",
                });
                setPost2(userId);
                setLastClick(userId);
                setMyChance(false);
              }
            }}
          >
            {post2}
          </div>
          <div
            className={`bg-white h-[70px] md:h-[100px] w-[70px] md:w-[100px] rounded-xl mr-5 flex justify-center items-center text-[3em] md:text-[5em]  text-${
              post3 === "X" ? "red" : "blue"
            }-400`}
            id="box-3"
            onClick={() => {
              if (myChance === true && userId !== "N" && post3 === "") {
                socket.emit("typing", {
                  room: room,
                  name: userName,
                  position: "3",
                });
                setPost3(userId);
                setLastClick(userId);
                setMyChance(false);
              }
            }}
          >
            {post3}
          </div>
        </div>
        <div className="row-2 flex mb-5">
          <div
            className={`bg-white h-[70px] md:h-[100px] w-[70px] md:w-[100px] rounded-xl mr-5 flex justify-center items-center text-[3em] md:text-[5em]  text-${
              post4 === "X" ? "red" : "blue"
            }-400`}
            id="box-4"
            onClick={() => {
              if (myChance === true && userId !== "N" && post4 === "") {
                socket.emit("typing", {
                  room: room,
                  name: userName,
                  position: "4",
                });
                setPost4(userId);
                setLastClick(userId);
                setMyChance(false);
              }
            }}
          >
            {post4}
          </div>
          <div
            className={`bg-white h-[70px] md:h-[100px] w-[70px] md:w-[100px] rounded-xl mr-5 flex justify-center items-center text-[3em] md:text-[5em]  text-${
              post5 === "X" ? "red" : "blue"
            }-400`}
            id="box-5"
            onClick={() => {
              if (myChance === true && userId !== "N" && post5 === "") {
                socket.emit("typing", {
                  room: room,
                  name: userName,
                  position: "5",
                });
                setPost5(userId);
                setLastClick(userId);
                setMyChance(false);
              }
            }}
          >
            {post5}
          </div>
          <div
            className={`bg-white h-[70px] md:h-[100px] w-[70px] md:w-[100px] rounded-xl mr-5 flex justify-center items-center text-[3em] md:text-[5em]  text-${
              post6 === "X" ? "red" : "blue"
            }-400`}
            id="box-6"
            onClick={() => {
              if (myChance === true && userId !== "N" && post6 === "") {
                socket.emit("typing", {
                  room: room,
                  name: userName,
                  position: "6",
                });
                setPost6(userId);
                setLastClick(userId);
                setMyChance(false);
              }
            }}
          >
            {post6}
          </div>
        </div>
        <div className="row-3 flex">
          <div
            className={`bg-white h-[70px] md:h-[100px] w-[70px] md:w-[100px] rounded-xl mr-5 flex justify-center items-center text-[3em] md:text-[5em]  text-${
              post7 === "X" ? "red" : "blue"
            }-400`}
            id="box-7"
            onClick={() => {
              if (myChance === true && userId !== "N" && post7 === "") {
                socket.emit("typing", {
                  room: room,
                  name: userName,
                  position: "7",
                });
                setPost7(userId);
                setLastClick(userId);
                setMyChance(false);
              }
            }}
          >
            {post7}
          </div>
          <div
            className={`bg-white h-[70px] md:h-[100px] w-[70px] md:w-[100px] rounded-xl mr-5 flex justify-center items-center text-[3em] md:text-[5em]  text-${
              post8 === "X" ? "red" : "blue"
            }-400`}
            id="box-8"
            onClick={() => {
              if (myChance === true && userId !== "N" && post8 === "") {
                socket.emit("typing", {
                  room: room,
                  name: userName,
                  position: "8",
                });
                setPost8(userId);
                setLastClick(userId);
                setMyChance(false);
              }
            }}
          >
            {post8}
          </div>
          <div
            className={`bg-white h-[70px] md:h-[100px] w-[70px] md:w-[100px] rounded-xl mr-5 flex justify-center items-center text-[3em] md:text-[5em]  text-${
              post9 === "X" ? "red" : "blue"
            }-400`}
            id="box-9"
            onClick={() => {
              if (myChance === true && userId !== "N" && post9 === "") {
                socket.emit("typing", {
                  room: room,
                  name: userName,
                  position: "9",
                });
                setPost9(userId);
                setLastClick(userId);
                setMyChance(false);
              }
            }}
          >
            {post9}
          </div>
        </div>
      </div>
      <div className="result text-[30px] md:text-[40px]">
        <h1>{winner} Won</h1>
      </div>
      <div>
        {/* <div>
          <h1>{"Connected: " + socketConnected}</h1>
        </div> */}
        <div>
          <button
            className="bg-red-300"
            onClick={() => {
              socket.emit("join chat", { room: "room2", name: userName });
            }}
          >
            Join Chat
          </button>
        </div>
        {/* <button
          className="bg-green-500"
          onClick={() => {
            socket.emit("typing", {
              room: "room2",
              name: userName,
              position: "6",
            });
          }}
        >
          Typing
        </button> */}
        {/* <h1>{"position and value: " + postAndVal}</h1> */}
        {/* <p>{userId}</p> */}
      </div>
    </div>
  );
};

export default Gamepage;
