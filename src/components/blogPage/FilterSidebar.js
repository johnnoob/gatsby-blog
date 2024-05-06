import React from "react";
import { AreaSelectButton, AreaBlock } from "./index";
import { FaArrowRotateRight, FaMagnifyingGlass } from "react-icons/fa6";

const FilterSidebar = ({
  area,
  targetCategories,
  targetSubcategories,
  targetTags,
  handleFilterArea,
  handleReset,
  handleAreaOptionsByInput,
  notFoundCategories,
  notFoundSubcategories,
  notFoundTags,
  categoryOptions,
  subcategoryOptions,
  tagOptions,
  handleCategorySelect,
  handleSubcategorySelect,
  handleTagSelect,
}) => {
  const filterAreaToStrMap = {
    category: "類別",
    subcategory: "子類別",
    tags: "標籤",
  };
  return (
    <aside className="shrink-0 w-[300px] p-3 border-[1px] rounded-lg max-lg:hidden">
      <h2 className="text-lg font-semibold mb-2">篩選內容</h2>
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <AreaSelectButton
          area={area}
          label="category"
          labelName="類別"
          targetOptions={targetCategories}
          handleFilterArea={handleFilterArea}
        />
        <AreaSelectButton
          area={area}
          label="subcategory"
          labelName="子類別"
          targetOptions={targetSubcategories}
          handleFilterArea={handleFilterArea}
        />
        <AreaSelectButton
          area={area}
          label="tags"
          labelName="標籤"
          targetOptions={targetTags}
          handleFilterArea={handleFilterArea}
        />
      </div>
      <hr className="mb-3" />
      <div className="mb-3 flex items-center gap-2">
        <button
          className="bg-gray-200 flex justify-center items-center gap-2 px-2 py-1 rounded-2xl text-sm shrink-0"
          onClick={() => handleReset(area)}
        >
          <FaArrowRotateRight />
          <p>重置{filterAreaToStrMap[area]}</p>
        </button>
        <div className="relative text-sm">
          <FaMagnifyingGlass className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-300" />
          <input
            type="text"
            className="focus:outline-none ring-0 bg-transparent pl-6 pr-2 border-[1px] rounded-full py-1 max-w-[160px]"
            onChange={(e) => handleAreaOptionsByInput(e, area)}
            placeholder={`以名稱過濾${filterAreaToStrMap[area]}`}
          />
        </div>
      </div>
      <hr className="mb-3" />
      <AreaBlock
        area={area}
        label="category"
        targetOptions={targetCategories}
        options={categoryOptions}
        notFoundOptions={notFoundCategories}
        handleAreaSelect={handleCategorySelect}
      />
      <AreaBlock
        area={area}
        label="subcategory"
        targetOptions={targetSubcategories}
        options={subcategoryOptions}
        notFoundOptions={notFoundSubcategories}
        handleAreaSelect={handleSubcategorySelect}
      />
      <AreaBlock
        area={area}
        label="tags"
        targetOptions={targetTags}
        options={tagOptions}
        notFoundOptions={notFoundTags}
        handleAreaSelect={handleTagSelect}
      />
    </aside>
  );
};

export default FilterSidebar;
