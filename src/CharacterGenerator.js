import React, { useState, useEffect } from "react";

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

    useEffect(() => {
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
    },[]);

    /**Generates a character with values from the google spreadsheet */
    function generateCharacter() {
        if (data.firstNames.length > 0) {
            setCharacter({
                firstName: getRandomElement(data.firstNames),
                lastName: getRandomElement(data.lastNames),
                motivation: getRandomElement(data.motivations),
                item: getRandomElement(data.items),
            });
            setIsHelpOpen(false);
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

    return (
        <div className="App">
            <title>Omyn Character Generator</title>
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Grenze Gotisch" />
                <div className="App-body">
                    <audio autoPlay loop>
                        <source src="/audio/background_audio.wav" type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>
                    <h1> Omyn Character Generator</h1>
                    <div>
                        <button onClick={generateCharacter}>Render your likeness</button>
                        <br></br>
                        <a href="https://substack.com/@izotopegames?utm_source=user-menu">Izotope Games Substack</a>
                        <br/>
                        <button onClick={helpUser}>Help</button>
                    </div>
                    <div className="bottom-div">
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
                                    <button onClick={closeHelp}>Close</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
        </div>
      );
}