import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import OctopusNav from '@/components/OctopusNav/OctopusNav';
import Starfield from '@/components/Starfield/Starfield';
import styles from './styles.module.css';

const Gui = () => (
  <div className={styles.gui}>
    <Starfield />
    <Header />
    <OctopusNav />
    <Footer />
  </div>
);

export default Gui;
