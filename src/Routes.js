import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Forgotpassword from "./pages/auth/Forgotpassword";
import Resetpassword from "./pages/auth/Resetpassword";
import Dashboard from "./pages/dashboard/Dashboard";

const Routers = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Redirect exact from="/dashboard" to="/dashboard/note" />
          <Route path="/register" component={Register} />
          <Route path="/login" >
            {localStorage.getItem('auth_token') ? <Redirect to='/dashboard/note' /> : <Login />}
          </Route>
          <Route path="/forgotpassword" component={Forgotpassword} />
          <Route path="/resetpassword/:id" component={Resetpassword} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  )
}

export default Routers;