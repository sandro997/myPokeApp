interface PokeCardProps {
    name?: string;
    image?: string;
}


function PokeCard({ name, image}: PokeCardProps) {
    return (
        <div className={`bg-red-500 flex flex-col justify-between align-center w-full h-full border`}>
            <picture>
                <img src={image} alt={name} className="w-full h-full object-cover" />
            </picture>
            <p className="flex justify-center">{name}</p>
        </div>
    );
}

export default PokeCard;