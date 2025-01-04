#!/bin/bash

# Your Supabase project URL and JWT token
PROJECT_URL="https://vxvbmrcogvtxqgzxnafg.supabase.co"
JWT_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4dmJtcmNvZ3Z0eHFnenhub2ZnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNDQwMDc0MCwiZXhwIjoyMDE5OTc2NzQwfQ.JFJ5OFXGOXPxuYgxZtEBXxJGGQxEZOKtPEEPGQVHQXE"

# Test data
JSON_DATA='{
  "orderDetails": {
    "orderId": "TEST-123",
    "customerName": "Test Customer",
    "customerEmail": "reeceharding@gmail.com",
    "modelDetails": {
      "name": "Summit 308",
      "size": "14x22"
    },
    "selectedOptions": {
      "entry": "Front Entry",
      "siding": "Lap Siding",
      "sidingColor": "Desert Sand",
      "windows": "More Privacy",
      "interior": "Fully Equipped",
      "exteriorAddons": ["Premium Lighting Package"]
    },
    "pricing": {
      "basePrice": 75000,
      "totalPrice": 85000
    }
  }
}'

# Make the request
echo "Testing email function..."
curl -v -X POST "${PROJECT_URL}/functions/v1/send-order-confirmation" \
  -H "Authorization: Bearer ${JWT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "$JSON_DATA" 