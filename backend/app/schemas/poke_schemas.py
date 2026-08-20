from pydantic import BaseModel

class ListPaginationParams(BaseModel):
    offset: int = 0
    limit : int = 20
    next: str | None = None

class PokemonResponse(BaseModel):
    count: int
    next: str | None
    previous: str | None
    results: list[dict[str, str]] 