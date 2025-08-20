
import { Sidipanels } from './content-side-panels/Sidipanels'
import { MapContainer } from './map/MapContainer'
import NavbarContainer from './navbar/NavbarContainer'

export const FeatureContainer = () => {
  return (
    <>
        <NavbarContainer/>
        <Sidipanels/>
        <MapContainer/>
    </>
  )
}
