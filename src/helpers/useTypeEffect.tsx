import { useEffect, useState } from "react";

const useTypeEffect = (baseText: string) => {
  const [text, setText] = useState<string>("");
  const [i, setI] = useState<number>(0);

  useEffect(() => {
    const typeInterval = setInterval(() => {
      if (i < baseText.length) {
        setText(text + baseText[i]);
        setI(i + 1);
      } else {
        clearInterval(typeInterval);
      }
    }, 50);

    return () => {
      clearInterval(typeInterval);
    };
  }, [i, text, baseText]);

  return text;
};
export default useTypeEffect;
