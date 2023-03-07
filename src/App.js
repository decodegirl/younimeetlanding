import React from 'react';
import logo from "./images/YouNICircleLogo.png";
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import Swal from "sweetalert2";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDvlB21jjndcuOWP4_eK61ER3I0u9IYlrw",
  authDomain: "younimeetlandingpage.firebaseapp.com",
  projectId: "younimeetlandingpage",
  storageBucket: "younimeetlandingpage.appspot.com",
  messagingSenderId: "483015600293",
  appId: "1:483015600293:web:dd264384a5d917ea3a454c",
  measurementId: "G-L6WCNC9RQF"
};
firebase.initializeApp(firebaseConfig);

function WaitlistForm() {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [socialmediaaccount, setSocialMediaAccount] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission, such as sending email to server
    const data = { name, email, socialmediaaccount };
    firebase.database().ref('waitlist-form-data').push(data)
      .then(() => {
        console.log('Data saved to Firebase database:', data);
        setEmail('');
        setName('');
        setSocialMediaAccount('');
        setIsFormValid(false);
      })
      .catch((error) => {
        console.error(' There was an Error saving data to Firebase database, please try again:', error);
      });
    console.log('Submitted information:', email);
  }


  const handleEmailChange = (event) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(event.target.value);
    setIsFormValid(emailPattern.test(event.target.value) && name && isValidURL(socialmediaaccount));
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
    setIsFormValid(email && event.target.value && isValidURL(socialmediaaccount));
  }

  const handleSocialMediaAccountChange = (event) => {
    setSocialMediaAccount(event.target.value);
    setIsFormValid(email && name && isValidURL(event.target.value));
  }

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }
  const showAlert = () => {
    Swal.fire({
      title: "Success",
      text: "You've been added to the waitlist!",
      icon: "success",
      color: "#004aad",
      confirmButtonText: "Ok",
      confirmButtonColor: "#00C5A7",
    });
  }

  return (
    <div className='waitlist-form'>
      <form onSubmit={handleSubmit}>
        <label> Join the Waitlist!</label>
        <input type="text" placeholder="Full Name" id="name" name="name" value={name} onChange={handleNameChange} required />
        <input type="email" id="email" placeholder=" Email address" name="email" value={email} onChange={handleEmailChange} required />
        <input type="url" id="socialmediaaccount" placeholder="Link to social media account" name="socialmediaaccount" value={socialmediaaccount} onChange={handleSocialMediaAccountChange} required />

        <button onClick={showAlert} disabled={!isFormValid} type="submit">Get Notified!</button>
      </form>
    </div>
  );
}



function App() {
  return (
    <div className="App">
      <nav className="header-logo"> <img src={logo} alt=" Youni Meet Logo" ></img></nav>
      <div className="App-landingpage">
        <div className="description">
          <header className="App-header">
            <h1 className='header-app'> YouNI Meet is Launching Soon!</h1>
            <p className="description-text">
              Are you a content creator or influencer who wants to meet other creators in your niche and collaborate in content creation?
              <br /><br />
              <br /> YouNI Meet is a platform that provides content creators the opportunity to connect, meet and create with other content creators nearby.
              <br /> <br /> Linkedin, but for creators, made by two content creators themselves. <br /> <br />
              Encouraging Genuine and Interactive Friendships!
            </p>
          </header>
        </div >
        <WaitlistForm />
      </div>
    </div >
  );
}

export default App;
