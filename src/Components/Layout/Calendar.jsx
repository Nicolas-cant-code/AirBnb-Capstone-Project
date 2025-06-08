import { set } from "date-fns";
import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Calendar = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      key: "selection",
    },
  ]);

  return (
    <div>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setDateRange([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
        months={width < 700 ? 1 : 2}
        direction="horizontal"
        rangeColors={["#FD5B61"]}
      />
      <p
        onClick={() =>
          setDateRange([
            {
              startDate: new Date(),
              endDate: new Date(),
              key: "selection",
            },
          ])
        }
        className="text-gray-950 cursor-pointer text-right mt-2 underline hover:text-red-500"
      >
        Clear Date
      </p>
    </div>
  );
};

export default Calendar;
