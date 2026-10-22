import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";
import styles from "./AboutPage.module.css";
import { Users, Package, Heart, Truck } from "lucide-react";

const STATS = [
  { icon: Users, value: "50K+", label: "Happy Customers" },
  { icon: Package, value: "10K+", label: "Orders Shipped" },
  { icon: Heart, value: "4.9", label: "Average Rating" },
  { icon: Truck, value: "48h", label: "Fast Delivery" },
];

const VALUES = [
  {
    title: "Quality first",
    description: "We curate every product carefully, so you only see the best.",
  },
  {
    title: "Honest pricing",
    description: "No hidden fees. what you see is what you pay.",
  },
  {
    title: "Customer obsessed",
    description: "Our support team responds in minutes, not days.",
  },
  {
    title: "Fast shipping",
    description: "Free shipping over $100, delivered within 48 hours.",
  },
];

function AboutPage() {
  return (
    <>
      <section className={styles.hero}>
        <Container>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>About NovaStore</p>
            <h1 className={styles.herotitle}>
              We believe shopping should feel effortless
            </h1>
            <p className={styles.heroSubtitle}>
              NovaStore started with a simple idea: make qualityproducts
              accessible to everyone, without the noise and clutter of modern
              e-commerce.
            </p>
          </div>
        </Container>
      </section>

      <section className={styles.stats}>
        <Container>
          <div className={styles.statsGrid}>
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className={styles.statCard}>
                <Icon size={24} className={styles.statIcon} />
                <p className={styles.statValue}>{value}</p>
                <p className={styles.statLabel}>{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.story}>
        <Container>
          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <h2 className={styles.sectionTitle}>Our story</h2>
              <p>
                Founded in 2024, NovaStore is a small team of designers,
                engineers, and product enthusiasts who were tired of bloated,
                ad-filled shopping experiences. We set out to build something
                different: a clean, distraction-free place to discover products
                you'll actually love.
              </p>
              <p>
                Every product in our catalog is hand-picked. Every feature we
                build starts with one question: does this make shopping easier
                for our customers? If not, we don't build it.
              </p>
              <p>
                We're still small, but we're growing — one happy customer at a
                time.
              </p>
            </div>

            <div className={styles.storyImage}>
              <div className={styles.storyImagePlaceholder}>NovaStore</div>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.values}>
        <Container>
          <h2 className={styles.sectionTitle}>What we stand for</h2>
          <div className={styles.valueGrid}>
            {VALUES.map((v) => (
              <div key={v.title} className={styles.valueCard}>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.cta}>
        <Container>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to start shopping?</h2>
            <p className={styles.ctaText}>
              Browse our catalog and find something you'll love
            </p>
            <Link to="/shop" className={styles.ctaBtn}>
              Explore Shop
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

export default AboutPage;
