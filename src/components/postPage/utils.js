import { useState, useEffect } from "react";

const useScrollIntersect = (contents) => {
  contents = contents || [];
  // title h1的開合功能
  const initialIsOpenMap = {};
  contents.forEach((_, index) => {
    initialIsOpenMap[index] = true;
  });
  const [isOpenMap, setIsOpenMap] = useState(initialIsOpenMap);
  const handleH1Open = (index) => {
    setIsOpenMap((isOpenMap) => ({ ...isOpenMap, [index]: !isOpenMap[index] }));
  };
  // title隨捲動頁面之intersect功能
  const [isIntersectingMap, setIsIntersectingMap] = useState();
  useEffect(() => {
    const titles = document.querySelectorAll("h1, h2");
    const initialIsIntersectingMap = {};
    titles.forEach((title) => {
      let titleId = title.id.toLowerCase();
      initialIsIntersectingMap[`#${titleId}`] = false;
    });
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // 將id轉為小寫以跟url匹配
        const titleId = `#${entry.target.id.toLowerCase()}`;
        if (entry.isIntersecting) {
          setIsIntersectingMap((prevIsIntersectingMap) => {
            const prevIsIntersectingMapCopy = { ...prevIsIntersectingMap };
            // 將其他title的碰撞情形都設為false，只有最後碰撞到的title才為true
            const isIntersectingMapKeys = Object.keys(
              prevIsIntersectingMapCopy
            );
            isIntersectingMapKeys.forEach((key) => {
              prevIsIntersectingMapCopy[key] = false;
            });
            return { ...prevIsIntersectingMapCopy, [titleId]: true };
          });
        }
      },
      {
        root: null,
        // rootMargin為目標元素(預設為視窗)的上右下左，可用px或%表示
        rootMargin: "0px 0px -80% 0px",
        threshold: 1,
      }
    );
    titles.forEach((title) => {
      observer.observe(title);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  return { isOpenMap, isIntersectingMap, handleH1Open };
};

const handleScrolltoTitle = (url) => {
  const scrollToTitle = (url) => {
    const title = document.querySelector(`article ${url}`);
    if (title) {
      window.scrollTo({
        top: title.offsetTop - title.offsetHeight,
        behavior: "smooth",
      });
    }
  };
  scrollToTitle(url);
};

export { useScrollIntersect, handleScrolltoTitle };
