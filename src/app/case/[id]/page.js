'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CaseDetail from '../../../component/case/CaseDetail';

export default function CaseDetailPage() {
  const { id } = useParams(); // id = documentId, not numeric
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ⚠️ query by documentId, NOT numeric id
        const res = await fetch(
          `http://localhost:1337/api/case-studies?filters[case_id][$eq]=${id}&populate=*`
        );
        const json = await res.json();
        console.log('📦 Full Strapi Response:', json);
        setItem(json.data?.[0]); // pick the first entry
      } catch (err) {
        console.error('❌ Error fetching case:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Case not found.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <button
        onClick={() => router.back()}
        style={{
          marginBottom: '1rem',
          background: '#0070f3',
          color: 'white',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        ← Back
      </button>

      {/* ✅ Pass correct shape */}
      <CaseDetail item={item} />
    </div>
  );
}
