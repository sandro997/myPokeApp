from fastapi import FastAPI
from app.services.poke_request import get_list
from app.schemas.poke_schemas import ListPaginationParams
app = FastAPI(
    title="PokeApp",
    description="PokeApp è un'applicazione che permette di cercare pokemon.",
    version="0.1.0",
)


@app.get("/")
def root():
    return get_list(params=ListPaginationParams())
