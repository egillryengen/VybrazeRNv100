I CI (på hver PR / push)
CI skal alltid kjøre:

bash
yarn install --frozen-lockfile
npx tsc --noEmit
npx jest --runInBand --ci
Formål: CI verifiserer at yarn.lock er gyldig og at koden bygger og tester med akkurat de versjonene som er låst.
