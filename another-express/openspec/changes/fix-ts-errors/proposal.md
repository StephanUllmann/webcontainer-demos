## Why

Aktuell gibt es TypeScript-Fehler in den Routen-Dateien (`src/routes/author.routes.ts` und `src/routes/book.routes.ts`), da `req.params.id` als `string | string[]` typisiert ist, aber die entsprechenden Service-Methoden nur einen einfachen `string` erwarten. Dies verhindert einen sauberen Build und beeinträchtigt die Typsicherheit.

## What Changes

- Behebung der Typkonflikte in `src/routes/author.routes.ts`.
- Behebung der Typkonflikte in `src/routes/book.routes.ts`.
- Sicherstellung, dass `req.params.id` korrekt als `string` behandelt wird, bevor es an die Service-Methoden übergeben wird.

## Capabilities

### New Capabilities
- Keine neuen fachlichen Capabilities.

### Modified Capabilities
- `shared-infrastructure`: Verbesserung der Typsicherheit in den Express-Handlern.

## Impact

- Betroffene Dateien: `src/routes/author.routes.ts`, `src/routes/book.routes.ts`.
- Keine Änderungen an APIs oder Abhängigkeiten, lediglich interne Typ-Korrekturen.
