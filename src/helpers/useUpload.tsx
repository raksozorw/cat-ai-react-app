import axios from "axios";
import { useCallback, useState } from "react";
import { ModelResponse } from "../components/Uploader";

const useUpload = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ModelResponse | null>(null);
  const [error, setError] = useState<string>("");

  const apiUrl = "http://localhost:5000/predict";

  const reset = () => {
    setResult(null);
    setLoading(false);
    setError("");
  };

  const upload = useCallback(async (image: File | null) => {
    if (image) {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);

      await axios
        .post(apiUrl, formData)
        .then((res) => {
          setLoading(false);
          setResult(res.data);
          console.log(res);
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
          setError(`${err.code} – ${err.message}`);
        });
    } else {
      setError("No image selected");
    }
  }, []);

  return { upload, result, uploadError: error, loading, resetResult: reset };
};
export default useUpload;
