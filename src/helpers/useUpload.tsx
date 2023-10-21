import axios, { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { ModelResponse } from "../components/Uploader";

const useUpload = () => {
  const [loading, setLoading] = useState(false);
  // move model response to a types file???
  const [result, setResult] = useState<ModelResponse | null>(null);
  const [error, setError] = useState<string>("");

  // use local server (this will never work on BAI MacbBook)
  const apiUrl = "http://localhost:80/predict";

  // use live server
  // const apiUrl = "https://13.40.143.21/predict";

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
