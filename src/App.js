import "./App.css";
import Timer from "./FocusedApp/components/Timer";
import { ToDoList } from "./FocusedApp/components/ToDoList";
import { Screen } from "./FocusedApp/Screen";

function App() {
  return (
    <div className="App">
      {/* <Stack />
      <Queue /> */}
      <Screen>
        <Timer />
        <ToDoList />
      </Screen>
    </div>
  );
}

export default App;
