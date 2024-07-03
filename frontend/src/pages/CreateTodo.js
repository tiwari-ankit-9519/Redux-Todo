import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTodo, resetError } from "../features/todoSlice";

import ErrorModal from "../components/ErrorModal";
import LoadingComponent from "../components/LoadingComponent";

export default function CreateTodo() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const titleInputRef = useRef("");
  const descriptionInputRef = useRef("");

  const { error } = useSelector((state) => state.todo);

  function handleClick(e) {
    e.preventDefault();
    const newFormData = {
      title: titleInputRef.current.value,
      description: descriptionInputRef.current.value,
    };
    dispatch(createTodo(newFormData))
      .unwrap()
      .then((token) => {
        setIsLoading(true);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsErrorModalOpen(true);
        console.error(error);
      });

    setFormData(newFormData);
  }

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
    dispatch(resetError());
  };
  return (
    <>
      {isErrorModalOpen && (
        <ErrorModal error={error} onClose={handleCloseErrorModal} />
      )}
      {isLoading && <LoadingComponent />}
      <div className="flex flex-col justify-center items-center mx-5 mt-36">
        <h1 className="text-5xl">Create Todo</h1>
        <form
          onSubmit={handleClick}
          className="flex flex-col w-full sm:w-2/3 md:w-2/3 lg:w-2/3"
        >
          <label type="text" className="font-semibold mt-5">
            Title
          </label>
          <input
            type="text"
            className="py-2 px-4 focus: outline-none border-gray-400 border rounded text-black"
            ref={titleInputRef}
          />
          <label type="text" className="font-semibold mt-5">
            Description
          </label>
          <textarea
            className="py-2 px-4 focus: outline-none border-gray-400 border rounded text-black"
            ref={descriptionInputRef}
          />
          <button className="p-2 w-full bg-green-500 font-semibold rounded text-white mt-5">
            Create Todo
          </button>
        </form>
      </div>
    </>
  );
}
