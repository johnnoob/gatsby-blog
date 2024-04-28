import React from "react";
import {
  FaAngleRight,
  FaAngleDown,
  FaBookmark,
  FaXmark,
} from "react-icons/fa6";
import { useScrollIntersect, handleScrolltoTitle } from "./utils";

const NavBarSm = ({ contents, isOpenSideBar, handleOpenSideBar }) => {
  const { isOpenMap, isIntersectingMap, handleH1Open } =
    useScrollIntersect(contents);

  return (
    <aside
      className={`fixed top-0 left-0 w-screen h-screen bg-white z-10 transition-all ${
        isOpenSideBar || "translate-y-full"
      }`}
    >
      <button
        className="absolute top-[5%] right-[10%]"
        onClick={handleOpenSideBar}
      >
        <FaXmark size={40} />
      </button>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3">
        <div className="flex justify-start items-center gap-2">
          <FaBookmark size={25} />
          <h4 className="font-bold text-2xl">內容目錄</h4>
        </div>
        <ul className="flex flex-col text-lg overflow-y-auto h-[500px] pr-5">
          {contents &&
            contents.map((content, index) => {
              const { title: h1, url: h1Url, items: h2s = null } = content;
              return (
                <li key={h1} className="py-1">
                  <div className="flex justify-start items-center gap-2 pb-1">
                    {h2s ? (
                      <button onClick={() => handleH1Open(index)}>
                        {isOpenMap[index] ? (
                          <FaAngleDown size={15} />
                        ) : (
                          <FaAngleRight size={15} />
                        )}
                      </button>
                    ) : (
                      <div className="w-[15px] h-[15px] flex-shrink-0"></div>
                    )}
                    <button
                      className={`text-left ${
                        isIntersectingMap && isIntersectingMap[h1Url]
                          ? "text-blue-300"
                          : "text-black"
                      }`}
                      onClick={() => {
                        handleScrolltoTitle(h1Url);
                        handleOpenSideBar();
                      }}
                    >
                      {h1}
                    </button>
                  </div>
                  {h2s && (
                    <ul>
                      {h2s.map(({ title: h2, url: h2Url }) => {
                        return (
                          <li
                            key={h2}
                            className={`${isOpenMap[index] ? "" : "hidden"} ${
                              isIntersectingMap && isIntersectingMap[h2Url]
                                ? "text-blue-300 border-blue-300"
                                : "text-gray-p border-slate-300"
                            } ml-[7px] pl-[16px] py-[2px] border-l-[1px] `}
                          >
                            <button
                              className="text-left"
                              onClick={() => {
                                handleScrolltoTitle(h2Url);
                                handleOpenSideBar();
                              }}
                            >
                              {h2}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </aside>
  );
};

export default NavBarSm;
