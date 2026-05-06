import os
import psycopg2
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from datetime import datetime

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)


def get_connection():
    # psycopg2.connect can parse the connection string directly
    conn_string = os.getenv("PG_URI")
    if not conn_string:
        raise RuntimeError("PG_URI not set in .env file")
    return psycopg2.connect(conn_string)


# --- DATABASE SETUP (Run once to init tables) ---
def init_db():
    try:
        conn = get_connection()
        cur = conn.cursor()

        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS authors (
                id serial primary key,
                name varchar(255),
                birth_year int
            );
            
            CREATE TABLE IF NOT EXISTS books (
                id serial primary key,
                title varchar(255),
                release_year int
            );

            CREATE TABLE IF NOT EXISTS authors_books (
                id serial primary key,
                author_id int,
                book_id int,
                FOREIGN KEY (author_id) REFERENCES authors(id),
                FOREIGN KEY (book_id) REFERENCES books(id)
            );
        """
        )

        conn.commit()
        cur.close()
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

        cur.execute(
            "INSERT INTO authors (name, birth_year) VALUES (%s, %s) RETURNING id",
            (name, birth_year),
        )
        new_id = cur.fetchone()[0]

        conn.commit()
        cur.close()
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
            results.append({"id": row[0], "name": row[1], "birth_year": row[2]})

        cur.close()
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

        cur.execute(
            "INSERT INTO books (title, release_year) VALUES (%s, %s) RETURNING id",
            (title, release_year),
        )
        new_id = cur.fetchone()[0]

        conn.commit()
        cur.close()
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
            results.append({"id": row[0], "title": row[1], "release_year": row[2]})

        cur.close()
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

        # Check if they exist first (Optional, but good practice in raw SQL)
        # For brevity, we will let the Foreign Key constraint fail if they don't exist

        cur.execute(
            "INSERT INTO authors_books (author_id, book_id) VALUES (%s, %s) RETURNING id",
            (author_id, book_id),
        )
        link_id = cur.fetchone()[0]

        conn.commit()
        cur.close()
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

    except psycopg2.IntegrityError:
        return jsonify({"error": "Invalid author_id or book_id"}), 400
    except Exception as e:
        return jsonify({"error": "Server error", "details": str(e)}), 500


# --- ADVANCED GET (Using JOINs) ---


@app.route("/authors/<int:author_id>/details", methods=["GET"])
def get_author_with_books(author_id):
    try:
        conn = get_connection()
        cur = conn.cursor()

        # 1. Get Author
        cur.execute(
            "SELECT id, name, birth_year FROM authors WHERE id = %s", (author_id,)
        )
        author_row = cur.fetchone()

        if not author_row:
            return jsonify({"error": "Author not found"}), 404

        # 2. Get their books using JOIN via the link table
        query = """
            SELECT b.id, b.title, b.release_year 
            FROM books b
            JOIN authors_books ab ON ab.book_id = b.id
            WHERE ab.author_id = %s
        """
        cur.execute(query, (author_id,))
        book_rows = cur.fetchall()

        # 3. Construct the nested JSON response
        author_data = {
            "id": author_row[0],
            "name": author_row[1],
            "birth_year": author_row[2],
            "books": [],
        }

        for b in book_rows:
            author_data["books"].append(
                {"id": b[0], "title": b[1], "release_year": b[2]}
            )

        cur.close()
        conn.close()
        return jsonify(author_data), 200

    except Exception as e:
        return jsonify({"error": "Server error", "details": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
