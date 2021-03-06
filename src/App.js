import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RoomsPage from "pages/RoomsPage";
import WallAreaPage from "pages/WallAreaPage";
import Header from "components/Header";

export default function App() {
  return (
    <Router>
      <Header />
      <div className="content-area">
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
