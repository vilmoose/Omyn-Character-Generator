import './App.css';

function App() {
  return (

    <div className="App">
      <head>
        <title>Izotope Games Generator</title>
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=UnifrakturMaguntia" />
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Jacquard 12" />
      </head>
      <header>

      </header>
      <body className="App-body">
        <audio autoPlay loop>
          <source src="/audio/background_audio.wav" type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
        <h1>Izotope Games Character Generator</h1>
        <div className="Generator-div">
          <a href="https://substack.com/@izotopegames?utm_source=user-menu">Link to Izotop Games</a>
          <br/>
          <button>Generate</button>
          <button>Help</button>
          <p>
            This is where the generator button and help button will be.
          </p>
        </div>
        <div className="List-div">
          <p>
            This is where generated characters will go in separate boxes.
            Will need to implement a list.
          </p>
          <ol>
            <li>Character 1</li>
            <li>Character 2</li>
          </ol>
        </div>
      </body>

    </div>
  );
}

export default App;
