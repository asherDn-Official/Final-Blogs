import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const Navigate = useNavigate();
  const [EmailInput, setEmailInput] = useState("");
  const [PasswordInput, setPasswordInput] = useState("");

  // Function to handle input change
  const handleInputChange = (event) => {
    setEmailInput(event.target.value);
  };
  const handleInputChange1 = (event) => {
    setPasswordInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("EmailInput", EmailInput);
    setEmailInput("");
    localStorage.setItem("PasswordInput", PasswordInput);
    setPasswordInput("");

    // console.log(EmailInput);

    if (
      EmailInput === "revnitroblogs2024@gmail.com" &&
      PasswordInput === "1234"
    ) {
      alert("Password Correct");
      Navigate(`/CreatePost`);
    } else {
      alert("Password Wrong");
    }
  };

  return (
    <div>
      <div
        className="row wrapper"
        style={{
          margin: "0px",
          display: "flex",
          justifyContent: "center",
          paddingBottom: "50px",
          marginTop: "40px",
        }}
      >
        <div className="col-10 col-lg-5" style={{ width: "475px" }}>
          <form onSubmit={handleSubmit} className="shadow-lg">
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={EmailInput}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={PasswordInput}
                onChange={handleInputChange1}
                required
              />
            </div>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              style={{
                backgroundColor: "#004147",
                color: "white",
                marginTop: "30px",
              }}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
