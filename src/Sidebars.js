import { useState } from "react";

export default function Sidebars(){
    const [isOriginal, setIsOriginal] = useState(true);

    function easterEgg(){
        const appBody = document.querySelector(".App-body");
        if (appBody) {
            if (isOriginal){
                appBody.style.backgroundImage = "url('/images/background_alt.jpg')";
            } else {
                appBody.style.backgroundImage = "url('/images/background.jpg')";
            }
            appBody.style.backgroundSize = "50% 100%"; 
            appBody.style.backgroundPosition = "center";
            setIsOriginal(!isOriginal);
        }

    }

    return(
        <div className="easterEgg">
            <button onClick={easterEgg}>EGG</button>
        </div>
    );
}