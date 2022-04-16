import "./App.css";
import Deso from "deso-protocol";
import { useState } from "react";

const deso = new Deso();
function LoginButton() {
  const publicKey = [publicKey, setPublicKey] = useState();
  return (
    <div>
      <button
        onClick={async () => {
          const user = await deso.identity.login();
        setPublicKey(deso.identity.getUserKey());
        }}
      >
        login
      </button>
  );
}

export default LoginButton
