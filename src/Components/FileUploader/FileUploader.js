import "./FileUploader.css";
import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import KeysList from "../KeysList/KeysList";
import LoadingSpinner from "../Loading/LoadingSpinner";

export const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [value, setValue] = useState("");
  const [keys, setKeys] = useState([]);
  const [email, setEmail] = useState("");
  const [option, setOption] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const keyRef = useRef();

  const validTypes = ["pdf", "docx"];

  const onInputChange = (e) => {
    setFiles(e.target.files);
  };

  const addKeyHandler = (e) => {
    if (keys.includes(keyRef.current.value)) {
      toast.error("You Added This Key Word Already", {
        autoClose: 3000,
        position: "top-left",
        theme: "colored",
        hideProgressBar: true,
      });
    } else if (keyRef.current.value.trim().length > 0) {
      setKeys((prevState) => [...prevState, keyRef.current.value]);
    }
    setValue("");
  };

  const ramoveKeyHandler = (key) => {
    setKeys(keys.filter((x) => x !== key));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      if (validTypes.find((x) => files[i].name.includes(x))) {
        data.append("file", files[i]);
      }
    }
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_SERVER}/upload/${keys}/${email}/${option}`,
        data
      )
      .then((res) => {
        setIsLoading(false);
        setKeys([]);
        toast.success("The Filtered CVs Sent To Your Mail", {
          autoClose: 3000,
          position: "top-left",
          theme: "colored",
          hideProgressBar: true,
        });
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(
          typeof err.response.data === "string"
            ? "Something Went Wrong, Please Try Again Later"
            : err.response.data.message || "Please Fill The Form",
          {
            autoClose: 3000,
            position: "top-left",
            theme: "colored",
            hideProgressBar: true,
          }
        );
      });
  };

  return (
    <>
      <form className="form" method="post" id="#" onSubmit={onSubmitHandler}>
        {isLoading && (
          <div className="loading">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && (
          <div className="form-group files">
            <>
              <label>Upload Your Files</label>
              <input
                onChange={onInputChange}
                type="file"
                className="form-control"
                multiple
              />
            </>
          </div>
        )}

        <label className="label" htmlFor="key">
          Add Key Words
        </label>
        <div className="add-keys">
          <input
            value={value}
            ref={keyRef}
            id="key"
            onChange={(e) => setValue(e.target.value)}
          />
          <Button disabled={!value} onClick={addKeyHandler}>
            Add
          </Button>
        </div>
        <ul className="keys">
          {keys.length > 0 && (
            <KeysList list={keys} onDelete={ramoveKeyHandler} />
          )}
        </ul>
        <div className="radio">
          <div>
            <input
              checked={option === "all"}
              type="radio"
              id="all"
              name="fav_language"
              value="all"
              onChange={(e) => setOption(e.target.value)}
            />
            <label htmlFor="all">All</label>
          </div>
          <div>
            <input
              checked={option === "one"}
              type="radio"
              id="one"
              name="fav_language"
              value="one"
              onChange={(e) => setOption(e.target.value)}
            />
            <label htmlFor="one">At Least One</label>
          </div>
        </div>
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input onChange={(e) => setEmail(e.target.value)} id="email" />
        </div>
        <Button
          disabled={!keys.length || !files.length || !email.length}
          type="submit"
          className="btn"
          variant="success"
        >
          Submit
        </Button>
      </form>
    </>
  );
};
