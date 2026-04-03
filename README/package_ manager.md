Erstatt eller legg til dette avsnittet i README.md (hele snippet):

md
# VybrazeRNv100

**Package manager**  
This repository uses **Yarn** as the canonical package manager. Always use Yarn for local installs and CI.

**Install locally**  
1. Remove existing node_modules:
   ```bash
   rd /s /q node_modules
Install using Yarn and the lockfile:

bash
yarn install --frozen-lockfile
Commit policy for dependencies

Always run yarn install --frozen-lockfile, npx tsc --noEmit and tests locally before committing.

Always commit yarn.lock after you have verified that types and tests pass.

Do not commit package-lock.json. It must remain ignored.

CI  
Pull requests must pass the CI workflow which runs:

yarn install --frozen-lockfile

npx tsc --noEmit

npx jest --runInBand --ci

Developer note  
If you are unsure which package manager to use, use Yarn as documented here. Do not mix npm and Yarn in the same branch.

Code

---

### GitHub Actions CI workflow
**Filsti øverst i filen:**
```text
C:\VybrazeRNv100\.github\workflows\ci.yml
Hele workflowfilen du kan opprette:

yaml
name: CI

on:
  pull_request:
    branches: [ main, strukturering_1e ]
  push:
    branches: [ main, strukturering_1e ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Type check
        run: npx tsc --noEmit

      - name: Run tests
        run: npx jest --runInBand --ci