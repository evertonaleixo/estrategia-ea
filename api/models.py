from pydantic import BaseModel  # Importe o BaseModel
from typing import Optional

# Modelo para receber os dados do registro
class User(BaseModel):
    name: str
    email: str
    password: str
    birthdate: Optional[str] = None
    state: Optional[str] = None
    city: Optional[str] = None
