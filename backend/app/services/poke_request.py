from httpx import AsyncClient

from app.core.poke_api_endpoints import poke_list_endpoint, poke_detail_endpoint
from app.schemas.poke_schemas import ListPaginationParams, PokemonResponse

async def get_list(params: ListPaginationParams) -> PokemonResponse:
    """
    Recupera una lista paginata di Pokémon dalla PokeAPI.

    Questa funzione invia una richiesta GET all'endpoint di lista, utilizzando
    i parametri di paginazione forniti per controllare l'offset e il limite
    degli elementi restituiti.

    Args:
        params (ListPaginationParams): Oggetto contenente i parametri di paginazione.
            Deve includere gli attributi:
            - offset (int): Il numero di elementi da saltare all'inizio della lista.
            - limit (int): Il numero massimo di elementi da restituire.

    Returns:
        PokemonResponse: Oggetto Pydantic contenente i dati formattati della risposta.

    Raises:
        httpx.HTTPStatusError: Se la richiesta HTTP fallisce (status code 4xx o 5xx).
    """
    url = poke_list_endpoint(params)
    async with AsyncClient(timeout=10.0) as client:
        response = await client.get(url)
        response.raise_for_status()
        return PokemonResponse(**response.json())

def get_pokemon():
    r = get(poke_detail_endpoint())
    r.raise_for_status()
    return r.json()