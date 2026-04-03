Etter du restorerer en commit (lokalt)
Hvis commit inneholder yarn.lock:

Kjør:

bash
rd /s /q node_modules
yarn install --frozen-lockfile
Dette bygger node_modules nøyaktig fra yarn.lock.

Hvis commit mangler yarn.lock:

Kjør:

bash
rd /s /q node_modules
yarn install
Verifiser npx tsc --noEmit og tester. Hvis alt er grønt, commit yarn.lock (se policy).