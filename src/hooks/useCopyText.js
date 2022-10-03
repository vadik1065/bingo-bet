import { useEffect, useState } from "react";

const useCopyText = () => {
  const [isNotSupportCopyText, setNotSupportCopyText] = useState(false);

  useEffect(() => {
    if (!navigator.clipboard) {
      setNotSupportCopyText(true);
    }
  }, []);

  function copyText(text) {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          // console.log(text);
        })
        .catch((err) => {
          console.log("Something went wrong", err);
        });
    }
  }

  return { isNotSupportCopyText, copyText };
};

export default useCopyText;
