## ADDED Requirements

### Requirement: ID-Typkonvertierung in Routen
Die Express-Routen SHALL sicherstellen, dass Pfadparameter (insbesondere `id`), die an Service-Methoden übergeben werden, explizit als `string` behandelt werden, um TypeScript-Typkonflikte zu vermeiden.

#### Scenario: Erfolgreiches Casting der ID
- **WHEN** Eine Anfrage an einen Endpunkt mit `:id` Parameter eingeht (z.B. `GET /authors/:id`)
- **THEN** Die ID wird als `string` an den entsprechenden Service (z.B. `AuthorService.getAuthorById`) übergeben.
