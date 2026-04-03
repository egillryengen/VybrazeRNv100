# Contributing to VybrazeRNv100

## Kort policy
- **Bruk Yarn** som canonical package manager.
- Alltid verifiser lokalt før commit: installer, typecheck og kjør tester.
- Alltid commit `yarn.lock` etter at du har verifisert at alt fungerer.

## Lokal arbeidsflyt før commit
1. Oppdater branch:
   ```bash
   git fetch origin
   git checkout <din-branch>
   git pull --rebase origin <din-branch>
