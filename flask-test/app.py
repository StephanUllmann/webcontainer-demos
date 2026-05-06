import os
import sqlite3
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from datetime import datetime

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)


def get_connection():
    # Connect to a local file instead of a network database
    db_path = os.getenv("SQLITE_DB_PATH", "app.db")
    conn = sqlite3.connect(db_path)

    # SQLite requires you to explicitly enable foreign key enforcement
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


# --- DATABASE SETUP (Run once to init tables) ---
def init_db():
    try:
        conn = get_connection()
        cur = conn.cursor()

        # executescript allows running multiple semi-colon separated statements
        cur.executescript("""
            CREATE TABLE IF NOT EXISTS authors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                birth_year INTEGER
            );
            
            CREATE TABLE IF NOT EXISTS books (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                release_year INTEGER
            );

            CREATE TABLE IF NOT EXISTS authors_books (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                author_id INTEGER,
                book_id INTEGER,
                FOREIGN KEY (author_id) REFERENCES authors(id),
                FOREIGN KEY (book_id) REFERENCES books(id)
            );
        """)

        conn.commit()
        conn.close()
        print("Database initialized successfully.")
    except Exception as e:
        print(f"Error initializing DB: {e}")


# Initialize tables on startup
with app.app_context():
    init_db()


# --- AUTHOR CONTROLLERS ---


@app.route("/")
def home():
    return f"""
    <h1>Hello, World</h1>
    <p>{datetime.date(datetime.now())}</p>
    """


@app.route("/authors", methods=["POST"])
def create_author():
    try:
        data = request.get_json()
        name = data.get("name")
        birth_year = data.get("birth_year")

        if not name:
            return jsonify({"error": "Author name is required"}), 400

        conn = get_connection()
        cur = conn.cursor()

        # Changed %s to ? and removed RETURNING id
        cur.execute(
            "INSERT INTO authors (name, birth_year) VALUES (?, ?)",
            (name, birth_year),
        )
        # Capture the ID of the row we just inserted
        new_id = cur.lastrowid

        conn.commit()
        conn.close()

        return jsonify({"id": new_id, "name": name, "birth_year": birth_year}), 201

    except Exception as e:
        return jsonify({"error": "Server error", "details": str(e)}), 500


@app.route("/authors", methods=["GET"])
def get_authors():
    try:
        conn = get_connection()
        cur = conn.cursor()

        cur.execute("SELECT id, name, birth_year FROM authors")
        rows = cur.fetchall()

        # Manual serialization
        results = []
        for row in rows:
            results.append({"id": row, "name": row, "birth_year": row})

        conn.close()
        return jsonify(results), 200

    except Exception as e:
        return jsonify({"error": "Server error", "details": str(e)}), 500


# --- BOOK CONTROLLERS ---


@app.route("/books", methods=["POST"])
def create_book():
    try:
        data = request.get_json()
        title = data.get("title")
        release_year = data.get("release_year")

        if not title:
            return jsonify({"error": "Book title is required"}), 400

        conn = get_connection()
        cur = conn.cursor()

        # Changed %s to ?
        cur.execute(
            "INSERT INTO books (title, release_year) VALUES (?, ?)",
            (title, release_year),
        )
        new_id = cur.lastrowid

        conn.commit()
        conn.close()

        return (
            jsonify({"id": new_id, "title": title, "release_year": release_year}),
            201,
        )

    except Exception as e:
        return jsonify({"error": "Server error", "details": str(e)}), 500


@app.route("/books", methods=["GET"])
def get_books():
    try:
        conn = get_connection()
        cur = conn.cursor()

        cur.execute("SELECT id, title, release_year FROM books")
        rows = cur.fetchall()

        results = []
        for row in rows:
            results.append({"id": row, "title": row, "release_year": row})

        conn.close()
        return jsonify(results), 200

    except Exception as e:
        return jsonify({"error": "Server error", "details": str(e)}), 500


# --- RELATIONSHIP CONTROLLER (Many-to-Many) ---


@app.route("/authors/<int:author_id>/books/<int:book_id>", methods=["POST"])
def link_author_and_book(author_id, book_id):
    try:
        conn = get_connection()
        cur = conn.cursor()

        # Changed %s to ?
        cur.execute(
            "INSERT INTO authors_books (author_id, book_id) VALUES (?, ?)",
            (author_id, book_id),
        )
        link_id = cur.lastrowid

        conn.commit()
        conn.close()

        return (
            jsonify(
                {
                    "message": "Linked successfully",
                    "link_id": link_id,
                    "author_id": author_id,
                    "book_id": book_id,
                }
            ),
            201,
        )

    except sqlite3.IntegrityError:  # Changed from psycopg2 to sqlite3
        return jsonify({"error": "Invalid author_id or book_id"}), 400
    except Exception as e:
        return jsonify({"error": "Server error", "details": str(e)}), 500


# --- ADVANCED GET (Using JOINs) ---


@app.route("/authors/<int:author_id>/details", methods=["GET"])
def get_author_with_books(author_id):
    try:
        conn = get_connection()
        cur = conn.cursor()

        # 1. Get Author (Changed %s to ?)
        cur.execute(
            "SELECT id, name, birth_year FROM authors WHERE id = ?", (author_id,)
        )
        author_row = cur.fetchone()

        if not author_row:
            return jsonify({"error": "Author not found"}), 404

        # 2. Get their books using JOIN via the link table (Changed %s to ?)
        query = """
            SELECT b.id, b.title, b.release_year 
            FROM books b
            JOIN authors_books ab ON ab.book_id = b.id
            WHERE ab.author_id = ?
        """
        cur.execute(query, (author_id,))
        book_rows = cur.fetchall()

        # 3. Construct the nested JSON response
        author_data = {
            "id": author_row,
            "name": author_row,
            "birth_year": author_row,
            "books": [],
        }

        for b in book_rows:
            author_data["books"].append({"id": b, "title": b, "release_year": b})

        conn.close()
        return jsonify(author_data), 200

    except Exception as e:
        return jsonify({"error": "Server error", "details": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
