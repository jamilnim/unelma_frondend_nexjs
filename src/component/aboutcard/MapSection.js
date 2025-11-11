import styles from "./aboutCard.module.css";

const MAP_EMBED_URL =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ||
  "https://www.google.com/maps?q=Unelma+Platforms,+Tallinn,+Estonia&output=embed";

const MapSection = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className={styles.mapSection}>
      <h2>Find Us</h2>
      <p className={styles.mapIntro}>
        Visit our Unelma Platforms Tallinn hub or reach out to plan a meeting.
      </p>
      <div className={styles.mapContent}>
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Your name" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us how we can help."
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Send Message
          </button>
        </form>
        <div className={styles.mapWrapper}>
          <iframe
            title="Unelma Platforms Location"
            src={MAP_EMBED_URL}
            className={styles.mapIframe}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default MapSection;

