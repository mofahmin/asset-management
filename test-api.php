<?php

// Simple API test script
echo "Testing Laravel API...\n\n";

// Test 1: Basic API endpoint
echo "1. Testing /api/test endpoint:\n";
$testResponse = file_get_contents('http://localhost:8000/api/test');
echo "Response: " . $testResponse . "\n\n";

// Test 2: Get all masjids
echo "2. Testing /api/masjids endpoint:\n";
$masjidsResponse = file_get_contents('http://localhost:8000/api/masjids');
echo "Response: " . $masjidsResponse . "\n\n";

// Test 3: Get all users
echo "3. Testing /api/users endpoint:\n";
$usersResponse = file_get_contents('http://localhost:8000/api/users');
echo "Response: " . $usersResponse . "\n\n";

echo "API testing complete!\n";
?> 