'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CaseDetail from '../../../component/case/CaseDetail';

export default function CaseDetailPage() {
  const { id } = useParams(); // case_id
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:1337/api/case-studies?filters[case_id][$eq]=${id}&populate=*`
        );
        const json = await res.json();

        // 🟢 Add this console log right here:
        console.log("📦 Full Strapi Response:", JSON.stringify(json, null, 2));

        setItem(json.data?.[0]);
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

      <CaseDetail item={item} />
    </div>
  );
}
