import React from "react";
import { FaAngleRight, FaAngleDown, FaBookmark } from "react-icons/fa6";
import { useScrollIntersect, handleScrolltoTitle } from "./utils";

const NavBarLg = ({ contents }) => {
  const { isOpenMap, isIntersectingMap, handleH1Open } =
    useScrollIntersect(contents);

  return (
    <aside className="sticky w-[210px] top-[100px] float-start max-xl:hidden group">
      <div className="h-[570px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-transparent  scrollbar-track-transparent scrollbar-thumb-rounded-full group-hover:scrollbar-thumb-gray-300">
        <div className="flex mb-4">
          <div className="flex justify-start items-center gap-2">
            <FaBookmark size={18} />
            <h4 className="font-bold text-lg">內容目錄</h4>
          </div>
        </div>
        <ul className="flex flex-col">
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
                      onClick={() => handleScrolltoTitle(h1Url)}
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
                              href={h2Url}
                              onClick={() => handleScrolltoTitle(h2Url)}
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

export default NavBarLg;
