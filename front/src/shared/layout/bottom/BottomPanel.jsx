import { useGlobalState } from '@/shared/context/GlobalState'
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { usePanelTabs } from "../hook/usePanelTabs"
import { TabsBar } from '../components/TabsBar'

export const BottomPanel = ({ title = "Panel", tabs = [] }) => {
  const { openPanel, setOpenPanel } = useGlobalState()
  const { activeTab, setActiveTab, currentTab } = usePanelTabs(tabs)

  return (
    <>
      <div
        className={`
          absolute bottom-0 h-[250px] bg-white z-[800] border-2 border-t-0 border-gray-400/70 mx-2
          ${openPanel.left ? 'left-[335px]' : 'left-0'}
          ${openPanel.right ? 'right-[352px]' : 'right-0'}
          ${!openPanel.bottom && 'hidden'}
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-2 border-b border-gray-300">
          <h1 className="text-lg">{title}</h1>
          <button
            onClick={() => setOpenPanel(prev => ({ ...prev, bottom: false }))}
            className="text-gray-400 cursor-pointer p-1 rounded hover:bg-red-300 hover:text-black"
          >
            <ChevronDownIcon />
          </button>
        </div>

          {/* Tabs */}
          <TabsBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Content */}
          <div className="p-2 overflow-auto h-[calc(100%-120px)]">
            {currentTab?.content}
          </div>
      </div>

      {!openPanel.bottom && (
        <button
          onClick={() => setOpenPanel(prev => ({ ...prev, bottom: true }))}
          className="bg-white absolute bottom-[-10px] px-1 h-[40px] left-[47%] border border-gray-300 rounded-t cursor-pointer z-[950] rotate-270"
        >
          <ChevronRightIcon />
        </button>
      )}
    </>
  )
}
