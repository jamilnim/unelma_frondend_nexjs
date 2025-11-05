// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCases } from "../../lib/features/cases/caseSlice";
// import styles from "./CaseCard.module.css";

// export default function CaseCard() {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { items, loading } = useSelector((state) => state.caseStudies);

//   useEffect(() => {
//     dispatch(fetchCases());
//   }, [dispatch]);

//   useEffect(() => {
//     if (items?.length) console.log("🧠 Case Data:", items[0]);
//   }, [items]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className={styles.grid}>
//       {Array.isArray(items) && items.length > 0 ? (
//         items.map((item) => {
//           const title = item.projectName ?? "Untitled";
//           let imgUrl = null;

//           // Handle topImage array directly
//           if (Array.isArray(item.topImage) && item.topImage.length > 0) {
//             imgUrl = item.topImage[0]?.url;
//           }

//           const finalImg = imgUrl
//             ? `http://localhost:1337${imgUrl}`
//             : "https://placehold.co/600x400?text=No+Image";

//           return (
//             <div
//               key={item.id}
//               className={styles.card}
//               onClick={() => router.push(`/case/${item.case_id}`)}
//             >
//               <img src={finalImg} alt={title} />
//               <h3>{title}</h3>
//             </div>
//           );
//         })
//       ) : (
//         <p>No cases found.</p>
//       )}
//     </div>
//   );
// }
