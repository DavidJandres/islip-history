#!/bin/sh
# Full QA battery, one command:  sh scripts/qa.sh
# typecheck · lint · search unit/real/target tests · integrity (routes,
# anchors, duplicate ids, bibliography order+coverage, image alt/credit,
# collections links, search recall) · production build · flash regression ·
# historical-overclaim grep. Exits non-zero on the first failure.
set -e
cd "$(dirname "$0")/.."

echo "== typecheck ==" && npm run typecheck --silent
echo "== lint ==" && npm run lint --silent
echo "== tests ==" && npm test --silent
echo "== build ==" && npm run build --silent > /dev/null
echo "== flash regression ==" && npm run check:flash --silent
echo "== overclaim grep =="
# Terms that must never appear as unhedged claims. "headquarters" and
# "thanked" must not appear at all in content; the others are checked for
# known-safe (hedged/explained) contexts by count.
if grep -rniE "british headquarters|thanked the spies|thanked the revolutionary spies" src/lib src/i18n --include='*.ts' --include='*.json' | grep -q .; then
  echo "FAIL: unhedged overclaim wording found"; exit 1
fi
if grep -rniE "\b(definitely|certainly) (was|had|did)\b|proof that .* (spy|culper)" src/lib src/i18n --include='*.ts' --include='*.json' \
  | grep -viE "not claim|does not|cannot|no claim" | grep -q .; then
  echo "FAIL: certainty wording near contested claims"; exit 1
fi
echo "overclaim grep clean"
echo "QA BATTERY PASSED"
