import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import {AuthContext} from '../store/auth-context';
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../util/auth";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);
  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user, Please enter valid data and try again!"
      );
      setIsAuthenticating(false);
    }
    
  }
  if (isAuthenticating) {
    return <LoadingOverlay message={"Creating User..."} />;
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
