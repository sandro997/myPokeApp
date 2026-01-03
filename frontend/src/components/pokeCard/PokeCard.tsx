interface PokeCardProps {
    name?: string;
    image?: string;
    cardSize: PokeCardSizeProps;
}
interface PokeCardSizeProps {
    width: number;
    height: number;
}


function PokeCard({ name, image, cardSize }: PokeCardProps) {
    return (
        <div className={`bg-red-500 flex flex-col justify-between align-center`} style={{ width: `${cardSize.width}px`, height: `${cardSize.height}px` }}>
            <picture>
                <img src={image} alt={name} className="w-full h-full object-cover" />
            </picture>
            <p className="flex justify-center">{name}</p>
        </div>
    );
}

export default PokeCard;