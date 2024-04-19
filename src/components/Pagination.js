import React from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

const Pagination = ({ posts, page, setPage, numOfPagePosts }) => {
  const numOfPosts = posts.length;
  const numOfPages = Math.ceil(numOfPosts / numOfPagePosts);
  const pagesArray = Array.from({ length: numOfPages }, (_, i) => i + 1);
  const handleChangePage = (page) => {
    setPage(page);
  };
  const handleChangePrevPage = () => {
    if (page !== 1) {
      setPage((page) => page - 1);
    }
  };
  const handleChangeNextPage = () => {
    if (page !== numOfPages) {
      setPage((page) => page + 1);
    }
  };
  return (
    <div className="mt-6 flex justify-between items-center max-sm:justify-center">
      <button
        className="prev-next-button max-sm:hidden"
        onClick={handleChangePrevPage}
      >
        <BsArrowLeftShort size={20} />
        Previous
      </button>
      <div className="flex justify-center items-center gap-2 font-semibold">
        {pagesArray.map((_, index) => {
          return (
            <button
              className={`py-1 px-3 rounded-lg ${
                page === index + 1 ? "bg-gray-200" : ""
              }`}
              key={index}
              onClick={() => handleChangePage(index + 1)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      <button
        className="prev-next-button max-sm:hidden"
        onClick={handleChangeNextPage}
      >
        Next
        <BsArrowRightShort size={20} />
      </button>
    </div>
  );
};

export default Pagination;
