## Context

Das Projekt dient als Referenz für eine moderne REST-API mit Express und TypeScript. Da keine bestehende Codebasis vorhanden ist, wird die Grundstruktur von Null aufgebaut.

## Goals / Non-Goals

**Goals:**
- Implementierung einer sauberen 3-Tier Architektur (Routes -> Services -> Models).
- Nutzung von Express v5 für eingebautes Promise-basiertes Error-Handling.
- Typsicherheit durchgängig von der Validierung (Zod) bis zur Datenbank (Mongoose).
- Sicherer Auth-Flow via HTTP-Only Cookies zur Vermeidung von XSS.
- Umfassende Integrationstests zur Sicherstellung der API-Verträge.

**Non-Goals:**
- Implementierung eines Frontends.
- Komplexe Deployment-Szenarien (CI/CD, Kubernetes).
- Erweiterte Auth-Features wie Password Reset oder Social Login.

## Decisions

- **Express v5**: Wahl der aktuellen Version, um Middleware-Wrapper für asynchrone Fehler zu vermeiden.
- **Zod**: Bevorzugt gegenüber Joi, da Zod hervorragende Type Inference bietet und perfekt mit TypeScript harmoniert.
- **Repository Pattern (implizit via Services)**: Services kapseln die Business Logik und nutzen Mongoose Models, um die Datenbank-Interaktion zu isolieren.
- **Winston for Logging**: Ermöglicht unterschiedliche Transports (Console, File) und strukturiertes JSON-Logging.
- **Vitest + Supertest**: Vitest ist schneller als Jest und bietet eine moderne API; Supertest ist der Standard für Express-Integrationstests.

## Risks / Trade-offs

- **Risk**: Mongoose Type-Safety kann bei komplexen Schemas schwierig sein.
- **Mitigation**: Verwendung von `InferSchemaType` von Mongoose und dedizierten Zod-Schemas für I/O.
- **Risk**: Cookie-basierte Auth erfordert CSRF-Schutz.
- **Mitigation**: Implementierung von SameSite Cookie-Attributen und ggf. CSRF-Middleware, falls Browser-Clients unterstützt werden sollen (für diese Demo primär Fokus auf SameSite: Strict).
