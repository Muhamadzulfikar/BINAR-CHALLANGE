import { useState } from "react";
import { createContext } from "react";

export const LayoutContext = createContext();

const LayoutContextProvider = (props) => {
    const [data, setData] = useState({
        nightMode: false,
        day: {
            color: "white",
            background: "red"
        },
        night: {
            color: "white",
            background: "black"
        },
    });

    const handlerToggle = () => {
        setData((prevState) => ({
            ...prevState, nightMode: !data.nightMode
        }))
    }

    return (
        <LayoutContext.Provider value={{...data, handlerToggle}}>
            {props.children}
        </LayoutContext.Provider>
    )
}

export default LayoutContextProvider