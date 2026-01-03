import { useVirtualizer } from "@tanstack/react-virtual";

interface UsePokeCardVirtualizerProps {
    count: number
    itemsSize: number,
    parentRef: React.RefObject<HTMLDivElement | null>
    lanes: number,
    overscan: number
    gap: number
}

function usePokeCardVirtualizer ({count, parentRef, itemsSize, lanes, overscan, gap}:UsePokeCardVirtualizerProps) {

    const rowVirtualizer = useVirtualizer({
      count,
      overscan,
      gap,
      lanes, 
      getScrollElement: () => parentRef.current,
      estimateSize: () => itemsSize,
    });


    return rowVirtualizer
}

export default usePokeCardVirtualizer