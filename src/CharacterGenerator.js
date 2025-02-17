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

    useEffect(() => {
        async function fetchData(){
            /* const url = `https://sheets.googleapis.com/v4/spreadsheets/1YLn9aOiytAI-JqImI81CX0Y0fd3LliMc_xx2xl1xbiA/values/Sheet1!A2:D?key=AIzaSyALKCzAQ875PbxrjkubVz1li2bvHthsq-M`; */
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

    function generateCharacter() {
        if (data.firstNames.length > 0) {
            setCharacter({
                firstName: getRandomElement(data.firstNames),
                lastName: getRandomElement(data.lastNames),
                motivation: getRandomElement(data.motivations),
                item: getRandomElement(data.items),
            });
        } else {
            console.warn("Data not loaded");
        }
    }

    return (

        <div className="App">
            <div className="App-head">
                <title>IG Character Generator</title>
                <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=UnifrakturMaguntia" />
                <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Jacquard 12" />
            </div>
    
            <div className="App-body">
                <audio autoPlay loop>
                    <source src="/audio/background_audio.wav" type="audio/wav" />
                    Your browser does not support the audio element.
                </audio>
                <h1> Izotope Games Character Generator</h1>
                <div>
                    <button onClick={generateCharacter}>Generate Character</button>
                    <br/>
                    <a href="https://substack.com/@izotopegames?utm_source=user-menu">Izotope Games Substack</a>
                    <br/>
                    <button>Help</button>
                </div>
                <div className="bottom-div">
                    {character && (
                        <div>
                            <p><strong>Name:</strong> {character.firstName} {character.lastName}</p>
                            <p><strong>Motivation:</strong> {character.motivation}</p>
                            <p><strong>Item:</strong> {character.item}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      );
}