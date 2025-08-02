import AuthForm from "../AuthForm/AuthForm";

function SignIn({ setIsAuth }) {
  return <AuthForm isSignUp={false} setIsAuth={setIsAuth} />;
}
export default SignIn;
