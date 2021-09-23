import NavBar from "./widgets/NavBar";
import Carousal from "./widgets/Carousal";
import CardComponent from "./components/CardComponents";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <NavBar />
      <div className="custom-container">
        <Carousal />
        <div className="m-2">
          <CardComponent />
        </div>
      </div>
    </>
  );
}

export default App;
