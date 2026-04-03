Commit‑checkliste for å sikre at en commit speiler repoet nøyaktig
Kopier denne sjekklisten og følg den før du lager en commit som skal være et reproduserbart snapshot.

Før commit

Oppdater arbeidsbranch

cmd
git fetch origin
git checkout <din-branch>
git pull --rebase origin <din-branch>
Installer avhengigheter lokalt og verifiser

cmd
rd /s /q node_modules
yarn install --frozen-lockfile
npx tsc --noEmit
npx jest --clearCache
npx jest --runInBand
Hvis noe feiler: stopp. Ikke commit. Kopier feilmeldingene og løs dem før du går videre.

Sjekk at lockfile er oppdatert og sporet

Sørg for at yarn.lock commites

Sørg for at yarn.lock er endret hvis installasjonen endret noe.

Ikke legg til package-lock.json. Hvis den finnes lokalt, fjern eller ignorer den.

Sjekk .gitignore for at package-lock.json er ignorert og yarn.lock spores.

cmd
findstr /N "package-lock.json" .gitignore || echo "package-lock.json" >> .gitignore
git add .gitignore
Lag commit med tydelig melding og inkluder yarn.lock:

cmd
git add -A
git add yarn.lock
git commit -m "type: kort beskrivelse — inkluderer yarn.lock etter verifisering"
Push og verifiser remote

cmd
git push origin <din-branch>
Etter commit

Åpne PR og bekreft at CI kjører og at jobben som kjører yarn install --frozen-lockfile og npx tsc --noEmit passerer før merge.
