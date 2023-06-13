const  App = () => {

  const getMessages = async () => {
    const options = {
      method: 'POST',
      body :JSON.stringify({
        message: "Hello"
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const response = await fetch('http://localhost:8000/completion', options) 
      const data = response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="app">   
      <section className="side-bar">
        <button>+ New chat</button>
        <ul className="history">
          <li>BLUGH</li>
        </ul>
        <nav>
          <p>Made by The-R4V3N</p>
          </nav>
        </section> 
      <section className="main">
      <h1>Your AI assistant</h1>
      <ul className="feed">

      </ul>
      <div className="bottom-section">
        <div className="input-container">
          <input/>
          <div id="submit" onClick={getMessages}>➢</div>
        </div>
        <p className="info">ChatGPT may produce inaccurate information about people, places, or facts. <a href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes">ChatGPT May 24 Version</a></p>
      </div>
      </section> 
    </div>
  );
}

export default App;
