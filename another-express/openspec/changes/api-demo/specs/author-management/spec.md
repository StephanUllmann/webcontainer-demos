## ADDED Requirements

### Requirement: CRUD for Authors
Das System MUSS Endpunkte für Create, Read, Update, Delete von Autoren bereitstellen.

#### Scenario: Autor anlegen
- **WHEN** POST `/api/v1/authors` mit validen Daten gesendet wird
- **THEN** wird ein Status 201 und der neue Autor zurückgegeben

### Requirement: Search and Pagination for Authors
Die Liste der Autoren MUSS Suche (nach Name) und Pagination (mittels limit/offset/page) unterstützen.

#### Scenario: Autorenliste mit Filter
- **WHEN** GET `/api/v1/authors?name=King&limit=10&page=3` aufgerufen wird
- **THEN** werden maximal 10 passende Autoren zurückgegeben mit einem Offset von 20 Einträgen
