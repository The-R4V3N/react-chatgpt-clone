import { useState, useEffect, useRef } from "react";

const App = () => {
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const inputRef = useRef(null);

  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurrentTitle(null);
  };

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue("");
  };

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch("http://localhost:8000/completions", options);
      const data = await response.json();
      setMessage(data.choices[0].message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(currentTitle, value, message);
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [message, currentTitle]);

  console.log(previousChats);

  const currentChat = previousChats.filter((previousChats) => previousChats.title === currentTitle);
  const uniqueTitles = Array.from(new Set(previousChats.map((previousChat) => previousChat.title)));
  console.log(uniqueTitles);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getMessages();
    }
  };

  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => (
            <li key={index} onClick={() => handleClick(uniqueTitle)}>
              {uniqueTitle}
            </li>
          ))}
        </ul>
        <nav>
          <p>Made by The-R4V3N</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>Your AI assistant</h1>}
        <ul className="feed">
          {currentChat?.map((chatMessage, index) => (
            <li key={index}>
              <p className="role">{chatMessage.role}</p>
              <p>{chatMessage.content}</p>
            </li>
          ))}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div id="submit" onClick={getMessages}>
              ➢
            </div>
          </div>
          <p className="info">
            ChatGPT may produce inaccurate information about people, places, or facts.{" "}
            <a href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes">ChatGPT May 24 Version</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default App;
