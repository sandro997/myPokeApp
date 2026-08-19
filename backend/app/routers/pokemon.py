from fastapi import APIRouter, HTTPException, Depends
from app.services.poke_request import get_list
from app.schemas.poke_schemas import ListPaginationParams, PokemonResponse

router = APIRouter(
    prefix="/api/pokemon",
    tags=["pokemon"]
)

@router.get("/", response_model=PokemonResponse)
async def get_poke_list(params: ListPaginationParams = Depends()):
    """
    Endpoint per ottenere una lista paginata di Pokémon.
    
    Args:
        params (ListPaginationParams): Parametri di paginazione (offset, limit).
            Vengono automaticamente estratti dalla querystring.
    
    Returns:
        PokemonResponse: Oggetto contenente le informazioni della PokeApi come lista dei pokemon, count, next.
    
    Raises:
        HTTPException: 500 se si verifica un errore durante il recupero dei dati.
    """
    try:
        poke_list:PokemonResponse = await get_list(params)
        return poke_list
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))
    