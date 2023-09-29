import os
import hashlib

from typing import Optional
from dotenv import load_dotenv

import psycopg2
from psycopg2 import Error

from fastapi import FastAPI
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel  # Importe o BaseModel

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


# Modelo para receber os dados do registro
class User(BaseModel):
    name: str
    email: str
    password: Optional[str] = None
    birthdate: Optional[str] = None
    state: Optional[str] = None
    city: Optional[str] = None
    phone: Optional[str] = ''
    message: Optional[str] = ''


app = FastAPI()

connection_string = os.getenv('DB_URL')
SENDGRID_API_KEY = os.environ.get("SENDGRID_KEY")

def send_email(title: str, user: User):
    # Create a SendGrid client
    sg = SendGridAPIClient(api_key=SENDGRID_API_KEY)

    # Define the email content
    subject = f"[{title}]Novo cliente: {user.name}"
    sender_email = "everton.jiujitsu@gmail.com"
    receiver_email = "everton.jiujitsu@gmail.com"
    message_text = f"Entrar em contato com {user.name} pelo e-mail {user.email} ou pelo telefone: {user.phone}"

    # Create a Mail object
    message = Mail(
        from_email=sender_email,
        to_emails=receiver_email,
        subject=subject,
        plain_text_content=message_text,
    )

    try:
        # Send the email
        response = sg.send(message)
        print("Email sent successfully")
        print(response.status_code)
        print(response.body)
    except Exception as e:
        print(f"Email sending failed: {str(e)}")


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

        send_email('REGISTRO', user)

        return {"message": f'User id: {user_id}'}
    except (Exception, Error) as e:
        print("Error inserting user:", e)
        raise HTTPException(status_code=500, detail=f"Erro ao registrar usuário: {str(e)}")
    finally:
        # Close the database connection
        if conn:
            conn.close()


@app.post("/api/contact")
def register_contact(user: User):
    try:
        conn = psycopg2.connect(connection_string)

        # Create a cursor object
        cur = conn.cursor()

        # Define the SQL query to insert a user
        insert_query = """
        INSERT INTO users (name, email, phone, message)
        VALUES (%s, %s, %s, %s)
        RETURNING id;
        """

        # Execute the query with user data
        cur.execute(insert_query, (
            user.name,
            user.email,
            user.phone,
            user.message
        ))

        # Fetch the inserted user's ID
        user_id = cur.fetchone()[0]

        # Commit the transaction and close the cursor
        cur.close()
        conn.commit()

        send_email('CONTATO', user)

        return {"message": f'User id: {user_id}'}
    except (Exception, Error) as e:
        print("Error inserting user:", e)
        raise HTTPException(status_code=500, detail=f"Erro ao registrar usuário: {str(e)}")
    finally:
        # Close the database connection
        if conn:
            conn.close()

