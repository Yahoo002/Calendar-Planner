import "./App.css";
import { Fragment } from "react";

//components
import InputTodo from "./Components/InputTodo";
import ListTodo from "./Components/ListTodo";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodo />
      </div>
    </Fragment>
  );
}

export default App;
