import { createContext, useContext, useState } from "react";
import { mapStyles } from "@/shared/utils/constants_base_map/styles";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
    const [mapType, setMapType] = useState(mapStyles[0]);

    /* sidepanel */
  const [openPanel, setOpenPanel] = useState({
    left: false,
    right: false,
    bottom: false
  })

    return (
        <GlobalStateContext.Provider
            value={{
                mapType, setMapType,
                openPanel, setOpenPanel
            }}
        >
            {children}
        </GlobalStateContext.Provider>
    )
}

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};