import AuthModal from "./AuthModal";
import BackgroundLayout from "./BackgroundLayout";
import ForgotPassword from "./ForgotPassword";

const Authorization = () => {
  return (
    <div className={'flex justify-center items-center'}>
      <BackgroundLayout>
        {/*<AuthModal/>*/}
        <ForgotPassword/>
      </BackgroundLayout>

    </div>
  );
};

export default Authorization;
