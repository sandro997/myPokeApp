from fastapi import FastAPI

app = FastAPI(
    title="PokeApp",
    description="PokeApp è un'applicazione che permette di cercare pokemon.",
    version="0.1.0",
)

@app.get("/")
async def root():
    return {"message": "Hello World"}
