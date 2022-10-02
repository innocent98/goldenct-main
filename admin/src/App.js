import { useSelector } from "react-redux";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Payment from "./pages/payments/Payments";
import Jobs from "./pages/jobs/Jobs";
import Login from "./pages/login/Login";
import Job from "./pages/job/Job";
import UAPackages from "./pages/UApackages/UAPackages";
import AgentPackage from "./pages/agentPackage/AgentPackage";
import Identities from "./pages/identities/Identities";
import Identity from "./pages/identity/Identity";
import AdminList from "./pages/adminList/AdminList";
import Settings from "./pages/settings/Settings";
import Auth from "./pages/auth/Auth";
import TopUpList from "./pages/topUp/TopupList";
import WithdrawnList from "./pages/withdrawnList/WithdrawnList";
import Feedback from "./components/feedback/Feedback";
import FeedbackSingle from "./components/feedbackSingle/FeedbackSingle";
import ReferredList from "./components/referredList/ReferredList";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Switch>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <div className="body">
          {user ? <Topbar /> : <Redirect to="/login" />}
          <div className="container">
            {user ? <Sidebar /> : <Redirect to="/login" />}
            <Route exact path="/">
              {user ? <Home /> : <Redirect to="/login" />}
            </Route>
            <Route path="/users">
              {user ? <UserList /> : <Redirect to="/login" />}
            </Route>
            <Route path="/user/:userId">
              {user ? <User /> : <Redirect to="/login" />}
            </Route>
            <Route path="/newUser">
              {user ? <NewUser /> : <Redirect to="/login" />}
            </Route>
            <Route path="/admins">
              {user ? <AdminList /> : <Redirect to="/login" />}
            </Route>
            <Route path="/agents">
              {user ? <ProductList /> : <Redirect to="/login" />}
            </Route>
            <Route path="/payments">
              {user ? <Payment /> : <Redirect to="/login" />}
            </Route>
            <Route path="/top-up-list">
              {user ? <TopUpList /> : <Redirect to="/login" />}
            </Route>
            <Route path="/withdraw">
              {user ? <WithdrawnList /> : <Redirect to="/login" />}
            </Route>
            <Route path="/jobs">
              {user ? <Jobs /> : <Redirect to="/login" />}
            </Route>
            <Route path="/job/:jobId">
              {user ? <Job /> : <Redirect to="/login" />}
            </Route>
            <Route path="/packages">
              {user ? <UAPackages /> : <Redirect to="/login" />}
            </Route>
            <Route path="/agent-packages">
              {user ? <AgentPackage /> : <Redirect to="/login" />}
            </Route>
            <Route path="/payment-proof/:productId">
              {user ? <Product /> : <Redirect to="/login" />}
            </Route>
            <Route path="/identity">
              {user ? <Identities /> : <Redirect to="/login" />}
            </Route>
            <Route path="/identity-single/:identityId">
              {user ? <Identity /> : <Redirect to="/login" />}
            </Route>
            <Route path="/newproduct">
              {user ? <NewProduct /> : <Redirect to="/login" />}
            </Route>
            <Route path="/feedback">
              {user ? <Feedback /> : <Redirect to="/login" />}
            </Route>
            <Route path="/sponsored-job/:id">
              {user ? <FeedbackSingle /> : <Redirect to="/login" />}
            </Route>
            <Route path="/settings/:id">
              {user ? <Settings /> : <Redirect to="/login" />}
            </Route>
            <Route path="/account-settings/update-auth/:id">
              {user ? <Auth /> : <Redirect to="/login" />}
            </Route>
            <Route path="/agent-referred-list/:uuid">
              {user ? <ReferredList /> : <Redirect to="/login" />}
            </Route>
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
