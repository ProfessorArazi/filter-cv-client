import "./App.css";
import { FileUploader } from "./Components/FileUploader/FileUploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <FileUploader />
      <ToastContainer />
    </div>
  );
}

export default App;
