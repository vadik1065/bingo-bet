import { useRef } from "react";
import { toast } from 'react-toastify';
import ToastContent from "../components/ui/toast/ToastContent";

const useNotify = () => {
  const toastId = useRef(null);

  const notify = (props) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast(<ToastContent {...props} />, { toastId: props.message });
    }
  }

  return {
    notify
  }
}

export default useNotify;
