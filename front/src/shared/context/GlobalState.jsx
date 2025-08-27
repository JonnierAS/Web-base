import { createContext, useContext, useState } from "react";
import { mapStyles } from "@/shared/map/base/styles";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
    const [mapType, setMapType] = useState(mapStyles[0]);

    /* Seleccion de capa */
    const [ layerActiveGeoserver,setLayerActiveGeoserver ] = useState(null)
    const [layerViewControl, setLayerViewControl] = useState({
      displayed: [],
      hidden: []
    })
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
                openPanel, setOpenPanel,
                layerActiveGeoserver,setLayerActiveGeoserver,
                layerViewControl, setLayerViewControl
            }}
        >
            {children}
        </GlobalStateContext.Provider>
    )
}

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};