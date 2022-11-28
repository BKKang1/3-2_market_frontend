import { DatePicker, Space } from "antd";
import React, { useState } from "react";
import {cloudServerIP} from "../../App"

const { RangePicker } = DatePicker

function DateChoice(props) {
    const [dates, setDates] = useState(null);
    const [hackValue, setHackValue] = useState(null);
    const [value, setValue] = useState(null);
  
    const onOpenChange = (open) => {
      if (open) {
        setHackValue([null, null]);
        setDates([null, null]);
        //props.setDate(dates);
      } else {
        setHackValue(null);
      }
    };
  
    return (
      <RangePicker
        value={hackValue || value}
        onCalendarChange={(val) => {setDates(val);}}
        onChange={(val) => {setValue(val); props.setDate([val[0].format("YYYY-MM-DD"), val[1].format("YYYY-MM-DD")]);}}
        onOpenChange={onOpenChange}
      ></RangePicker>
    );
  }
  export default DateChoice

