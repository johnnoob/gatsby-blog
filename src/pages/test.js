import React, { useState } from "react";
import { DateRange } from "react-date-range";
// import * as locales from "react-date-range/dist/locale";
import { zhTW } from "date-fns/locale";

function MyCalendar() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const handleDateChange = (item) => {
    console.log(item.selection);
    setState([item.selection]);
  };

  return (
    <DateRange
      editableDateInputs={true}
      onChange={handleDateChange}
      moveRangeOnFirstSelection={false}
      ranges={state}
      locale={zhTW}
    />
  );
}

export default MyCalendar;
