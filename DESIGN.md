# Adrenalink – Designdokument

## Kunskapsdomän

Adrenalink är ett bokningssystem för vattensporter – surf, windsurf och kitesurf. Systemet sätter ihop tre aktörer: **skolor** som erbjuder lektioner, **instruktörer** som håller i dem och **elever** som bokar. Det är alltså en marknadsplats snarare än ett internt system, och domänen styrs av några centrala affärsregler:

- En lektion tillhör alltid en skola och har en sporttyp, en svårighetsgrad och ett lektionsformat (grupp eller privat).
- Tillgänglighet hanteras via tidsluckor (slots). Varje slot kopplas till en lektion och har ett startdatum plus en boolesk flagga `isBooked`. Det innebär att systemet vet exakt hur många platser som finns lediga vid varje tillfälle.
- En elev kan betygsätta en skola (1–5) men bara en gång per skola. Systemet förhindrar dubbelbetyg på databasnivå.
- Favoriter kan sättas på antingen en lektion eller en skola. En elev får inte favoritmarkera samma objekt två gånger.
- Geografisk placering är central – skolor och lektioner lagrar koordinater (lat/lng) för att visas på karta.

---

## Databasdesign

Databasen är relationell (MySQL) och hanteras via Prisma ORM. Schemat har sex tabeller:

```
users ──┬──< ratings >── schools ──< lessons ──< available_times
        └──< favorites >──┤
                          └────────── lessons
```

| Tabell | Syfte |
|--------|-------|
| `users` | Konton med roll (STUDENT / INSTRUCTOR / ADMIN). Lagrar kontaktuppgifter och profilbild. |
| `schools` | Skolprofiler med namn, adress och koordinater. |
| `lessons` | Lektionserbjudanden kopplade till en skola. Innehåller sporttyp, nivå, pris och utrustningsinfo. |
| `available_times` | Tidsluckor per lektion med `isBooked`-status. Raderas kaskad om lektionen tas bort. |
| `ratings` | Betyg (1–5) per användare och skola. Unik constraint på `(userId, schoolId)`. |
| `favorites` | Kopplar en användare till antingen en lektion eller en skola. Unik constraint på varje kombination. |

Kaskadborttagning är definierad på `available_times` (via `lessonId`) och på `ratings` och `favorites` (via `userId` och `schoolId`/`lessonId`), vilket gör att dataintegritet upprätthålls automatiskt.

---

## Arkitektur och teknikval

Projektet är uppdelat i en backend och en frontend som kommunicerar via ett REST-API.

**Backend – `/Server`**
- Node.js med Express och TypeScript
- Prisma ORM mot MySQL
- JWT för autentisering, bcrypt för lösenordshashning
- Strukturerat i lager: routes → controllers → services → databas

**Frontend – `/client`**
- React 19 med React Router och TypeScript
- TanStack Query för datahämtning och cachning
- MapLibre GL för kartvisning av skolor och lektioner
- SCSS för stilar

Valet av Prisma motiveras av att det ger typsäkra databasanrop direkt i TypeScript och gör schemaförändringar spårbara via migrationsfiler. TanStack Query valdes för att undvika manuell hantering av laddnings- och feltillstånd vid API-anrop.

---

## Designbeslut och resonemang

**Rollsystemet är förberett men inte fullt implementerat.** Databasen stöder tre roller (STUDENT, INSTRUCTOR, ADMIN), men i nuläget är de flesta skyddade endpoints öppna för alla inloggade användare. Beslutet att lägga in rollerna tidigt handlar om att det är svårt att lägga till dem i efterhand utan att bryta befintlig logik.

**Slots istället för kapacitetsräknare.** Tillgänglighet modelleras som explicita tidsluckor snarare än ett numeriskt fält (`capacity`). Det ger mer flexibilitet – varje bokning kan i framtiden kopplas direkt till en specifik slot och ett specifikt bokat användarkonto, utan att schemat behöver förändras.

**Favoriter kan peka på antingen lektion eller skola.** Den valda lösningen använder en gemensam `favorites`-tabell med två valfria foreign keys. En alternativ design hade varit separata tabeller (`school_favorites`, `lesson_favorites`), men den gemensamma tabellen håller favorit-logiken samlad och förenklar API:et.

**Koordinater lagras i databasen.** Istället för att söka upp koordinater vid varje sidladdning geocodas adressen en gång (vid skapandet av en skola eller lektion) och sparas som `lat`/`lng`. Det minskar beroendet av externa tjänster och ger snabbare kartrendering.

**Deployment.** Frontend är driftsatt på Vercel (`adrenalink-webb.vercel.app`) och backend tillåter explicit den origin i CORS-konfigurationen, vilket är en enkel men tydlig separation av miljöer.
