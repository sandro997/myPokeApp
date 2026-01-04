import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface UsePokeCardVirtualizerProps {
    count: number
    lanes: number,
    overscan: number
}

interface DefaultSettings{
  cardRatio: number,
  verticalGap: number
}

function usePokeCardVirtualizer ({count, lanes, overscan}:UsePokeCardVirtualizerProps) {
  
    const defaultSettings: DefaultSettings = {
      cardRatio: 1.4,
      verticalGap: 20
    }
    const parentRef = useRef<HTMLDivElement>(null);
    const [parentWidth, setParentWidth] = useState(0);

    //calcola la height delle card mantenedo una proporzione (cardRatio)
    const aspectedHeight:number = Math.floor(parentWidth/lanes)*defaultSettings.cardRatio
    const itemsSize:number = parentWidth > 0 ? aspectedHeight : 300;

    //crea il virtualizer
    const listVirtualizer = useVirtualizer({
      count,
      overscan,
      gap: defaultSettings.verticalGap,
      lanes, 
      getScrollElement: () => parentRef.current,
      estimateSize: () => itemsSize,
    });
 
    //calcola la width del parent in modo dinamico e salva il valore in uno state
    useEffect(() => {
      if (!parentRef.current) return;
    
      const handleResize = (entries: ResizeObserverEntry[]) => {
        for (let entry of entries) {
          setParentWidth(entry.contentRect.width);
        }
      };
    
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(parentRef.current);
    
      setParentWidth(parentRef.current.offsetWidth);
    
      return () => resizeObserver.disconnect();
    }, [parentRef]);
    
    // forza il virtualizer a ricalcolare le misure quando cambia la size del parent
    useLayoutEffect(() => {
      listVirtualizer.measure();
    }, [itemsSize, listVirtualizer]);

    return {listVirtualizer, parentRef, parentWidth}
}

export default usePokeCardVirtualizer