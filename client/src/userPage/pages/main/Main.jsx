// import jwt_decode from "jwt-decode";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { userLogout } from "../../../redux/apiCalls";
// import PostedJob from "../../components/postedJob/PostedJob";
// import RejectedJob from "../../components/rejectedJob/RejectedJob";
// import Topbar from "../../components/topbar/Topbar";
// import TopUp from "../../components/topUp/TopUp";
// import UserSidebar from "../../components/userSidebar/UserSidebar";
// import UserSideMenu from "../../components/userSideMenu/UserSideMenu";
// import VerifyAccount from "../../components/verifyAccount/VerifyAccount";
// // import AgentDashboard from "../agentDashboard/AgentDashboard";
// import BecomeAgent from "../becomeAgent/BecomeAgent";
// import Dashboard from "../dashboard/Dashboard";
// import MicroTask from "../microTask/MicroTask";
// import Mine from "../mine/Mine";
// import Packages from "../packages/Packages";
// import Security from "../security/Security";
// import UserFaq from "../userFaq/UserFaq";
// import UserProfile from "../userProfile/UserProfile";
// import UserSettings from "../userSettings/UserSettings";
// import Withdraw from "../withdraw/Withdraw";
// import "./main.scss"; 

// const UserMain = () => {
//   const [dashboard, setDashboard] = useState(true);
//   const [packages, setPackages] = useState(false);
//   const [agent, setAgent] = useState(false);
//   const [mine, setMine] = useState(false);
//   const [task, setTask] = useState(false);
//   const [withdraw, setWithdraw] = useState(false);
//   const [faqs, setFaqs] = useState(false);
//   const [settings, setSettings] = useState(false);
//   const [profile, setProfile] = useState(false);
//   const [security, setSecurity] = useState(false);
//   const [identity, setIdentity] = useState(false);
//   const [viewJob, setViewJob] = useState(false);
//   const [rejectedJob, setRejectedJob] = useState(false);
//   const [side, setSide] = useState(false);
//   const [topUp, setTopUp] = useState(false);
//   const [bankD, setBankD] = useState(false);

//   const [click, setClick] = useState(false);

//   const user = useSelector((state) => state.user.currentUser);

//   // automatically logout a user when session expires
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     userLogout(dispatch);
//   };

//   useEffect(() => {
//     const token = user.accessToken;
//     if (token) {
//       const decodedToken = jwt_decode(token);
//       if (decodedToken.exp * 1000 < new Date().getTime()) {
//         handleLogout();
//         return alert("Session expired! kindly login again to continue");
//       }
//     }
//   });

//   // handle logout for forgot email
//   useEffect(() => {
//     const token = user.forgotToken;
//     if (token) {
//       const decodedToken = jwt_decode(token);
//       if (decodedToken.exp * 1000 < new Date().getTime()) {
//         handleLogout();
//       }
//     }
//   });

//   const handleClick = (e) => {
//     setClick(true);
//     setProfile(true);
//     setDashboard(false);
//     setPackages(false);
//     setAgent(false);
//     setMine(false);
//     setTask(false);
//     setWithdraw(false);
//     setFaqs(false);
//     setSettings(false);
//     setSecurity(false);
//     setViewJob(false);
//     setRejectedJob(false);
//   };

//   return (
//     <div className="userMain">
//       <div
//         className={user.fullName || profile || click ? "none" : "updateAccount"}
//       >
//         <p>
//           Welcome back <span>{user.username}!</span> Kndly proceed to update
//           your account.
//         </p>
//         <button className="button" onClick={handleClick}>
//           Proceed
//         </button>
//       </div>
//       {/* <div className="topbar">
//         <Topbar
//           settings={settings}
//           setSettings={setSettings}
//           profile={profile}
//           setProfile={setProfile}
//           security={security}
//           setDashboard={setDashboard}
//           setPackages={setPackages}
//           setAgent={setAgent}
//           setMine={setMine}
//           setTask={setTask}
//           setWithdraw={setWithdraw}
//           setFaqs={setFaqs}
//           setViewJob={setViewJob}
//           setRejectedJob={setRejectedJob}
//           side={side}
//           setSide={setSide}
//           identity={identity}
//           setIdentity={setIdentity}
//           setTopUp={setTopUp}
//         />
//       </div> */}
//       <div className="body">
//         {/* <div className="sidebar">
//           <UserSidebar
//             dashboard={dashboard}
//             setDashboard={setDashboard}
//             packages={packages}
//             setPackages={setPackages}
//             agent={agent}
//             setAgent={setAgent}
//             mine={mine}
//             setMine={setMine}
//             task={task}
//             setTask={setTask}
//             withdraw={withdraw}
//             setWithdraw={setWithdraw}
//             faqs={faqs}
//             setFaqs={setFaqs}
//             settings={settings}
//             setSettings={setSettings}
//             setProfile={setProfile}
//             setSecurity={setSecurity}
//             setViewJob={setViewJob}
//             setRejectedJob={setRejectedJob}
//             setClick={setClick}
//             setIdentity={setIdentity}
//             setTopUp={setTopUp}
//           />
//         </div> */}
//         <div className="sideMenu">
//           <UserSideMenu
//             dashboard={dashboard}
//             setDashboard={setDashboard}
//             packages={packages}
//             setPackages={setPackages}
//             agent={agent}
//             setAgent={setAgent}
//             mine={mine}
//             setMine={setMine}
//             task={task}
//             setTask={setTask}
//             withdraw={withdraw}
//             setWithdraw={setWithdraw}
//             faqs={faqs}
//             setFaqs={setFaqs}
//             settings={settings}
//             setSettings={setSettings}
//             setProfile={setProfile}
//             setSecurity={setSecurity}
//             setViewJob={setViewJob}
//             setRejectedJob={setRejectedJob}
//             setClick={setClick}
//             side={side}
//             setSide={setSide}
//             setIdentity={setIdentity}
//             setTopUp={setTopUp}
//           />
//         </div>
//         <div className={user.fullName || profile ? "dashboard" : "disabled"}>
//           <Dashboard
//             dashboard={dashboard}
//             setDashboard={setDashboard}
//             setPackages={setPackages}
//             setTopUp={setTopUp}
//           />
//           {/* <AgentDashboard dashboard={dashboard} /> */}
//           <Packages packages={packages} />
//           <BecomeAgent agent={agent} />
//           <Mine mine={mine} />
//           <MicroTask task={task} />
//           <Withdraw withdraw={withdraw} />
//           <UserFaq faqs={faqs} />
//           <UserSettings
//             settings={settings}
//             setSettings={setSettings}
//             setProfile={setProfile}
//             setSecurity={setSecurity}
//             bankD={bankD}
//             setBankD={setBankD}
//           />
//           <UserProfile
//             profile={profile}
//             setSettings={setSettings}
//             setProfile={setProfile}
//           />
//           <Security
//             security={security}
//             setSecurity={setSecurity}
//             setSettings={setSettings}
//           />
//           <PostedJob viewJob={viewJob} />
//           <RejectedJob rejectedJob={rejectedJob} />
//           <VerifyAccount identity={identity} />
//           <TopUp topUp={topUp}/>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserMain;
