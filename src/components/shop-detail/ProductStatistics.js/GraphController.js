import YearlyPriceInquiry from "./YearlyPriceInquiry";
import MonthlyPriceInquiry from "./MonthlyPriceInquiry";
import DailyPriceInquiry from "./DailyPriceInquiry";
import {cloudServerIP} from "../../../App"

function GraphController({value, kindGradeId}) {
  if (value === 1) {
    return <YearlyPriceInquiry kindGradeId={kindGradeId}></YearlyPriceInquiry>;
  } else if (value === 2) {
    return (
      <MonthlyPriceInquiry kindGradeId={kindGradeId}></MonthlyPriceInquiry>
    );
  } else if (value === 3) {
    return <DailyPriceInquiry kindGradeId={kindGradeId}></DailyPriceInquiry>;
  }
}
export default GraphController;
