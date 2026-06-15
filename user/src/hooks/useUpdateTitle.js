import { useEffect } from "react";

const useUpdateTitle = (title) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
};

export default useUpdateTitle;
