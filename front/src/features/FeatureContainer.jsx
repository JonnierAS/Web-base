
import { Sidepanels } from './content-side-panels/Sidepanels'
import { MapContainer } from './map/MapContainer'
import NavbarContainer from './navbar/NavbarContainer'

export const FeatureContainer = () => {
  return (
    <>
        <NavbarContainer/>
        <Sidepanels/>
        <MapContainer/>
    </>
  )
}
