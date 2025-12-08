// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams, useParams } from "next/navigation";
// import { useSelector } from "react-redux";
// import styles from "./orderPage.module.css";

// export default function OrderInformation() {
//   const router = useRouter();
//   const params = useParams();
//   const searchParams = useSearchParams();

//   const slug = params.slug;
//   const plan = searchParams.get("plan") || "Business";

//   const user = useSelector((state) => state.user.user);

//   const price = plan === "Professional" ? 199 : 99;

//   const [form, setForm] = useState({
//     userName: "",
//     userEmail: "",
//     serviceName: slug,
//     plan: plan,
//     price,
//     orderstatus: "pending",
//     category: "service",
//   });

//   // -------------------------
//   // IF USER NOT LOGGED IN → redirect to login
//   // -------------------------
//   useEffect(() => {
//     if (!user) {
//       router.push(`/login?redirect=/order/${slug}?plan=${plan}`);
//     }
//   }, [user]);

//   // -------------------------
//   // PREFILL USER DATA
//   // -------------------------
//   useEffect(() => {
//     if (user) {
//       setForm((prev) => ({
//         ...prev,
//         userName: user.username || user.name || "",
//         userEmail: user.email || "",
//       }));
//     }
//   }, [user]);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   // -------------------------
//   // SUBMIT ORDER → CREATE IN STRAPI
//   // -------------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch("http://localhost:1337/api/orders", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ data: form }),
//     });

//     const data = await res.json();

//     if (data?.data?.id) {
//       router.push(`/order/confirm/${data.data.id}`);
//     }
//   };

//   if (!user) return null; // prevents UI flash

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Complete Your Order</h1>
//       <p className={styles.subtitle}>Review and confirm your information</p>

//       <div className={styles.wrapper}>
//         <form className={styles.form} onSubmit={handleSubmit}>
//           <label>Name</label>
//           <input
//             name="userName"
//             type="text"
//             value={form.userName}
//             onChange={handleChange}
//             required
//           />

//           <label>Email</label>
//           <input
//             name="userEmail"
//             type="email"
//             value={form.userEmail}
//             onChange={handleChange}
//             required
//           />

//           <label>Service</label>
//           <input value={slug} disabled />

//           <label>Plan</label>
//           <input value={plan} disabled />

//           <label>Price</label>
//           <input value={`$${price}`} disabled />

//           <button type="submit" className={styles.submit}>
//             Continue
//           </button>
//         </form>

//         <div className={styles.summary}>
//           <h3>Order Summary</h3>
//           <p>
//             <strong>Service:</strong> {slug}
//           </p>
//           <p>
//             <strong>Plan:</strong> {plan}
//           </p>
//           <p>
//             <strong>Price:</strong> ${price}
//           </p>
//           <p>
//             <strong>Status:</strong> Pending
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
