## ADDED Requirements

### Requirement: CRUD for Books
Das System MUSS Endpunkte für Create, Read, Update, Delete von Büchern bereitstellen.

#### Scenario: Buch mit Autor-Referenz anlegen
- **WHEN** POST `/api/v1/books` mit Title und einer validen AuthorID gesendet wird
- **THEN** wird das Buch mit Status 201 angelegt

### Requirement: Search and Pagination for Books
Die Liste der Bücher MUSS Suche (nach Titel) und Pagination unterstützen.

#### Scenario: Bücherliste durchsuchen
- **WHEN** GET `/api/v1/books?title=Hobbit&limit=5` aufgerufen wird
- **THEN** werden maximal 5 passende Bücher zurückgegeben
