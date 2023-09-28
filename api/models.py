from fastapi import FastAPI

# from pydantic import BaseModel  # Importe o BaseModel
# from typing import Optional

# # Modelo para receber os dados do registro
# class User(BaseModel):
#     name: str
#     email: str
#     password: str
#     birthdate: Optional[str] = None
#     state: Optional[str] = None
#     city: Optional[str] = None

app = FastAPI()

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}