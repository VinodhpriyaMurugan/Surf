import { useEffect, useState } from "react";

const UserLogout = (startTime) => {
    
  const [timer, setTimer] = useState(startTime);
  useEffect(() => {
    const myInterval = setInterval(() => {
        console.log("Set interval")
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 30000);
    const resetTimeout = () => {
      setTimer(startTime);
    };
    const events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress"
    ];
    for (let i in events) {
      window.addEventListener(events[i], resetTimeout);
    }
    return () => {
      clearInterval(myInterval);
      for (let i in events) {
        window.removeEventListener(events[i], resetTimeout);
      }
    };
  });
  return timer;
};

export default UserLogout;
