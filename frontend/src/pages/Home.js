import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTodos, resetError } from "../features/todoSlice";
import ErrorModal from "../components/ErrorModal";
import LoadingComponent from "../components/LoadingComponent";
import TodoCard from "../components/TodoCard";

export default function Home() {
  const dispatch = useDispatch();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    const fetchTodos = () => {
      dispatch(getTodos());
    };

    fetchTodos(); // Initial fetch
    const timeID = setInterval(fetchTodos, 10000);

    return () => {
      clearInterval(timeID);
    };
  }, [dispatch]);

  const { loading, error, todo } = useSelector((state) => state.todo);

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
    dispatch(resetError());
  };

  return (
    <>
      {error && <ErrorModal error={error} onClose={handleCloseErrorModal} />}
      {loading && <LoadingComponent />}
      <div className="flex flex-col gap-10 mt-10 mb-10">
        <h1 className="text-5xl text-center">Todos to Complete</h1>
        <div className="grid gird-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {todo?.length > 0 ? (
            todo.map((item) => (
              <TodoCard
                key={item.id}
                title={item.title}
                description={item.description}
                id={item.id}
                completed={item.completed}
                author={item.user.username}
              />
            ))
          ) : (
            <div>No todos found!</div>
          )}
        </div>
      </div>
    </>
  );
}
