import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./app.scss"
import ConfirmEmail from "./components/emailConfirmation/ConfirmEmail";
import ForgotPassword from "./components/forgotPaasword/ForgotPassword";
import UpdatePassword from "./components/updatePassword/UpdatePassword";
import Main from "./pages/main/Main";
import Register from "./pages/register/Register";
import Feedback from "./userPage/components/feedback/Feedback";
import PaymentSuccess from "./userPage/components/paymentSuccess/PaymentSuccess";
import SingleUplooadedProof from "./userPage/components/singleUploadedProof/SingleUplooadedProof";
import TaskProof from "./userPage/components/taskProof/TaskProof";
import UserMain from "./userPage/pages/main/Main";
import UploadedProof from "./userPage/pages/uploadedProof/UploadedProof";

function App() {
  const user = useSelector((state)=> state.user.currentUser)
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={user ? <Navigate to="/dashboard" /> : <Main />}></Route>
          <Route path="/register" element={user ? <Navigate to="/dashboard" /> :<Register />}></Route>
          <Route path="/confirm-email/:email" element={user ? <Navigate to="/dashboard" /> :<ConfirmEmail />}></Route>
          <Route path="/dashboard" element={user ? <UserMain /> : <Navigate to="/" />}></Route>
          <Route path="/proof-upload/:id" element={user ? <TaskProof/> : <Navigate to="/" />}></Route>
          <Route path="/proof/:id" element={user ? <UploadedProof/> : <Navigate to="/" />}></Route>
          <Route path="/proof-single/:id" element={user ? <SingleUplooadedProof/> : <Navigate to="/" />}></Route>
          <Route path="/payment" element={user ? <PaymentSuccess/> : <Navigate to="/" />}></Route>
          <Route path="/history" element={user ? <Feedback/> : <Navigate to="/" />}></Route>
          <Route path="/user/forgot-password" element={<ForgotPassword/>}></Route>
          <Route path="/user/reset/password/:id" element={<UpdatePassword/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
