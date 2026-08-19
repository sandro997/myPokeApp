from pydantic import BaseModel

class ListPaginationParams(BaseModel):
    offset: int = 0
    limit : int = 20

class PokemonResponse(BaseModel):
    count: int
    next: str | None
    previous: str | None
    results: list[dict[str, str]] 