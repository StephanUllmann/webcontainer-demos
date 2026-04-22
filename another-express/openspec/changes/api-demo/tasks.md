## 1. Projekt-Setup

- [x] 1.1 `tsconfig.json` konfigurieren (strict mode, baseDir, paths)
- [x] 1.2 `package.json` mit Abhängigkeiten initialisieren (express v5, mongoose, zod, winston, typescript, vitest, supertest)
- [x] 1.3 Verzeichnisstruktur anlegen (`src/models`, `src/services`, `src/routes`, `src/middleware`, `src/utils`, `src/config`)
- [x] 1.4 Umgebungsvariablen-Konfiguration (`dotenv`) und Datenbankverbindung (`mongoose`) implementieren

## 2. Gemeinsame Infrastruktur

- [x] 2.1 Strukturiertes Logging mit Winston implementieren
- [x] 2.2 Globale Error-Handling Middleware für Express v5 erstellen
- [x] 2.3 Basis-Validierungs-Middleware mit Zod erstellen
- [x] 2.4 API-Response Utility für einheitliches Format erstellen

## 3. Authentifizierung & User-Management

- [x] 3.1 User-Schema mit Mongoose inkl. Passwort-Hashing (bcrypt) erstellen
- [x] 3.2 AuthService für JWT-Generierung und Validierung implementieren
- [x] 3.3 Auth-Controller und Routen für Register/Login erstellen (HTTP-Only Cookies)
- [x] 3.4 `authGuard` Middleware zum Schutz von Routen implementieren

## 4. Autoren-Management

- [x] 4.1 Author-Schema mit Mongoose erstellen
- [x] 4.2 AuthorService mit CRUD, Suche und Pagination Logik implementieren
- [x] 4.3 AuthorController mit Zod-Validierung für Input-Daten implementieren
- [x] 4.4 Author-Routen registrieren und mit `authGuard` schützen

## 5. Bücher-Management

- [x] 5.1 Book-Schema mit Reference auf Author erstellen
- [x] 5.2 BookService mit CRUD, Suche und Pagination Logik implementieren
- [x] 5.3 BookController mit Zod-Validierung implementieren
- [x] 5.4 Book-Routen registrieren und schützen

## 6. Testing & Dokumentation

- [x] 6.1 Vitest Konfiguration für Integrationstests erstellen
- [x] 6.2 Integrationstests für Auth-Endpoints schreiben
- [x] 6.3 Integrationstests für Author & Book Endpoints schreiben
- [x] 6.4 Postman Collection exportieren oder README mit Beispielen ergänzen
