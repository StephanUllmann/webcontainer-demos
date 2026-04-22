## Why

Ich möchte ein Referenzprojekt für eine REST-API mit Express und TypeScript erstellen, das Best Practices in den Bereichen Architektur, Validierung, Authentifizierung und Testing veranschaulicht. Dies dient als Demoprojekt für moderne Backend-Entwicklung.

## What Changes

- Initialer Aufbau der Projektstruktur mit TypeScript und Express.
- Implementierung einer Bücher- und Autorenverwaltung mit CRUD-Operationen.
- Integration von MongoDB und Mongoose für die Datenpersistenz.
- Implementierung von JWT-basierter Authentifizierung mittels Secure, Http-Only Cookies.
- Request-Validierung mit Zod.
- Zentrales Error-Handling unter Nutzung von Express v5 Features.
- Strukturiertes Logging mit Winston.
- Integrationstests mit Vitest und Supertest.

## Capabilities

### New Capabilities
- `auth`: JWT-basierte Authentifizierung mit HTTP-Only Cookies.
- `author-management`: CRUD-Operationen für Autoren inkl. Suche und Pagination.
- `book-management`: CRUD-Operationen für Bücher inkl. Suche und Pagination.
- `shared-infrastructure`: Gemeinsame Infrastruktur wie Logging, Error-Handling und Validierung.

### Modified Capabilities
- (Keine bestehenden Capabilities vorhanden.)

## Impact

- Neues Projektverzeichnis mit vollständiger TS-Konfiguration.
- API-Endpunkte unter `/api/v1`.
- Abhängigkeiten: express, mongoose, zod, jsonwebtoken, winston, vitest, supertest.
