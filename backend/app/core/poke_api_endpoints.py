from os import getenv
from dotenv import load_dotenv
from app.schemas.poke_schemas import ListPaginationParams 

load_dotenv()

POKE_API_URL = getenv("POKE_API_BASE_URL")

def poke_list_endpoint(params: ListPaginationParams) -> str:
    """
    Genera l'URL dell'endpoint dell'API Pokémon per ottenere una lista di Pokémon.

    Args:
        params: Oggetto con offset, limit e l'eventuale URL "next" di paginazione.

    Returns:
        str: Se params.next è un valore "truthy" (es. endpoint valido), viene restituito.
            Altrimenti (None, stringa vuota o comunque falsy) viene costruito 
            l'endpoint di fallback con offset e limit.
    """
    #TODO: mettere dei metodi per controllare se next sia effettivamente un endpoint e non una stringa a caso
    if params.next: 
        return params.next
    
    return f"{POKE_API_URL}/pokemon?offset={params.offset}&limit={params.limit}"

def poke_detail_endpoint(name: str) -> str:
    return f"{POKE_API_URL}/pokemon/{name}"