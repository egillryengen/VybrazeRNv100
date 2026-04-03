## Sammendrag
Kort beskrivelse av hva denne PRen gjør og hvorfor.

## Endringer
- Liste over hovedendringer (1–3 punkter).
- Hvilke filer/områder som er berørt.

## Hvordan teste lokalt
1. Sjekk ut branch: `git checkout <din-branch>`
2. Fjern node_modules: `rd /s /q node_modules`
3. Installer: `yarn install --frozen-lockfile`
4. Typecheck: `npx tsc --noEmit`
5. Kjør tester: `npx jest --runInBand`

## Sjekkliste før merge (obligatorisk)
- [ ] `yarn install --frozen-lockfile` kjørt lokalt
- [ ] `npx tsc --noEmit` passert lokalt
- [ ] `npx jest --runInBand` passert lokalt
- [ ] `yarn.lock` er inkludert i commit hvis den ble endret
- [ ] `package-lock.json` er **ikke** inkludert
- [ ] Endringer dokumentert i README eller relevant dokumentasjon
- [ ] Ingen sensitive data eller hemmeligheter i commit

## Notater til reviewer
- Spesielle ting å se etter (API‑endringer, breaking changes, ytelse, sikkerhet).
- Eventuelle manuelle steg for QA.

