'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const API_BASE_URL = 'http://localhost:8000/api';

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  status: number;
}

export default function ApiTestPage() {
  const [responses, setResponses] = useState<ApiResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const addResponse = (response: ApiResponse) => {
    setResponses(prev => [response, ...prev.slice(0, 9)]); // Keep last 10 responses
  };

  const testApi = async (endpoint: string, options: RequestInit = {}) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      addResponse({
        success: response.ok,
        data,
        status: response.status,
        error: !response.ok ? data.message || 'Request failed' : undefined,
      });
    } catch (error) {
      addResponse({
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
        status: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  // Test data
  const testMasjid = {
    name: 'Test Masjid',
    code: 'TEST001',
    type: 'masjid',
    address: '123 Test Street',
    city: 'Test City',
    state: 'Test State',
    postal_code: '12345',
    country: 'Malaysia',
    phone: '+60123456789',
    email: 'test@masjid.com',
    website: 'https://testmasjid.com',
    capacity: 500,
    established_date: '2020-01-01',
    description: 'Test masjid for API testing',
  };

  const testAsset = {
    name: 'Test Asset',
    code: 'ASSET001',
    category: 'furniture',
    subcategory: 'chair',
    masjid_id: 1,
    purchase_date: '2023-01-01',
    purchase_price: 100.00,
    supplier: 'Test Supplier',
    warranty_expiry: '2025-01-01',
    location: 'Main Hall',
    condition: 'good',
    description: 'Test asset for API testing',
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">API Testing Dashboard</h1>
        <p className="text-muted-foreground">
          Test your Laravel backend API endpoints from Next.js
        </p>
      </div>

      <Tabs defaultValue="masjids" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="masjids">Masjids</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="masjids" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Masjid API Tests</CardTitle>
              <CardDescription>Test masjid-related endpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={() => testApi('/masjids')}
                  disabled={loading}
                  variant="outline"
                >
                  GET /masjids
                </Button>
                <Button 
                  onClick={() => testApi('/masjids/1')}
                  disabled={loading}
                  variant="outline"
                >
                  GET /masjids/1
                </Button>
                <Button 
                  onClick={() => testApi('/masjids', {
                    method: 'POST',
                    body: JSON.stringify(testMasjid),
                  })}
                  disabled={loading}
                  variant="outline"
                >
                  POST /masjids
                </Button>
                <Button 
                  onClick={() => testApi('/masjids/1', {
                    method: 'PUT',
                    body: JSON.stringify({ ...testMasjid, name: 'Updated Test Masjid' }),
                  })}
                  disabled={loading}
                  variant="outline"
                >
                  PUT /masjids/1
                </Button>
                <Button 
                  onClick={() => testApi('/masjids/1', { method: 'DELETE' })}
                  disabled={loading}
                  variant="destructive"
                >
                  DELETE /masjids/1
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Asset API Tests</CardTitle>
              <CardDescription>Test asset-related endpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={() => testApi('/assets')}
                  disabled={loading}
                  variant="outline"
                >
                  GET /assets
                </Button>
                <Button 
                  onClick={() => testApi('/assets/1')}
                  disabled={loading}
                  variant="outline"
                >
                  GET /assets/1
                </Button>
                <Button 
                  onClick={() => testApi('/assets', {
                    method: 'POST',
                    body: JSON.stringify(testAsset),
                  })}
                  disabled={loading}
                  variant="outline"
                >
                  POST /assets
                </Button>
                <Button 
                  onClick={() => testApi('/assets/1', {
                    method: 'PUT',
                    body: JSON.stringify({ ...testAsset, name: 'Updated Test Asset' }),
                  })}
                  disabled={loading}
                  variant="outline"
                >
                  PUT /assets/1
                </Button>
                <Button 
                  onClick={() => testApi('/assets/1', { method: 'DELETE' })}
                  disabled={loading}
                  variant="destructive"
                >
                  DELETE /assets/1
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User API Tests</CardTitle>
              <CardDescription>Test user-related endpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={() => testApi('/users')}
                  disabled={loading}
                  variant="outline"
                >
                  GET /users
                </Button>
                <Button 
                  onClick={() => testApi('/users/1')}
                  disabled={loading}
                  variant="outline"
                >
                  GET /users/1
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance API Tests</CardTitle>
              <CardDescription>Test maintenance-related endpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={() => testApi('/maintenance')}
                  disabled={loading}
                  variant="outline"
                >
                  GET /maintenance
                </Button>
                <Button 
                  onClick={() => testApi('/maintenance/1')}
                  disabled={loading}
                  variant="outline"
                >
                  GET /maintenance/1
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Response History */}
      <Card>
        <CardHeader>
          <CardTitle>API Response History</CardTitle>
          <CardDescription>Last 10 API responses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {responses.map((response, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={response.success ? "default" : "destructive"}>
                    {response.status}
                  </Badge>
                  <Badge variant="outline">
                    {response.success ? "Success" : "Error"}
                  </Badge>
                </div>
                {response.error && (
                  <div className="text-red-600 mb-2">
                    <strong>Error:</strong> {response.error}
                  </div>
                )}
                {response.data && (
                  <div className="bg-muted p-3 rounded text-sm">
                    <pre className="whitespace-pre-wrap overflow-x-auto">
                      {JSON.stringify(response.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ))}
            {responses.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                No API calls made yet. Click the buttons above to test endpoints.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 