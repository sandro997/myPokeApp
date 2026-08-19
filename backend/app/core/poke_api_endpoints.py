from os import getenv
from dotenv import load_dotenv

load_dotenv()

POKE_API_URL = getenv("POKE_API_BASE_URL")

def poke_list_endpoint(params) -> str:
    """
    Genera l'URL dell'endpoint dell'API Pokémon per ottenere una lista di Pokémon.
    
    Args:
        params (ListPaginationParams): Oggetto con offset e limit per la paginazione.
    
    Returns:
        str: URL completo dell'endpoint.
    """
    return f"{POKE_API_URL}/pokemon?offset={params.offset}&limit={params.limit}"

def poke_detail_endpoint(name: str) -> str:
    return f"{POKE_API_URL}/pokemon/{name}"