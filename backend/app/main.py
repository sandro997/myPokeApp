from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.pokemon import router as pokemon_router

app = FastAPI(
    title="PokeApp",
    description="PokeApp è un'applicazione che permette di cercare pokemon.",
    version="0.1.0",
)
# Configurazione CORS
# TODO: prima di andare in produzione, metti dei cors veri :smileface: 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pokemon_router)

@app.get("/")
def root():
    return "ciao"
