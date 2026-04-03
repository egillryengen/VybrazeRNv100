Arbeid lokalt

Endre kode.

Kjør:

bash
rd /s /q node_modules
yarn install --frozen-lockfile || yarn install
npx tsc --noEmit
npx jest --runInBand
Hvis yarn.lock ble oppdatert: git add yarn.lock && git commit -m "chore: update yarn.lock".

Push / opprett PR

CI kjører yarn install --frozen-lockfile && npx tsc --noEmit && npx jest.

Hvis CI feiler på --frozen-lockfile, må du reprodusere lokalt, oppdatere yarn.lock og committe den.

Merge når CI er grønt.
