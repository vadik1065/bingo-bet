import { ReactComponent as Cross } from "../../images/cross.svg";

import "../../css/ui/css/RotateClose.css";
//
const RotateClose = (props) => {
  return (
    <span
      className="absolute-close-modal-rotate flex"
      onClick={() => {
        setTimeout(() => props.close(), 50);
      }}
    >
      <Cross />
    </span>
  );
};

export default RotateClose;
