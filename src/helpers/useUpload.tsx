import axios, { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { ModelResponse } from "../components/Uploader";

const useUpload = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ModelResponse | null>(null);
  const [error, setError] = useState<string>("");

  // use local server (Docker image connection will never work on BAI MacBook)
  const apiUrl = "http://localhost:80/predict";

  // use live server
  // const apiUrl = "http://18.132.1.109/predict";

  const clearResult = () => {
    setResult(null);
    setLoading(false);
    setError("");
  };

  const upload = useCallback(async (image: File | null) => {
    if (image) {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);

      try {
        const response = await axios.post(apiUrl, formData);
        setLoading(false);
        if (response.data.prediction) {
          setResult(response.data);
        } else {
          setError("Something went wrong – the image could not be processed.");
        }
        console.log(response);
      } catch (error) {
        const axiosErr = error as AxiosError;

        setLoading(false);
        console.error(error);
        setResult(null);
        setError(`${axiosErr.code} – ${axiosErr.message}`);
      }
    } else {
      setError("No image selected");
    }
  }, []);

  return { upload, result, uploadError: error, loading, clearResult };
};
export default useUpload;
