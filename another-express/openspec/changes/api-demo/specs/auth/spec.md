## ADDED Requirements

### Requirement: User Registration
Das System MUSS Endpunkte zur Benutzerregistrierung anbieten.

#### Scenario: Erfolgreiche Registrierung
- **WHEN** POST `/api/v1/auth/register` mit Email und Passwort gesendet wird
- **THEN** wird ein neuer Benutzer in der DB angelegt und Status 201 zurückgegeben

### Requirement: JWT Login via Cookies
Der Login MUSS ein JWT generieren, welches als Secure, Http-Only Cookie an den Client gesendet wird.

#### Scenario: Erfolgreicher Login
- **WHEN** POST `/api/v1/auth/login` mit validen Credentials erfolgt
- **THEN** wird ein Status 200 und das `Set-Cookie`-Header mit dem JWT gesendet

### Requirement: Authentication Guard
Geschützte Routen MÜSSEN den Authentication Guard nutzen, um Validität des JWT zu prüfen.

#### Scenario: Zugriff ohne Cookie
- **WHEN** GET `/api/v1/books` ohne auth Cookie aufgerufen wird
- **THEN** antwortet der Server mit Status 401 Unauthorized
