import AuthForm from "../AuthForm/AuthForm";

function SignUp({ setIsAuth, userLogin }) {
  return <AuthForm isSignUp userLogin={userLogin} setIsAuth={setIsAuth} />;
}
export default SignUp;
