import { useEffect, useState } from "react"
import { useGlobalState } from '@/shared/context/GlobalState'
import { ChevronRightIcon, Cross1Icon } from "@radix-ui/react-icons"
import { usePanelTabs } from "../hook/usePanelTabs"
import { TabsBar } from "../components/TabsBar"

export const RightPanel = ({ title = "Panel", tabs = [] }) => {
  const { openPanel, setOpenPanel } = useGlobalState()
  const { activeTab, setActiveTab, currentTab } = usePanelTabs(tabs)
  const [width, setWidth] = useState(350)
  const [isDragging, setIsDragging] = useState(false)

  const handleClose = () => {
    setOpenPanel(prev => ({ ...prev, right: false }))
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    e.preventDefault()
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const newWidth = window.innerWidth - e.clientX
    if (newWidth > 250 && newWidth < window.innerWidth - 100) {
      setWidth(newWidth)
    }
  }

  const handleMouseUp = () => setIsDragging(false)

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging])

  return (
    <>
      <div style={{ width }} className={`${!openPanel.right && 'hidden'} absolute h-[100dvh] right-0 z-[950]`}>
        <div className="relative mt-12 py-2 bg-white h-full border-t-4 border-gray-400/70">
          {/* Header */}
            <div className="flex justify-between items-center p-2 border-b border-gray-300">
                <h1 className="text-lg">{title}</h1>
                <span
                onClick={handleClose}
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

      {/* Toggle + Resizer */}
      {!openPanel.right ? (
        <button
          onClick={() => setOpenPanel(prev => ({ ...prev, right: true }))}
          className="bg-white absolute px-0.5 py-2 top-1/2 border border-gray-300 rounded-l-none cursor-pointer rotate-180 right-0 z-[950]"
        >
          <ChevronRightIcon />
        </button>
      ) : (
        <div
          style={{ right: `${width}px` }}
          className="z-[900] absolute h-full w-2 bg-gray-200 cursor-e-resize hover:bg-gray-300 border-x border-gray-300"
          onMouseDown={handleMouseDown}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-0.5 h-8 bg-gray-400 rounded"></div>
          </div>
        </div>
      )}
    </>
  )
}
