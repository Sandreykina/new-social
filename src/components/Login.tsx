import React, { useState } from "react";

type LoginProps = {
  onSubmit: (username: string, password:string) => void
}

const Login: React.FC<LoginProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEnable, setEnable] = useState<boolean>(false);

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
