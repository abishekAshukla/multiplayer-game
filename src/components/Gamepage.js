import React from "react";

const Gamepage = () => {
  return (
    <div className="bg-gray-100 h-[50vh] md:h-[100vh] flex justify-around items-center flex-col">
        <div className="timer text-red-500">
            <h1 className="text-[50px] md:text-[60px]">9</h1>
        </div>
      <div className="matrix flex flex-col items-center">
        <div className="row-1 flex mb-5">
          <div
            className={`bg-white h-[70px] md:h-[100px] w-[70px] md:w-[100px] rounded-xl mr-5 flex justify-center items-center text-[5em] text-blue-400`}
            id="box-1"
          ></div>
          <div
            className="bg-white md:h-[100px] w-[70px] md:w-[100px] h-[70px] rounded-xl flex justify-center items-center text-[3em] md:text-[5em]  text-blue-400"
            id="box-2"
          >
            X
          </div>
          <div
            className="bg-white md:h-[100px] w-[70px] md:w-[100px] h-[70px] rounded-xl ml-5 flex justify-center items-center text-[3em] md:text-[5em]  text-blue-400"
            id="box-3"
          ></div>
        </div>
        <div className="row-2 flex mb-5">
          <div
            className="bg-white md:h-[100px] w-[70px] md:w-[100px] h-[70px] rounded-xl mr-5 flex justify-center items-center text-[3em] md:text-[5em]  text-blue-400"
            id="box-4"
          ></div>
          <div
            className="bg-white md:h-[100px] w-[70px] md:w-[100px] h-[70px] rounded-xl flex justify-center items-center text-[3em] md:text-[5em]  text-red-400"
            id="box-5"
          >
            O
          </div>
          <div
            className="bg-white md:h-[100px] w-[70px] md:w-[100px] h-[70px] rounded-xl ml-5 flex justify-center items-center text-[3em] md:text-[5em]  text-blue-400"
            id="box-6"
          ></div>
        </div>
        <div className="row-3 flex">
          <div
            className="bg-white md:h-[100px] w-[70px] md:w-[100px] h-[70px] rounded-xl mr-5 flex justify-center items-center text-[3em] md:text-[5em]  text-blue-400"
            id="box-7"
          ></div>
          <div
            className="bg-white md:h-[100px] w-[70px] md:w-[100px] h-[70px] rounded-xl flex justify-center items-center text-[3em] md:text-[5em]  text-blue-400"
            id="box-8"
          ></div>
          <div
            className="bg-white md:h-[100px] w-[70px] md:w-[100px] h-[70px] rounded-xl ml-5 flex justify-center items-center text-[3em] md:text-[5em]  text-blue-400"
            id="box-9"
          ></div>
        </div>
      </div>
      <div className="result text-[30px] md:text-[40px]"><h1>You Won</h1></div>
    </div>
  );
};

export default Gamepage;
