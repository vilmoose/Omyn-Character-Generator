import React, { useState, useEffect, useRef } from "react";

const SHEET_ID = process.env.REACT_APP_SHEET_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const RANGE = "Sheet1!A2:D";

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export default function CharacterGenerator(){
    const [data, setData] = useState({ firstNames: [], lastNames: [], motivations: [], items: [] });
    const[character, setCharacter] = useState(null);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [characterHistory, setCharacterHistory] = useState([]);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        /**Get character data from the google spreadsheet */
        async function fetchData(){
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
            const response = await fetch(url);
            const result = await response.json();

            if (result.values){
                //convert arrat data into structured object
                const formattedData = {
                    firstNames: result.values.map(row => row[0]),
                    lastNames: result.values.map(row => row[1]),
                    motivations: result.values.map(row => row[2]),
                    items: result.values.map(row => row[3]),
                };
                setData(formattedData);
            }
        }
        fetchData();

        if (audioRef.current)  {
            audioRef.current.volume = 0.1;
        }
    },[]);

    /**Generates a character with values from the google spreadsheet, and adds it to the array of characters */
    function generateCharacter() {
        if (data.firstNames.length > 0) {
            const soundEffect = new Audio("/audio/dice_effect.mp3");
            soundEffect.play();

            const newCharacter = {
                firstName: getRandomElement(data.firstNames),
                lastName: getRandomElement(data.lastNames),
                motivation: getRandomElement(data.motivations),
                item: getRandomElement(data.items),
            };

            setCharacter(newCharacter);
            setCharacterHistory(prevHistory => [newCharacter, ...prevHistory]);
            if(isHelpOpen){
                setIsHelpOpen(false);
            }
        } else {
            console.warn("Data not loaded");
        }
    }

    /**Opens the help popup */
    function helpUser() {
        setIsHelpOpen(true); 
        setCharacter(null);
    }

    /**Closes the help popup */
    function closeHelp() {
        setIsHelpOpen(false); 
    }

    /**Toggle music on/off */
    const toggleMusic = () => {
        if(audioRef.current){
            if(!isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="App">
            <title>Omyn Character Generator</title>
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Grenze Gotisch" />
                <div className="App-body">
                    <audio ref={audioRef} loop>
                        <source src="/audio/background_audio.wav" type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>
                    <h1> Omyn Character Generator</h1>
                    <div>
                        <button onClick={generateCharacter}>Render your likeness</button>
                        <br/>
                        <a href="https://substack.com/@izotopegames?utm_source=user-menu">Izotope Games Substack</a>
                        <br/>
                        <button onClick={toggleMusic}>
                            {isPlaying ? "Interrupt the Bard" : "Pay the Bard for a Song"}
                        </button>
                        <br/>
                        <button onClick={helpUser}>Help</button>
                    </div>
                    <div>
                        {!isHelpOpen && character && (
                            <div>
                                <p><strong>Name:</strong> {character.firstName} {character.lastName}</p>
                                <p><strong>Motivation:</strong> {character.motivation}</p>
                                <p><strong>Item:</strong> {character.item}</p>
                            </div>
                        )}

                        {isHelpOpen && (
                            <div className="Popup">
                                <div className="Popup-content">
                                    <p>How to use the website</p>
                                    <p>Click "Render your likeness" to generate a random character. Each character has a name, motivation, and a special item.</p>
                                    <p>Click "Izotope Games Substack" to be redirected to Izotope Games Substack where the campaign information is available.</p>
                                    <p>Click "Pay the Bard for a Song" to play music and "Interrupt the Bard" to pause music.</p>
                                    <p>Scroll to the bottom of the page for previously generated characters.</p>
                                    <button onClick={closeHelp}>Close</button>
                                </div>
                            </div>
                        )}

                        <div className="Character-history">
                            <h1>Scrolls of past souls</h1>
                            {characterHistory.length > 0 ? (
                                characterHistory.map((character, index) => (
                                    <div key={index} className="History">
                                        <p><strong>Name:</strong> {character.firstName} {character.lastName}</p>
                                        <p><strong>Motivation:</strong> {character.motivation}</p>
                                        <p><strong>Item:</strong> {character.item}</p>
                                    </div>
                                ))
                            ) : (
                                <p>The scrolls are empty...</p>
                            )}
                        </div>
                    </div>
                </div>
        </div>
      );
}