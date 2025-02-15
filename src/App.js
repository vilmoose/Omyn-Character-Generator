import './App.css';

function App() {
  return (
    //<!DOCTYPE html>
    <html lang="en">

    <head class="App-head">
      <title>Izotope Games Generator</title>
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=UnifrakturMaguntia" />
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Jacquard 12" />
    </head>


    <body className="App-body">
      <audio autoPlay loop>
        <source src="/audio/background_audio.wav" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      <h1> Izotope Games Character Generator</h1>
      <div className="mid-div">
        <a href="https://substack.com/@izotopegames?utm_source=user-menu">Link to Izotope Games Substack</a>
        <br/>
        <button>Generate Character</button>
        <br/>
        <button>Help</button>
        <p>
          This is where the generator button and help button will be.
        </p>
      </div>
      <div className="bottom-div">
        <p>
          This is where generated characters will go in separate boxes.
          Will need to implement a list or  table.
        </p>
      </div>
    </body>
    </html>
  );
}

export default App;
