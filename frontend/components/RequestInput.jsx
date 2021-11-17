import React, { useEffect, useState } from "react";
import { FaCaretRight, FaCaretDown, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { InformationCircleIcon } from "@heroicons/react/outline";
import * as apiActions from "../store/modules/api";
import * as ctabActions from "../store/modules/ctab";
import * as statActions from "../store/modules/teststat";
import { LightBulbIcon } from "@heroicons/react/solid";

const RequestInput = (props) => {
  const dispatch = useDispatch();
  const ctab = useSelector((state) => state.ctab);
  // console.log(ctab);
  const selector = useSelector((state) => state.api);
  // console.log(selector);
  const uri = useSelector((state) => state.api.request.uri)
  console.log(selector)
  const handleUriChange = (e) => {
    setInputUri(e.target.value);
    dispatch(ctabActions.setCurl(inputUri));
    dispatch(apiActions.setUriState(inputUri));
  };
  const [loopVal, setLoopVal] = useState(0);
  const [threadVal, setThreadVal] = useState(0);

  const { tabs, handleSubmit, url } = props;
  // console.log(selector.request);
  const [inputUri, setInputUri] = useState(ctab.address);
  const [testBtn, setTestBtn] = useState("api");
  const handleThreadChange = (e) => {
    setThreadVal(e.target.value);
  };
  const handleLoopChange = (e) => {
    setLoopVal(e.target.value);
  };
  const clickTestBtn = () => {
    // console.log(testBtn);
    if (testBtn === "api") {
      setTestBtn("load");
      dispatch(statActions.setStat("load"));
    } else {
      setTestBtn("api");
      dispatch(statActions.setStat("api"));
    }
  };
  const [payload, setPayload] = useState("GET");
  // console.log(payload);

  const handlePayload = (e) => {
    setPayload(e.target.value);
  };

  useEffect(() => {
    dispatch(apiActions.setPayloadState(payload));
    dispatch(ctabActions.setHttpMethods(payload));
    dispatch(ctabActions.setCurl(inputUri));
    dispatch(apiActions.setUriState(inputUri));
    dispatch(apiActions.setLoopState(loopVal));
    dispatch(apiActions.setThreadState(threadVal));
  }, [inputUri, payload, loopVal, threadVal]);
  if (ctab !== undefined) {
    return (
      <div className="">
        <div className=" text-gray-500 pb-[10px] border-b border-gray-200  pt-[10px]">
          <div className="flex justify-between">
            <div className="flex mt-1">
              <FaCaretRight className="mt-[1px]" />
              <span className="text-xs font-normal ml-[10px]">
                {ctab.path ? ctab.path : "UNTITLED"}
              </span>
            </div>
            <div className="inline-flex shadow-md">
              <button
                className={
                  testBtn === "load"
                    ? "w-20 h-7  transition-colors duration-1000 bg-gray-200 mr-[-1px] rounded-sm"
                    : "w-20 h-7   transition-colors duration-1000 bg-yellow-400 text-white mr-[-1px] rounded-sm cursor-default"
                }
                onClick={clickTestBtn}
              >
                API
              </button>
              <button
                className={
                  testBtn === "api"
                    ? "w-20 h-7  transition-colors duration-1000 bg-gray-200 mr-[-1px] rounded-sm"
                    : "w-20 h-7   transition-colors duration-1000 bg-yellow-400 text-white mr-[-1px] rounded-sm cursor-default"
                }
                onClick={clickTestBtn}
              >
                LOAD
              </button>
            </div>
          </div>

          <div className={testBtn === "api" ? "hidden" : "mt-3 ml-1"}>
            <hr className="mt-3 mb-3" />
            <div className="mt-2">
              <div className="flex">
                <LightBulbIcon className="h-6 text-yellow-400" />
                <p className="text-sm pt-1 ml-2">
                  쓰레드를 {threadVal}을 {loopVal}번 반복 어쩌구..저쩌구... 하는거에요
                </p>
              </div>
            </div>
            <div className="flex mt-3">
              <div>
                <div className="flex">
                  <p className="mr-3">Thread</p>
                  <div
                    data-tip={`이건 ${threadVal}번 ...?  쓰레드에요`}
                    className="tooltip tooltip-right mb-3"
                  >
                    <InformationCircleIcon className="h-5 mt-[2px]" />
                  </div>
                </div>
                <div className="flex mt-[-10px]">
                  <progress
                    className="progress progress-error w-[400px] mt-4 mr-2"
                    value={threadVal}
                    max="200"
                  />
                  <input
                    type="text"
                    placeholder="25"
                    className="input input-bordered bg-gray-50 h-6 mt-2 w-16 pl-[17px] pt-1"
                    onChange={handleThreadChange}
                  />
                </div>
              </div>
              <div className="ml-16">
                <div className="flex">
                  <p className="mr-3">Loop</p>
                  <div
                    data-tip={`이건 ${loopVal}번 ...?  루프에요`}
                    className="tooltip tooltip-right mb-3"
                  >
                    <InformationCircleIcon className="h-5 mt-[2px]" />
                  </div>
                </div>

                <div className="flex mt-[-10px]">
                  <progress
                    className="progress progress-error w-[400px] mt-4 mr-2"
                    value={loopVal}
                    max="200"
                  />
                  <input
                    type="text"
                    placeholder="25"
                    className="input input-bordered bg-gray-50 h-6 mt-2 w-16 pl-[17px] pt-1"
                    onChange={handleLoopChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex">
            <select
              onChange={handlePayload}
              defaultValue="GET"
              className="bg-gray-50 border border-gray-300 p-[12px] pr-[50px] rounded-sm"
              name="httpMethod"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PATCH">PATCH</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
            <input
              type="text"
              placeholder=""
              value={url}
              className="border-r border-b border-gray-300 bg-gray-50 p-[8px] w-[243px] border-t rounded-sm"
              disabled
            />
            <input
              type="text"
              placeholder="Type Query here !"
              className="border-r border-b border-gray-300 bg-gray-50 p-[8px] w-[722px]  border-t rounded-sm pl-3"
              onKeyUp={handleUriChange}
              value={uri}
            />

            <button
              className="flex bg-blue-500 text-white p-[14px] ml-[8px] rounded pl-[15px] pr-[18px] cursor-pointer text-sm "
              onClick={handleSubmit}
            >
              SEND
              <FaCaretDown className="ml-[10px] mt-[2px]" />
            </button>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default RequestInput;
