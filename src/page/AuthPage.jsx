import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./../firebase/config";

const AuthPage = ({ setIsAuth }) => {
  //giris yapma fonks.
  const handleClick = () => {
    signInWithPopup(auth, provider)
      //oturum acik oldugunda bildiren token ı lokalde sakklama
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.user.refreshToken);
        //yetkiyi true'ya cek
        setIsAuth(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="auth">
        <h1>Chat Odasi</h1>
        <p>Devam etmek icin Giris yap</p>

        <button onClick={handleClick}>
          <img src="/logo.png" alt="google logo" />
          <span>Google ile gir</span>
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
