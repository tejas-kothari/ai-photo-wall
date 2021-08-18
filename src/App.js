import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RoomsPage from "pages/RoomsPage";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <RoomsPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
