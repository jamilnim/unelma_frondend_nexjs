import styles from "./aboutCard.module.css";

const AboutCard = () => {
  return (
    <div className={styles.aboutPage}>
      <h1>About Unelma</h1>

      <section className={styles.aboutSection}>
        <video autoPlay loop muted playsInline className={styles.videoBg}>
          <source src="/running-bg.mp4" type="video/mp4" />
        </video>

        <div className={styles.overlay}>
          <p>
            Welcome to Unelma Platforms, where our mission is to "empower
            people." Funny thing is nobody were talking about "empowering
            people" in IT industry some 15 years ago and when we started a
            slogan of "empower people" with our business many big corporate
            giants and other consulting companies started copying our slogan and
            now almost everybody is talking about how to help and empower
            clients. With over 15 years of experience in the tech landscape,
            Unelma Platforms has grown into a household name heralding the
            digital revolution. We proudly strut a rich legacy that intersects
            innovation, user experience, and transformative power, borne out of
            our unwavering commitment to empower the lives of people through
            technology. We believe in the profound potential technology holds to
            create positive change, and we channel this belief into creating
            platforms and software that are user-friendly, efficient, and
            groundbreaking. Our team comprises seasoned professionals who are
            passionate about harnessing the power of technology to optimize
            processes, solve complex problems, and ultimately, transform lives.
            Our product portfolio - including UnelmaMail, UnelmaBrowser, and
            Unelma-Code Translator - is a testament to our motivation to build
            technology that makes a difference. Each of our cutting-edge
            products comes with full support, maintenance, and security
            provisions to ensure a seamless user experience. At Unelma
            Platforms, our journey is always about more than just developing
            technology. It is about empowering people, fostering growth, and
            pushing boundaries. We don't just create platforms; we create
            opportunities where none existed before. So come with us on this
            exciting journey and allow us to empower you. Welcome to Unelma
            Platforms. Embrace the power of technology to transform your world.
          </p>
        </div>
      </section>

      <section className={styles.aboutSection2}>
        <h1>Mission</h1>
        <p>
          <b> Provide all kind of it service </b>
        </p>
        <p>
          <b>Solutions for all security </b>
        </p>
        <p>
          <b>Most expert peoples</b>
        </p>
        <p>
          <b>Global support for all</b>
        </p>
      </section>

      <section className={styles.aboutSection3}>
        <h1>We Have Global Network Of Clients</h1>
        <p>
          Unelma Platforms boasts a wide-reaching global network of clients.
          Over our 15 years journey, we have meticulously built and nurtured
          relationships with enterprises, startups, and individuals across
          multiple continents. Our innovative and user-friendly products and the
          commitment to reliable support and service, irrespective of geographic
          location, has fostered trust among our clients globally. From local
          businesses to multinational corporations, our clientele spans every
          corner of the globe, making Unelma Platforms a universally recognized
          and preferred name in the digital tech landscape. This expansive
          global network is a testament to our determination to empower people
          through technology, across borders and beyond boundaries.
        </p>
      </section>

      <section className={styles.aboutSection4}>
        <h2>Come work with us</h2>
      </section>
    </div>
  );
};

export default AboutCard;
