import React, { useState } from "react";

const Login = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isEnable, setEnable] = useState(false);

  const handleKeyUp = () => {
    if (username.length > 0 && password.length > 0) setEnable(true);
    else setEnable(false);
  };

  return (
    <div className="login-content">
      <div>User Name</div>
      <input
        type="text"
        id="username-input"
        placeholder="username"
        value={username}
        onKeyUp={handleKeyUp}
        onChange={(event) => setUsername(event.target.value)}
      />
      <br />
      <br />
      <div>Password</div>
      <input
        type="password"
        id="password-input"
        placeholder="Password"
        onKeyUp={handleKeyUp}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <br />
      {isEnable && (<button
        type="submit"
        id="button-input"
        onClick={() => onSubmit(username, password)}
        className={"login-btn"}
      >
        Войти
      </button>)}
    </div>
  );
}

export default Login;
