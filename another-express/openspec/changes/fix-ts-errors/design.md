## Context

In den Express-Routen `src/routes/author.routes.ts` und `src/routes/book.routes.ts` wird `req.params.id` direkt an Service-Methoden übergeben. Da Express `req.params` als `string | string[]` (oder ähnliche komplexe Typen in manchen Konfigurationen) interpretieren kann, kommt es zu einem Typkonflikt mit den Service-Methoden, die einen einfachen `string` erwarten.

## Goals / Non-Goals

**Goals:**
- Behebung aller `TS2345` Fehler in den Routen-Dateien.
- Sicherstellung, dass die IDs vor der Übergabe an Services als `string` validiert/gecastet werden.
- Erfolgreicher Durchlauf von `npx tsc --noEmit`.

**Non-Goals:**
- Refactoring der gesamten Service-Schicht.
- Änderung der API-Endpunkte oder Pfadparameter-Logik.

## Decisions

- **Type Casting/Assertion**: Wir verwenden `req.params.id as string`, da in diesen spezifischen Routen die ID immer ein einzelner String ist (definiert durch den Pfad `/:id`). Dies ist die pragmatischste Lösung für dieses spezifische Typproblem in Express-Routern.
- Alternativ könnte man prüfen, ob `req.params.id` ein Array ist, aber da Express-Pfadparameter bei `:id` keine Arrays liefern (außer bei speziellen Regex-Handlern), ist ein Cast sicher und effizient.

## Risks / Trade-offs

- **[Risk]** Unvorhergesehene Array-Werte → **Mitigation**: Standard-Express-Router-Verhalten garantiert String für benannte Pfadparameter.
