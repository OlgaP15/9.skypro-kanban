import AuthForm from "../AuthForm/AuthForm";

function SignIn({ userLogin,  }) {
  return <AuthForm userLogin={userLogin} isSignUp={false} />;
}
export default SignIn;
