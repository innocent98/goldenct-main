import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./app.scss";
import ConfirmEmail from "./components/emailConfirmation/ConfirmEmail";
import ForgotPassword from "./components/forgotPaasword/ForgotPassword";
import UpdatePassword from "./components/updatePassword/UpdatePassword";
import Main from "./pages/main/Main";
import Register from "./pages/register/Register";
import Feedback from "./userPage/components/feedback/Feedback";
import PaymentSuccess from "./userPage/components/paymentSuccess/PaymentSuccess";
import SingleUplooadedProof from "./userPage/components/singleUploadedProof/SingleUplooadedProof";
import TaskProof from "./userPage/components/taskProof/TaskProof";
import Topbar from "./userPage/components/topbar/Topbar";
import UserSidebar from "./userPage/components/userSidebar/UserSidebar";
import Dashboard from "./userPage/pages/dashboard/Dashboard";
// import UserMain from "./userPage/pages/main/Main";
import Packages from "./userPage/pages/packages/Packages";
import BecomeAgent from "./userPage/pages/becomeAgent/BecomeAgent";
import Mine from "./userPage/pages/mine/Mine";
import UploadedProof from "./userPage/pages/uploadedProof/UploadedProof";
import MicroTask from "./userPage/pages/microTask/MicroTask";
import Withdraw from "./userPage/pages/withdraw/Withdraw";
import UserFaq from "./userPage/pages/userFaq/UserFaq";
import UserSettings from "./userPage/pages/userSettings/UserSettings";
import UserProfile from "./userPage/pages/userProfile/UserProfile";
import Security from "./userPage/pages/security/Security";
import VerifyAccount from "./userPage/components/verifyAccount/VerifyAccount";
import PostedJob from "./userPage/components/postedJob/PostedJob";
import RejectedJob from "./userPage/components/rejectedJob/RejectedJob";
import UserSideMenu from "./userPage/components/userSideMenu/UserSideMenu";
import { userLogout } from "./redux/apiCalls";
import TopUp from "./userPage/components/topUp/TopUp";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  const [dashboard, setDashboard] = useState(true);
  const [packages, setPackages] = useState(false);
  const [agent, setAgent] = useState(false);
  const [mine, setMine] = useState(false);
  const [task, setTask] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [faqs, setFaqs] = useState(false);
  const [settings, setSettings] = useState(false);
  const [profile, setProfile] = useState(false);
  const [security, setSecurity] = useState(false);
  const [identity, setIdentity] = useState(false);
  const [viewJob, setViewJob] = useState(false);
  const [rejectedJob, setRejectedJob] = useState(false);
  const [side, setSide] = useState(false);
  const [topUp, setTopUp] = useState(false);
  const [bankD, setBankD] = useState(false);

  const [click, setClick] = useState(false);

  // automatically logout a user when session expires
  const dispatch = useDispatch();

  const handleLogout = () => {
    userLogout(dispatch);
  };

  useEffect(() => {
    if (user) {
      const token = user.accessToken;
      if (token) {
        const decodedToken = jwt_decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          handleLogout();
          return alert("Session expired! kindly login again to continue");
        }
      }
    }
  });

  // handle logout for forgot email
  useEffect(() => {
    if (user) {
      const token = user.forgotToken;
      if (token) {
        const decodedToken = jwt_decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          handleLogout();
        }
      }
    }
  });

  const handleClick = (e) => {
    setClick(true);
    setProfile(true);
    setDashboard(false);
    setPackages(false);
    setAgent(false);
    setMine(false);
    setTask(false);
    setWithdraw(false);
    setFaqs(false);
    setSettings(false);
    setSecurity(false);
    setViewJob(false);
    setRejectedJob(false);
  };

  return (
    <div className="app">
      <div className="topbar">
        <Topbar
          settings={settings}
          setSettings={setSettings}
          profile={profile}
          setProfile={setProfile}
          security={security}
          setDashboard={setDashboard}
          setPackages={setPackages}
          setAgent={setAgent}
          setMine={setMine}
          setTask={setTask}
          setWithdraw={setWithdraw}
          setFaqs={setFaqs}
          setViewJob={setViewJob}
          setRejectedJob={setRejectedJob}
          side={side}
          setSide={setSide}
          identity={identity}
          setIdentity={setIdentity}
          setTopUp={setTopUp}
        />
      </div>
      <br />

      {user && (
        <div
          className={
            user.fullName || profile || click ? "none" : "updateAccount"
          }
        >
          <p>
            Welcome back <span>{user.username}!</span> Kndly proceed to update
            your account.
          </p>
          <a href="/profile">
            <button className="button" onClick={handleClick}>
              Proceed
            </button>
          </a>
        </div>
      )}

      <div className="body">
        <div className="sidebar">
          <UserSidebar
            dashboard={dashboard}
            setDashboard={setDashboard}
            packages={packages}
            setPackages={setPackages}
            agent={agent}
            setAgent={setAgent}
            mine={mine}
            setMine={setMine}
            task={task}
            setTask={setTask}
            withdraw={withdraw}
            setWithdraw={setWithdraw}
            faqs={faqs}
            setFaqs={setFaqs}
            settings={settings}
            setSettings={setSettings}
            setProfile={setProfile}
            setSecurity={setSecurity}
            setViewJob={setViewJob}
            setRejectedJob={setRejectedJob}
            setClick={setClick}
            setIdentity={setIdentity}
            setTopUp={setTopUp}
          />
        </div>
        <div className="sideMenu">
          <UserSideMenu
            dashboard={dashboard}
            setDashboard={setDashboard}
            packages={packages}
            setPackages={setPackages}
            agent={agent}
            setAgent={setAgent}
            mine={mine}
            setMine={setMine}
            task={task}
            setTask={setTask}
            withdraw={withdraw}
            setWithdraw={setWithdraw}
            faqs={faqs}
            setFaqs={setFaqs}
            settings={settings}
            setSettings={setSettings}
            setProfile={setProfile}
            setSecurity={setSecurity}
            setViewJob={setViewJob}
            setRejectedJob={setRejectedJob}
            setClick={setClick}
            side={side}
            setSide={setSide}
            setIdentity={setIdentity}
            setTopUp={setTopUp}
          />
        </div>

        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={user ? <Navigate to="/dashboard" /> : <Main />}
            ></Route>
            <Route
              path="/register"
              element={user ? <Navigate to="/dashboard" /> : <Register />}
            ></Route>
            <Route
              path="/confirm-email/:email"
              element={user ? <Navigate to="/dashboard" /> : <ConfirmEmail />}
            ></Route>
          </Routes>
          <div className="dashboard">
            <Routes>
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/" />}
              ></Route>
              <Route
                path="/packages"
                element={
                  user ? (
                    <Packages
                      setDashboard={setDashboard}
                      setPackages={setPackages}
                      setAgent={setAgent}
                      setMine={setMine}
                      setTask={setTask}
                      setWithdraw={setWithdraw}
                      setFaqs={setFaqs}
                      setSettings={setSettings}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              ></Route>
              <Route
                path="/become-agent"
                element={
                  user ? (
                    <BecomeAgent
                      setDashboard={setDashboard}
                      setPackages={setPackages}
                      setAgent={setAgent}
                      setMine={setMine}
                      setTask={setTask}
                      setWithdraw={setWithdraw}
                      setFaqs={setFaqs}
                      setSettings={setSettings}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              ></Route>
              <Route
                path="/mine"
                element={
                  user ? (
                    <Mine
                      setDashboard={setDashboard}
                      setPackages={setPackages}
                      setAgent={setAgent}
                      setMine={setMine}
                      setTask={setTask}
                      setWithdraw={setWithdraw}
                      setFaqs={setFaqs}
                      setSettings={setSettings}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              ></Route>
              <Route
                path="/micro-task"
                element={
                  user ? (
                    <MicroTask
                      setDashboard={setDashboard}
                      setPackages={setPackages}
                      setAgent={setAgent}
                      setMine={setMine}
                      setTask={setTask}
                      setWithdraw={setWithdraw}
                      setFaqs={setFaqs}
                      setSettings={setSettings}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              ></Route>
              <Route
                path="/withdraw"
                element={
                  user ? (
                    <Withdraw
                      setDashboard={setDashboard}
                      setPackages={setPackages}
                      setAgent={setAgent}
                      setMine={setMine}
                      setTask={setTask}
                      setWithdraw={setWithdraw}
                      setFaqs={setFaqs}
                      setSettings={setSettings}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              ></Route>
              <Route
                path="/faq"
                element={
                  user ? (
                    <UserFaq
                      setDashboard={setDashboard}
                      setPackages={setPackages}
                      setAAgent={setAgent}
                      setMine={setMine}
                      setTask={setTask}
                      setWWithdraw={setWithdraw}
                      setFaqs={setFaqs}
                      setSettings={setSettings}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              ></Route>
              <Route
                path="/settings"
                element={
                  user ? (
                    <UserSettings
                      setDashboard={setDashboard}
                      setPackages={setPackages}
                      setAgent={setAgent}
                      setMine={setMine}
                      setTask={setTask}
                      setWithdraw={setWithdraw}
                      setFaqs={setFaqs}
                      setSettings={setSettings}
                      settings={settings}
                      setProfile={setProfile}
                      setSecurity={setSecurity}
                      bankD={bankD}
                      setBankD={setBankD}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  user ? (
                    <UserProfile
                      setDashboard={setDashboard}
                      setPackages={setPackages}
                      setAgent={setAgent}
                      setMine={setMine}
                      setTask={setTask}
                      setWithdraw={setWithdraw}
                      setFaqs={setFaqs}
                      setSettings={setSettings}
                      setProfile={setProfile}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              ></Route>
              <Route
                path="/security"
                element={
                  user ? (
                    <Security
                      setDashboard={setDashboard}
                      setPackages={setPackages}
                      setAgent={setAgent}
                      setMine={setMine}
                      setTask={setTask}
                      setWithdraw={setWithdraw}
                      setFaqs={setFaqs}
                      setSettings={setSettings}
                      setProfile={setProfile}
                      setSecurity={setSecurity}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              ></Route>
              <Route
                path="/verify"
                element={
                  user ? (
                    <VerifyAccount
                      setDashboard={setDashboard}
                      setPackages={setPackages}
                      setAgent={setAgent}
                      setMine={setMine}
                      setTask={setTask}
                      setWithdraw={setWithdraw}
                      setFaqs={setFaqs}
                      setSettings={setSettings}
                      setIdentity={setIdentity}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              ></Route>
              <Route
                path="/verify"
                element={
                  user ? (
                    <PostedJob
                      setDashboard={setDashboard}
                      setPackages={setPackages}
                      setAgent={setAgent}
                      setMine={setMine}
                      setTask={setTask}
                      setWithdraw={setWithdraw}
                      setFaqs={setFaqs}
                      setSettings={setSettings}
                      setViewJob={setViewJob}
                      viewJob={viewJob}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              ></Route>
              <Route
                path="/rejected-jobs"
                element={
                  user ? (
                    <RejectedJob
                      setDashboard={setDashboard}
                      setPackages={setPackages}
                      setAgent={setAgent}
                      setMine={setMine}
                      setTask={setTask}
                      setWithdraw={setWithdraw}
                      setFaqs={setFaqs}
                      setSettings={setSettings}
                      setRejectedJob={setRejectedJob}
                      rejectedJob={rejectedJob}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              ></Route>
              <Route
                path="/fund-account"
                element={
                  user ? (
                    <TopUp
                      setDashboard={setDashboard}
                      setPackages={setPackages}
                      setAgent={setAgent}
                      setMine={setMine}
                      setTask={setTask}
                      setWithdraw={setWithdraw}
                      setFaqs={setFaqs}
                      setSettings={setSettings}
                      topUp={topUp}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              ></Route>
              <Route
                path="/payment-validate"
                element={
                  user ? (
                    <TopUp
                      setDashboard={setDashboard}
                      setPackages={setPackages}
                      setAgent={setAgent}
                      setMine={setMine}
                      setTask={setTask}
                      setWithdraw={setWithdraw}
                      setFaqs={setFaqs}
                      setSettings={setSettings}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              ></Route>
              <Route
                path="/proof-upload/:id"
                element={user ? <TaskProof /> : <Navigate to="/" />}
              ></Route>
              <Route
                path="/proof/:id"
                element={user ? <UploadedProof /> : <Navigate to="/" />}
              ></Route>
              <Route
                path="/proof-single/:id"
                element={user ? <SingleUplooadedProof /> : <Navigate to="/" />}
              ></Route>
              <Route
                path="/payment"
                element={user ? <PaymentSuccess /> : <Navigate to="/" />}
              ></Route>
              <Route
                path="/history"
                element={user ? <Feedback /> : <Navigate to="/" />}
              ></Route>
              <Route
                path="/user/forgot-password"
                element={<ForgotPassword />}
              ></Route>
              <Route
                path="/user/reset/password/:id"
                element={<UpdatePassword />}
              ></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
