import sqlite3

# Cria uma conexão com o banco de dados (ou cria o banco se ele não existir)
conn = sqlite3.connect("users.db")

# Cria uma tabela para armazenar os registros de usuário
conn.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        birthdate TEXT,
        state TEXT,
        city TEXT
    )
''')

conn.commit()
conn.close()


def get_users():
    try:
        # Replace with your database file path
        conn = sqlite3.connect("users.db")
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, name, email, password, birthdate, state, city FROM users ORDER BY name")
        users = cursor.fetchall()
        return [{
            "id": user[0],
            "name": user[1],
            "email": user[2],
            "password": user[3],
            "birthdate": user[4],
            "state": user[5],
            "city": user[6]
        } for user in users]
    except sqlite3.Error as e:
        print("SQLite error:", e)
        return []
