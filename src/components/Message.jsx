import { auth } from "./../firebase/config";

const Message = ({ msg }) => {
  //mesaji gonderen kisinin id si
  //oturumu acık olan kullanıcı id sine esitse

  if (msg.user.uid === auth.currentUser.uid) {
    return <p className="msg-user">{msg.text}</p>;
  }

  //mesaji baska bir kulanıcı gonderdiyse
  return (
    <div className="msg-other">
      <p className="user-info">
        <img src={msg.user.photo} />
        <span>{msg.user.name}:</span>
      </p>
      <p className="msg-text">{msg.text}</p>
    </div>
  );
};

export default Message;
