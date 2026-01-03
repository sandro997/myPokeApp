export interface UsePokeCardSizeProps {
    containerWidth: number;
    itemsPerRow: number;
    itemsGap: number;
    rowPadding: number;
}

export interface PokeCardSizeProps {
    width: number;
    height: number;
}

/**
 * Calculate the size of a poke card based on the container width, items per row, total items, row gap, and row padding.
 * @param containerWidth - The width of the container.
 * @param itemsPerRow - The number of items per row.
 * @param itemsGap - The gap between items.
 * @param rowPadding - The padding between the rows.
 * card aspect ratio is 1:1.4
 * @returns The size of the poke card.
 */


function usePokeCardSize({ containerWidth, itemsPerRow, itemsGap, rowPadding }: UsePokeCardSizeProps) {
    //this is a default value
    const cardAspectRatio = 1.4;  
    // calculate the space available for the cards
    const rowSpace = containerWidth - (rowPadding * 2);
    // calculate the space between the cards
    const gapSpace = (itemsPerRow - 1) * itemsGap;
    // calculate the space available for the cards
    const cardSpace = Math.max(0, rowSpace - gapSpace); 
    // calculate the width and height of the cards
    const width = Math.floor(cardSpace / itemsPerRow);
    const height = Math.floor(width * cardAspectRatio);
    
    const cardSize: PokeCardSizeProps = {
        width,
        height
    }
    return { cardSize };
}
export default usePokeCardSize;