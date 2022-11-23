import SellerMyPage from "./SellerMyPage";
import CreateWriting from "../writing/CreateWriting";
import {cloudServerIP} from "../../App"

const SellerCreateWriting = () => {
  const style0 = {
    marginLeft: "20%",
    marginRight: "20%",
  };
  return (
    <div>
      <SellerMyPage />
      <div style={style0}>
        <CreateWriting />
      </div>
    </div>
  );
};

export default SellerCreateWriting;
