"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import styles from "./serviceDetails.module.css";
import ServiceHeroSpot from "../../../component/serviceHeroSpot/ServiceHeroSpot";
import PageTransition from "../../../component/animation/PageTransition";
import FadeInSection from "../../../component/animation/FadeInSection";

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
        const [serviceRes, allServicesRes] = await Promise.all([
          fetch(
            `http://localhost:1337/api/service-categories?filters[slug][$eq]=${slug}&populate=*`
          ),
          fetch("http://localhost:1337/api/service-categories?populate=*"),
        ]);

        const serviceData = await serviceRes.json();
        setService(serviceData.data[0]);

        const allServicesData = await allServicesRes.json();
        setAllServices(allServicesData.data);
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

  const { name: title, category, description, imageIcon } = service;
  const imageUrl = imageIcon?.[0]?.formats?.medium?.url || imageIcon?.[0]?.url;

 

  // ---------------------------------------------------------
  // ORDER CART
  // ---------------------------------------------------------
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

    const handleOrder = (plan) => {
      const orderPath = `/services/order/${slug}?plan=${
        plan.name
      }&serviceName=${encodeURIComponent(title)}&price=${plan.price}`;

      if (user === undefined) {
        console.log("User info loading...");
        return;
      }

      if (!user) {
        // Not logged in → redirect to login with redirect back to order page
        router.push(`/login?redirect=${encodeURIComponent(orderPath)}`);
        return;
      }

      // Logged in → go directly to order page
      router.push(orderPath);
    };

    return (
      <PageTransition>
        <FadeInSection>
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
                {plan.features.map((feat, index) => (
                  <li key={index}>{feat}</li>
                ))}
              </ul>

              <button onClick={() => handleOrder(plan)}>Order Now</button>
            </div>
          ))}
        </div>
      </div>
      </FadeInSection>
      </PageTransition>
    );
  };

  // Unique categories for sidebar
  const uniqueCategories = [
    ...new Map(allServices.map((s) => [s.category, s])).values(),
  ];

  return (
    <div>
      <ServiceHeroSpot serviceTitle={title} />

      <div className={styles.wrapper}>
        {/* LEFT CONTENT */}
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

          {/* ORDER CART */}
          <OrderCart />
        </div>

        {/* RIGHT SIDEBAR */}
        <div className={styles.right}>
          <div className={styles.servicesBox}>
            {uniqueCategories.map((s) => (
              <div
                key={s.id}
                className={`${styles.serviceItem} ${
                  s.category === category ? styles.active : styles.disabled
                }`}
              >
                {s.category}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
