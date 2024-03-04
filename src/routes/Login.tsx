import { useContext, useState } from "react";
import { AppContext } from "../Context";

export function RouteLogin() {
  const { login } = useContext(AppContext);
  const [inputUsername, setInputUsername] = useState<string>("");

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        value={inputUsername}
        onChange={(e) => setInputUsername(e.target.value)}
      />
      <button
        onClick={() => {
          login(inputUsername);
        }}
      >
        Login
      </button>
    </div>
  );
}
