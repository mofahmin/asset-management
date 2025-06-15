// Next.js Frontend Integration Example
// This shows how to connect your Next.js frontend to the Laravel API

// Example 1: Fetch all masjids
async function fetchMasjids() {
  try {
    const response = await fetch('http://localhost:8000/api/masjids');
    const masjids = await response.json();
    console.log('Masjids:', masjids);
    return masjids;
  } catch (error) {
    console.error('Error fetching masjids:', error);
  }
}

// Example 2: Create a new masjid
async function createMasjid(masjidData) {
  try {
    const response = await fetch('http://localhost:8000/api/masjids', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(masjidData),
    });
    const newMasjid = await response.json();
    console.log('Created masjid:', newMasjid);
    return newMasjid;
  } catch (error) {
    console.error('Error creating masjid:', error);
  }
}

// Example 3: Update a masjid
async function updateMasjid(id, masjidData) {
  try {
    const response = await fetch(`http://localhost:8000/api/masjids/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(masjidData),
    });
    const updatedMasjid = await response.json();
    console.log('Updated masjid:', updatedMasjid);
    return updatedMasjid;
  } catch (error) {
    console.error('Error updating masjid:', error);
  }
}

// Example 4: Delete a masjid
async function deleteMasjid(id) {
  try {
    const response = await fetch(`http://localhost:8000/api/masjids/${id}`, {
      method: 'DELETE',
    });
    console.log('Masjid deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting masjid:', error);
  }
}

// Example 5: React Hook for fetching data
import { useState, useEffect } from 'react';

function useMasjids() {
  const [masjids, setMasjids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMasjids()
      .then(data => {
        setMasjids(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { masjids, loading, error };
}

// Example 6: React Component
function MasjidList() {
  const { masjids, loading, error } = useMasjids();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Masjids</h1>
      {masjids.map(masjid => (
        <div key={masjid.id}>
          <h3>{masjid.name}</h3>
          <p>Code: {masjid.code}</p>
          <p>Type: {masjid.type}</p>
          <p>Address: {masjid.address}</p>
        </div>
      ))}
    </div>
  );
}

// Export for use in Next.js
export { fetchMasjids, createMasjid, updateMasjid, deleteMasjid, useMasjids, MasjidList }; 