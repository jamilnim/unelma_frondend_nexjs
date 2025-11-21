"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import styles from "./serviceDetails.module.css";
import ServiceHeroSpot from "../../../component/serviceHeroSpot/ServiceHeroSpot";

export default function ServiceDetails() {
  const { slug } = useParams();
  const router = useRouter();
  const user = useSelector((state) => state.user.user);

  const [service, setService] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:1337/api/service-categories?filters[slug][$eq]=${slug}&populate=*`
        );
        const data = await res.json();
        setService(data.data[0]);

        const res2 = await fetch(
          "http://localhost:1337/api/service-categories?populate=*"
        );
        const data2 = await res2.json();
        setAllServices(data2.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) return <p className={styles.message}>Loading...</p>;
  if (!service) return <p className={styles.message}>Service not found.</p>;

  const title = service.name;
  const category = service.category;
  const description = service.description;
  const imageUrl =
    service.imageIcon?.[0]?.formats?.medium?.url || service.imageIcon?.[0]?.url;

  // ⭐ OrderCart Component
  const OrderCart = () => {
    const plans = [
      {
        name: "Business",
        price: 99,
        duration: "Yr",
        features: [
          "Unlimited Pages",
          "All Team Members",
          "Unlimited Leads",
          "Unlimited Page Views",
          "Export in HTML/CSS",
        ],
      },
      {
        name: "Professional",
        price: 199,
        duration: "Mo",
        features: [
          "Unlimited Pages",
          "All Team Members",
          "Unlimited Leads",
          "Unlimited Page Views",
          "Export in HTML/CSS",
        ],
      },
    ];

    // const handleOrder = (planName) => {
    //   if (!user) {
    //     // Redirect to login page with redirect to order page
    //     router.push(`/login?redirect=/order/${slug}?plan=${planName}`);
    //   } else {
    //     // Redirect to order page directly with plan info
    //     router.push(`/order/${slug}?plan=${planName}`);
    //   }
    // };
    const handleOrder = (plan) => {
      if (!user) {
        router.push(`/login?redirect=/order/${slug}?plan=${plan}`);
      } else {
        router.push(`/order/${slug}?plan=${plan}`);
      }
    };

    return (
      <div className={styles.orderCart}>
        <h2>Order This Service</h2>
        <div className={styles.plans}>
          {plans.map((plan) => (
            <div key={plan.name} className={styles.planBox}>
              <h3>{plan.name}</h3>
              <p className={styles.price}>
                ${plan.price} <span>/{plan.duration}</span>
              </p>
              <ul>
                {plan.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
              <button onClick={() => handleOrder(plan.name)}>Order Now</button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <ServiceHeroSpot serviceTitle={service.name} />

      <div className={styles.wrapper}>
        <div className={styles.left}>
          {imageUrl && (
            <img
              src={`http://localhost:1337${imageUrl}`}
              alt={title}
              className={styles.mainImage}
            />
          )}

          <h1 className={styles.mainTitle}>{title}</h1>
          <span className={styles.categoryTag}>{category}</span>
          <p className={styles.description}>{description}</p>

          <OrderCart />
        </div>

        <div className={styles.right}>
          <div className={styles.servicesBox}>
            {[
              ...new Map(
                allServices.map((item) => [item.category, item])
              ).values(),
            ].map((s) => (
              <Link
                key={s.id}
                href={`/services/category/${(s.category || "uncategorized")
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
                className={`${styles.serviceItem} ${
                  s.category === service.category ? styles.active : ""
                }`}
              >
                {s.category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
