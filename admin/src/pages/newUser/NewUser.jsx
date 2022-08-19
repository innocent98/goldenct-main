import { useState } from "react";
import { userRequest } from "../../requestMethod";
import "./newUser.css";

export default function NewUser() {
   const [inputs, setInputs] = useState({});
   const [processing, setProcessing] = useState(false);
 
   const handleChange = (e) => {
     setInputs((prev) => {
       return { ...prev, [e.target.name]: e.target.value };
     });
   };
 
   const handleSubmit = async (e) => {
     e.preventDefault();
     setProcessing(true);
     try {
       await userRequest.post("/auth/register/admin", {
         ...inputs,
       });
       setProcessing(false);
       return alert("Admin created successfully.");
     } catch (error) {
       setProcessing(false);
       return alert(error.response.data);
     }
   };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Admin</h1>
      <form className="newUserForm" onSubmit={handleSubmit}>
        <div className="newUserItem">
          <label>First Name</label>
          <input type="text" name="firstName" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Last Name</label>
          <input type="text" name="lastName" onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Auth</label>
          <input type="password" name="auth" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" onChange={handleChange} />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" onChange={handleChange} />
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" onChange={handleChange} />
            <label for="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Role</label>
          <select className="newUserSelect" name="role" id="active" onChange={handleChange}>
            <option value="Validator">Validator</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button className="newUserButton" type="submit" disabled={processing}>Create</button>
      </form>
    </div>
  );
}
