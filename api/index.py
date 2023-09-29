import os
import hashlib

from typing import Optional
from dotenv import load_dotenv

import psycopg2
from psycopg2 import Error

from fastapi import FastAPI
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel  # Importe o BaseModel


# Modelo para receber os dados do registro
class User(BaseModel):
    name: str
    email: str
    password: str
    birthdate: Optional[str] = None
    state: Optional[str] = None
    city: Optional[str] = None


app = FastAPI()

DATABASE = [1, 2, 3]
connection_string = os.getenv('DB_URL')

@app.on_event("startup")  # This event handler will execute when the server starts
async def startup_db():
    load_dotenv()
    print(f'connection: {connection_string}')


def get_users():
    try:
        # Replace with your database file path
        conn = psycopg2.connect(connection_string)
        # Create a cursor object
        cur = conn.cursor()

        cur.execute(
            "SELECT id, name, email, password, birthdate, state, city FROM users ORDER BY name")
        users = cur.fetchall()
        return [{
            "id": user[0],
            "name": user[1],
            "email": user[2],
            "password": user[3],
            "birthdate": user[4],
            "state": user[5],
            "city": user[6]
        } for user in users]
    
    except (Exception, Error) as e:
        print("Error inserting user:", e)
        return []
    finally:
        # Close the database connection
        if conn:
            conn.close()
    return []
    
@app.get("/api/users")
def read_users():
    users = get_users()
    
    return users

@app.post("/api/user")
def register_user(user: User):
    print('Enviando email')

    try:
        conn = psycopg2.connect(connection_string)

        # Create a cursor object
        cur = conn.cursor()

        # Define the SQL query to insert a user
        insert_query = """
        INSERT INTO users (name, email, password, birthdate, state, city)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING id;
        """

        # Execute the query with user data
        cur.execute(insert_query, (
            user.name,
            user.email,
            hashlib.md5(user.password.encode()).hexdigest(),
            user.birthdate,
            user.state,
            user.city
        ))

        # Fetch the inserted user's ID
        user_id = cur.fetchone()[0]

        # Commit the transaction and close the cursor
        cur.close()
        conn.commit()

        return {"message": f'User id: {user_id}'}
    except (Exception, Error) as e:
        print("Error inserting user:", e)
        raise HTTPException(status_code=500, detail=f"Erro ao registrar usuário: {str(e)}")
    finally:
        # Close the database connection
        if conn:
            conn.close()

