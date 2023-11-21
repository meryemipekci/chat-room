import { useState } from "react";
import AuthPage from "./page/AuthPage";
import "./style.scss";
import Chat from "./page/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/config";

function App() {
  //kullanıcı yetkilimi state i tutuyoruz
  //state in ilk degeri localdeki taken a gore belirlenir
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));
  // console.log(auth);
  //kullanıcının girdigi odanın state i
  const [room, setRoom] = useState(null);
  //form gonderildigi odayi belirler
  const handleSubmit = (e) => {
    e.preventDefault();
    setRoom(e.target[0].value);
  };

  // yetkisi yoksa  > giriş
  if (!isAuth) {
    return <AuthPage setIsAuth={setIsAuth} />;
  }
  return (
    <div className="container">
      {/* odayı elirlediyse sohbet belirlemediyse oda secme */}
      {room ? (
        <Chat room={room} setRoom={setRoom} />
      ) : (
        <form onSubmit={handleSubmit} className="room-page">
          <h1>Chat Odasi</h1>
          <p>Hangi odaya gireceksiniz</p>
          <input type="text" placeholder="e.g. weekdays" />

          <button type="submit">Odaya Gir</button>
          <button
            onClick={() => {
              signOut(auth)
                .then(() => {
                  //lokalden token i kaldirma
                  localStorage.removeItem("token");
                  //yetkili state ini false cek
                  setIsAuth(false);
                })
                .catch((err) => console.log(err));
            }}
            id="logout"
            type="button"
          >
            Cikis yap
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
