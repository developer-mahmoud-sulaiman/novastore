import Container from "../../ui/Container";
import Navbar from "../Navbar/Navbar";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <Navbar />
      </Container>
    </header>
  );
}

export default Header;
