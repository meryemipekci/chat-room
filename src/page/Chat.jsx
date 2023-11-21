import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  where,
} from "firebase/firestore";

import Message from "../components/Message";

const Chat = ({ room, setRoom }) => {
  const [massages, setMassages] = useState([]);
  // guncelleyecegimiz koleksiyonun referansini alma
  const massagesCol = collection(db, "massages");

  //mesaji veri tabanina ekler
  console.log(auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;
    //add doc yenidocuman ekler (auto id)
    //iki paramtre ister
    //ekleme yapacagımız kolleksiyonun referensi
    //-data
    await addDoc(massagesCol, {
      text,
      room,
      user: {
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      },
      createdAt: serverTimestamp(),
    });
  };

  useEffect(() => {
    //filtreleme ayarlarını tanimlama

    const queryOptions = query(
      massagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );
    //kolleksiyonda herhangi bir degişiklik oldugu zaman
    //butun dokumanlara erişme,  onsnapshot kolleksiyon her degiştiginde
    //bir fonks. caliştirip fonks guncel, dokumnları paramatre olarak gonderir.
    onSnapshot(queryOptions, (snapshot) => {
      let tempMassages = [];
      //dokumanlari donup icerisindeki data methodu ile >
      //verilere erişip yeni diziye aktarma
      snapshot.docs.forEach((doc) =>
        // console.log(data())
        tempMassages.push({ id: doc.id, ...doc.data() })
      );
      //state i guncelleme
      setMassages(tempMassages);
    });
  }, []);
  return (
    <div className="chat">
      <header>
        <p className="user">{auth.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farkli Oda</button>
      </header>
      <main>
        {massages.map((msg) => (
          <Message key={msg.id} msg={msg} />
        ))}
      </main>
      <form onSubmit={handleSubmit}>
        <input required type="text" placeholder="mesajinizi yaziniz" />
        <button>Gonder</button>
      </form>
    </div>
  );
};

export default Chat;
