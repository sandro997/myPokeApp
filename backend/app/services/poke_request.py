from requests import get

from app.core.poke_api_endpoints import poke_list_endpoint, poke_detail_endpoint
from app.schemas.poke_schemas import ListPaginationParams

def get_list(params: ListPaginationParams):
    """
    Recupera una lista paginata di elementi dall'endpoint specificato.

    Questa funzione invia una richiesta GET all'endpoint di lista, utilizzando
    i parametri di paginazione forniti per controllare l'offset e il limite
    degli elementi restituiti.

    Args:
        params (ListPaginationParams): Oggetto contenente i parametri di paginazione.
            Deve includere gli attributi:
            - offset (int): Il numero di elementi da saltare all'inizio della lista.
            - limit (int): Il numero massimo di elementi da restituire.

    Returns:
        dict: Un dizionario contenente i dati JSON della risposta.

    Raises:
        requests.exceptions.HTTPError: Se la richiesta HTTP non ha successo
        (status code diverso da 2xx). L'errore viene sollevato da raise_for_status().
    """
    r = get(poke_list_endpoint(params))
    r.raise_for_status()
    return r.json()

def get_pokemon():
    r = get(poke_detail_endpoint())
    r.raise_for_status()
    return r.json()