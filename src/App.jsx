import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleOpen() {
    setIsOpen((prevState) => !prevState);
  }

  function handleCreationNewFriend(friend) {
    setFriends([...friends, friend]);
    setIsOpen(false);
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setIsOpen(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {isOpen && <FormAddFriend onSetFriends={handleCreationNewFriend} />}

        <Button onClick={handleOpen}>{isOpen ? "Close" : "Add Friend"}</Button>
      </div>

      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function FormSplitBill({ selectedFriend }) {
  const { name, balance } = selectedFriend;
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {name}</h2>

      <label htmlFor="bill"> 💲Bill Value</label>
      <input type="text" id="bill" />

      <label htmlFor="expenses"> 💵 Your expenses </label>
      <input type="text" id="expenses" />

      <label htmlFor="friend"> 🤠 {name} expenses</label>
      <input type="text" id="friend" disabled />
      <label htmlFor="select"> 😎 Who is paying the bill</label>
      <select id="select">
        <option value="user">you</option>
        <option value="friend">{name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)} $
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance} $
        </p>
      )}

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onSetFriends }) {
  const [inputFriendName, setInputFriendName] = useState("");
  const [inputImage, setInputImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputFriendName || !inputImage) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name: inputFriendName,
      image: `${inputImage}?=${id}`,
      balance: 0,
    };

    onSetFriends(newFriend);

    setInputFriendName("");
    setInputImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="name">👯Friend Name</label>

      <input
        value={inputFriendName}
        type="text"
        id="name"
        onChange={(e) => setInputFriendName(e.target.value)}
      />

      <label htmlFor="image">🐉Image URL</label>
      <input
        value={inputImage}
        type="text"
        id="image"
        onChange={(e) => setInputImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

export default App;
