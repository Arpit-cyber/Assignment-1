import NavBar from "./widgets/NavBar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WebRouters from "./WebRouters";
import { BrowserRouter } from "react-router-dom";
import CustomAlert from "./widgets/CustomAlert";
import { useSelector } from "react-redux";
import { alert$ } from "./selectors/Dashboard.selectors";

function App() {
  const alert = useSelector(alert$);

  return (
    <BrowserRouter>
      {alert && <CustomAlert />}
      <div className="full-width">
        <NavBar />
        <WebRouters />
      </div>
    </BrowserRouter>
  );
}

export default App;
