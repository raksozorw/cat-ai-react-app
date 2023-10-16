import "./App.css";
import DownloadSamples from "./components/DownloadSamples";
import Header from "./components/Header";
import Uploader from "./components/Uploader";

function App() {
  return (
    <>
      <Header />
      <Uploader />
      <DownloadSamples />
    </>
  );
}

export default App;
