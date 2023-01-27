import React, { useState, useRef, useEffect } from "react";
import { AppState} from "../Context/Context";

const Timer = () => {
  const { restartTime, setRestartTime, setCurrentTime  } = AppState();
  const Ref = useRef(null);
  const [timer, setTimer] = useState("10");
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor(((total / 1000) * 60 * 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };
  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(seconds > 9 ? seconds : "0" + seconds);
      setCurrentTime(seconds > 9 ? seconds : "0" + seconds);
    }
  };
  const clearTimer = (e) => {
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };
  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
  };
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);
  const onClickReset = () => {
    clearTimer(getDeadTime());
  };
  useEffect(() => {
    if (restartTime == true) {
      onClickReset();
      setRestartTime(false);
    }
  }, [restartTime]);

  return <h1 className="text-[50px] md:text-[60px]">{timer}</h1>;
};

export default Timer;
