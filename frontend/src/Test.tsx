import usePokeCardSize from "@hooks/usePokeCardSize/usePokeCardSize";
import usePokeCardVirtualizer from "@hooks/usePokeGridVirtualizer/usePokeGridVirtualizer";
import { useEffect, useRef, useState } from "react";


function Testlist() {

  const parentRef = useRef<HTMLDivElement>(null);
  const [divWidth, setDivWidth] = useState(0);

  //TODO: attualmente lo use effect viene effettuato anche se si fa lo scroll e non solo se avviene il resize. 
  useEffect(() => {
    if (!parentRef.current) return;
  
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        setDivWidth(entry.contentRect.width);
      }
    };
  
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(parentRef.current);
  
    // Imposta subito il valore la prima volta
    setDivWidth(parentRef.current.offsetWidth);
  
    // Pulizia  
    return () => resizeObserver.disconnect();
  }, [parentRef]);

  //36 elementi
  const listTest = [
    'bulbasaur', 'pikachu', 'charmander', 'squirtle', 'eevee',
    'jigglypuff', 'snorlax', 'test', 'test', 'test', 'test',
    'test', 'bulbasaur', 'pikachu', 'charmander', 'squirtle', 'eevee',
    'jigglypuff', 'snorlax', 'test', 'test', 'test', 'test',
    'test', 'bulbasaur', 'pikachu', 'charmander', 'squirtle', 'eevee',
    'jigglypuff', 'snorlax', 'test', 'test', 'test', 'test',
    'test'
  ];

  const [itemsPerRow, _setItemsPerRow] = useState(3)
  const [preLoadedItems, _setPreLoadedItems] = useState (1)

  const {cardSize} = usePokeCardSize({containerWidth: divWidth, itemsPerRow, itemsGap: 40, rowPadding: 40}) 

  //TODO: decidere come gestie la itemSize
  const rowVirtualizer = usePokeCardVirtualizer ({
    count: listTest.length,
    parentRef,
    itemsSize: 100,
    overscan: preLoadedItems,
    lanes: itemsPerRow,
    gap: 20
  })

  return (
    <div className="h-screen overflow-auto w-full p-4" ref={parentRef}>
      <ul className="w-full relative"
        style={{height: `${rowVirtualizer.getTotalSize()}px`}}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          // Calcola la riga corrente e la posizione nella riga (laneInRow)
          const row = Math.floor(virtualItem.index / itemsPerRow);
          const laneInRow = virtualItem.index % itemsPerRow;
          // Conta quanti item ci sono nella riga, l'ultima potrebbe averne di meno
          const itemsInCurrentRow = Math.min(
            itemsPerRow,
            listTest.length - row * itemsPerRow
          );
          // Gap distribuito solo sugli elementi effettivi della riga
          const gap =
            itemsInCurrentRow > 1
              ? (divWidth - itemsInCurrentRow * cardSize.width) / (itemsInCurrentRow - 1)
              : 0;
          const itemPosition = laneInRow * (cardSize.width + gap);

          return (
            <li
              key={virtualItem.key}
              className="absolute p-10 box-border top[0px] bg-gray-400 border"
              id={`${virtualItem.key}`}
              style={{
                left: `${itemPosition}px`,
                width: `${cardSize.width}px`,
                height: `${virtualItem.size}px`,
                // Spostiamo l'elemento in basso alla sua posizione corretta
                transform: `translateY(${virtualItem.start}px)`, 
              }}
            >
              <strong>{listTest[virtualItem.index]}</strong>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Testlist;