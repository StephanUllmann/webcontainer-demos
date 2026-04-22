## ADDED Requirements

### Requirement: Global Error Handling
Das System MUSS alle Fehler zentral über eine Express v5 Middleware behandeln. Fehler die durch asynchrone Funktionen geworfen werden, müssen automatisch gefangen werden.

#### Scenario: Global Error Handler fängt asynchronen Fehler
- **WHEN** eine asynchrone Route einen Fehler wirft
- **THEN** antwortet die API mit einem einheitlichen Fehlerformat `{ error: "Nachricht", status: 500 }`

### Requirement: Unified Logging
Das System MUSS alle HTTP-Anfragen und Fehler mittels Winston protokollieren.

#### Scenario: Request Logging
- **WHEN** eine gültige Anfrage eingeht
- **THEN** wird eine Protokollzeile mit Method, Path und Statuscode erstellt

### Requirement: Zod Schema-Validierung
Eingehende Daten (Body, Query, Params) MUST mittels Zod validiert werden, bevor sie verarbeitet werden.

#### Scenario: Ungültiger Request-Body
- **WHEN** ein User-Registrierungs-Request ohne Passwort gesendet wird
- **THEN** antwortet die API mit Status 400 und detaillierten Validierungsfehlern
