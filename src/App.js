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


function Button({ children, onClick }) {
  return <button className="button" onClick={onClick}>{children}</button>
  //created a reusable component 
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends)
  const [showAddFriend, setShowAddFriend] = useState(false)
  //used to make add friend form appear and disappear

  const [selectedFriend, setSelectedFriend] = useState(null)
  //used to make a friend selected


  function handleShowAddFriend() {
    setShowAddFriend((show) => !show)
    //takes current state and reverses
    // false becomes true, true becomes false
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    //creates new array by taking current friends array, spreading it and adding new friend to the end
    setShowAddFriend(false)
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => cur?.id === friend.id ? null : friend)
    //will get called whenever select button is clicked
    // if the currently selected friend.id is the same as the the friend.id (the selected friend and the form) then the button will become null and can be clicked again to deselect that friend 
    setShowAddFriend(false)
    //closes the add friend form when the bill form is open
  }

  function handleSplitBill(value) {


    setFriends((friends) => friends.map((friend) => friend.id === selectedFriend.id
      ? { ...friend, balance: friend.balance + value }
      : friend)
    )
    // Updates the balance of the selected friend based on the split value.
    // All other friends remain unchanged.

    setSelectedFriend(null)
    //when the form is submitted, the form closes
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends}
          selectedFriend={selectedFriend}
          // prop drilling is the act of using parent props to pass props down to children 
          onSelection={handleSelection} />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        {/* FormAddFriend will only show if showAddFriend is updated to true */}

        <Button onClick={handleShowAddFriend}>{showAddFriend ? "Close" : "Add Friend"}</Button>
        {/* conditional rendering to change button text, if showAddFriend is true then the button will display close, if false, it will display add friend */}
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill} />}
      {/* selectedFriend state is set to null so the form won't show */}
      {/* selectedFriend is passed in as a prop so that when the button is clicked the form re-renders to match the selected friend */}
    </div>
  )
}

function FriendsList({ friends, onSelection, selectedFriend }) {

  return <ul>
    {friends.map((friend) => <Friend friend={friend} key={friend.id} selectedFriend=
      {selectedFriend} onSelection={onSelection} />)}
  </ul>
  //map through the friends list, from each friend it renders a <Friend /> component and wraps all of them in a <ul> list
  // also passes the onSelection function to the Friend component
}


function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  // optional chaining after selectedFriend

  return (
    <li className={isSelected ? "selected" : ""}>
      {/* if isSelected (if selectedFriend.id is that same as friend.id) then add "selected" className to the li element, rendering specific css */}
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && <p className="red" >You owe {friend.name} £{Math.abs(friend.balance)} </p>}
      {friend.balance > 0 && <p className="green" >{friend.name} owes you {friend.balance} </p>}
      {friend.balance === 0 && <p>You and {friend.name} are even </p>}

      <Button onClick={() => onSelection(friend)}>{isSelected ? "Close" : "Select"
      }</Button>
      {/* on click will take the selected friend and render the form for that friend */}
    </li>)
  //recieves the friend option as a prop
  //renders their name, img, a conditional paragrapgh and a button inside a <li>
  //each friend inside its own component
}




function FormAddFriend({ onAddFriend }) {
  const [name, SetName] = useState("");
  const [image, SetImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    // gets cslled with the event object
    e.preventDefault();
    //prevents the default reloading of a page

    if (!name || !image) return;
    //early return if form is empty

    const id = crypto.randomUUID()
    //generates a random ID

    const newFriend = {
      //saves name, image URL, balance as 0 and a random ID as an object when form is submitted
      id,
      name,
      image: `${image}? = ${id}`,
      //fixes each generated image to the person using the id
      balance: 0,

    };
    onAddFriend(newFriend)
    //adds newFriend and makes a new friends array

    SetName("");
    SetImage("https://i.pravatar.cc/48");
  }

  return <form className="form-add-friend" onSubmit={handleSubmit}>
    <label>🧑‍🤝‍🧑Friend name</label>
    <input type="text"
      value={name} onChange={(e) =>
        SetName(e.target.value)} />

    <label>🌇Image URL</label>
    <input type="text"
      value={image}
      onChange={(e) => SetImage(e.target.value)} />

    <Button>Add</Button>
    {/* used the child prop from Button function */}
  </form >
}


function FormSplitBill({ selectedFriend, onSplitBill }) {

  const [bill, setBill] = useState("")
  const [paidByUser, setPaidByUser] = useState("")
  const [whoIsPaying, setWhoIsPaying] = useState("user")

  const paidByFriend = bill ? bill - paidByUser : "";
  //derived state

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser)
    //function to update friends balance. If user pays, then the balance is positive as the friend owes the user money, if friend pays, the balance is negative because the user owes the friend money
  }

  return <form className="form-split-bill" onSubmit={handleSubmit}>
    <h2>Split a bill with {selectedFriend.name}</h2>

    <label>💰Bill value</label>
    <input type="text"
      value={bill}
      onChange={(e) => setBill(Number(e.target.value))} />

    <label>🧍‍♀️Your Expense</label>
    <input type="text"
      value={paidByUser}
      onChange={(e) => setPaidByUser(Number(e.target.value) > bill ? paidByUser : Number(e.target.value))} />
    {/* if your expense is more than the bill, the default setPaidByUser will be returned (you cannot type a higher number) */}

    <label>🧑‍🤝‍🧑{selectedFriend.name}'s Expense</label>
    <input type="text" disabled value={paidByFriend} />
    {/* calculates value to be paid by friend */}

    <label>💰 Who is paying the bill?</label>
    <select value={whoIsPaying}
      onChange={(e) => setWhoIsPaying(e.target.value)}>

      <option value="user">You</option>
      <option value="friend">{selectedFriend.name}</option>
    </select>


    <Button>Add</Button>
  </form>
}