from typing import List, Dict

from fastapi import FastAPI
from fastapi import FastAPI, HTTPException
import sqlite3

from api.models import User
from api.database import conn, get_users

app = FastAPI()

@app.on_event("startup")  # This event handler will execute when the server starts
async def startup_db():
    conn 


@app.get("/users", response_model=List[Dict[str, str]])
async def read_users():
    users = get_users()
    return users

@app.post("/register", response_model=dict)
async def register_user(user: User):
    print('Enviando email')

    try:
        conn = sqlite3.connect("users.db")
        cursor = conn.cursor()

        # Insere os dados do usuário na tabela
        cursor.execute("INSERT INTO users (name, email, password, birthdate, state, city) VALUES (?, ?, ?, ?, ?, ?)",
                       (user.name, user.email, user.password, user.birthdate, user.state, user.city))
        conn.commit()
        conn.close()

        return {"message": "Usuário registrado com sucesso."}
    except sqlite3.Error as e:
        return HTTPException(status_code=500, detail=f"Erro ao registrar usuário: {str(e)}")

@app.get("/api/contact")
def contact():
    return {"message": "Hello World"}

@app.get("/api/login")
def login():
    return {"message": "Hello World"}