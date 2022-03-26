import "./App.css";
import { useEffect } from "react";
import { FileUploader } from "./Components/FileUploader/FileUploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

/*
todo:
1.add some explanation
*/

function App() {
  useEffect(() => {
    axios(process.env.REACT_APP_SERVER);
  }, []);

  return (
    <div className="App">
      <FileUploader />
      <ToastContainer />
    </div>
  );
}

export default App;
