#!/usr/bin/env sh
set -eu

API="http://kong:8000"
ADMIN="http://kong:8001/status"

wait_for() {
  url="$1"
  name="$2"
  retries=60
  echo "Waiting for $name at $url..."

  while [ "$retries" -gt 0 ]; do
    if curl -sf -o /dev/null "$url" >/dev/null 2>&1; then
      echo "$name is available."
      return 0
    fi
    retries=$((retries - 1))
    sleep 2
  done

  echo "ERROR: $name did not become available after 2 minutes."
  exit 1
}

wait_for "$ADMIN" "Kong admin"
wait_for "$API/api/v1/products" "Product API"

echo "Starting sample load generator against $API..."

for i in $(seq 1 20); do
  echo "Run #$i"
  curl -sS "$API/api/v1/products" >/dev/null 2>&1 || true

  CUSTOMER_ID="CUS$(printf "%03d" "$i")"
  PAYLOAD=$(cat <<EOF
{"customerId":"$CUSTOMER_ID","productCode":"P001","depositAmount":1000000,"currency":"VND"}
EOF
)

  RESPONSE=$(curl -sS -X POST -H "Content-Type: application/json" -d "$PAYLOAD" "$API/api/v1/accounts" 2>/dev/null || true)
  ACCOUNT_ID=$(python - <<'PY'
import json,sys
try:
    body=sys.stdin.read().strip()
    if not body:
        raise SystemExit
    obj=json.loads(body)
    print(obj.get('id',''))
except Exception:
    print('')
PY
<<<"$RESPONSE")

  if [ -n "$ACCOUNT_ID" ] && [ "$ACCOUNT_ID" != "null" ]; then
    curl -sS "$API/api/v1/accounts/$ACCOUNT_ID" >/dev/null 2>&1 || true
    curl -sS -X PUT "$API/api/v1/accounts/$ACCOUNT_ID/freeze" >/dev/null 2>&1 || true
    curl -sS -X PUT "$API/api/v1/accounts/$ACCOUNT_ID/unfreeze" >/dev/null 2>&1 || true
  fi

  sleep 1
done

echo "Sample load generator finished."
