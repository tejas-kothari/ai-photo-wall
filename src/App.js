import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RoomsPage from "pages/RoomsPage";
import WallAreaPage from "pages/WallAreaPage";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
            <RoomsPage />
          </Route>
          <Route path="/wall-area" exact>
            <WallAreaPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
