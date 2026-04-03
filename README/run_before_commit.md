lltid gjør dette før du committer:

bash
rd /s /q node_modules
yarn install --frozen-lockfile   # hvis yarn.lock finnes
# eller
yarn install                     # hvis du må generere yarn.lock
npx tsc --noEmit
npx jest --runInBand
Hvis du måtte kjøre yarn install (og yarn.lock ble endret), legg til og commit yarn.lock før du pusher.