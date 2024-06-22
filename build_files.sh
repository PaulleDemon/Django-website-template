#!/bin/bash
python3 -m pip install -r requirements.txt
python3 manage.py collectstatic --noinput

# For vercel write the encoded firebase creds from env to file

# Read base64 encoded text from an environment variable
encoded_text="$FIREBASE_ENCODED"

# Use Python to decode the base64 text and convert it to JSON
python3 - <<EOF
import base64
import json
import sys

# Read the base64 encoded text from the shell script argument
encoded_text = "$encoded_text"

if not encoded_text:
    print("Error: FIREBASE_ENCODED environment variable is not set or empty.", file=sys.stderr)
    sys.exit(1)

# Decode the base64 encoded text
try:
    decoded_bytes = base64.b64decode(encoded_text)
    decoded_text = decoded_bytes.decode('utf-8')
except Exception as e:
    print(f"Error decoding base64 text: {e}", file=sys.stderr)
    sys.exit(1)

# Convert the decoded text to JSON (assuming the decoded text is a valid JSON string)
try:
    json_data = json.loads(decoded_text)
except json.JSONDecodeError as e:
    print(f"Error decoding JSON: {e}", file=sys.stderr)
    sys.exit(1)

# Output the JSON data
print(json.dumps(json_data, indent=4))
EOF