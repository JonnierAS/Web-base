import { useGlobalState } from '@/shared/context/GlobalState'
import { ChevronRightIcon, Cross1Icon } from "@radix-ui/react-icons"
import { usePanelTabs } from "../hook/usePanelTabs"
import { TabsBar } from "../components/TabsBar"

export const LeftPanel = ({ title = "Panel", tabs = [] }) => {
  const { openPanel, setOpenPanel } = useGlobalState()
  const { activeTab, setActiveTab, currentTab } = usePanelTabs(tabs)


  const handleToggle = () => {
    setOpenPanel(prev => ({ ...prev, left: !openPanel.left }))
  }

  /* Uso del panel
    <LeftPanel
    title="Capas y Leyenda"
    tabs={[
      { key: "layers", label: "Capas", content: <component /> },
      { key: "leyend", label: "Leyenda", content: <component /> },
    ]}
    />
  */

  return (
    <>
      <div className={`${!openPanel.left && 'hidden'} absolute w-[340px] h-[100dvh] bg-transparent left-0 z-[850]`}>
        <div className="relative py-2 bg-white h-full border-t-4 border-gray-400/70">
          {/* Header */}
          <div className="mt-12 flex justify-between pr-2 items-center border-b border-gray-300">
            <h1 className="text-lg pl-1">{title}</h1>
            <span
              onClick={handleToggle}
              className="text-gray-400 cursor-pointer p-1 rounded hover:bg-red-300 hover:text-black"
            >
              <Cross1Icon />
            </span>
          </div>

          {/* Tabs */}
          <TabsBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Content */}
          <div className="p-2 overflow-auto h-[calc(100%-120px)]">
            {currentTab?.content}
          </div>
        </div>
      </div>

      {!openPanel.left && (
        <button
          onClick={handleToggle}
          className="bg-white absolute px-0.5 py-2 top-1/2 border border-gray-300 rounded-r-none cursor-pointer z-[950]"
        >
          <ChevronRightIcon />
        </button>
      )}
    </>
  )
}
