import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import OctopusNav from '@/components/OctopusNav/OctopusNav';
import Starfield from '@/components/Starfield/Starfield';
import CookieBannerGui from '@/components/CookieBanner/CookieBannerGui';
import styles from './styles.module.css';

const Gui = () => (
  <div className={styles.gui}>
    <Starfield />
    <Header />
    <div className={styles.octopusArea}>
      <OctopusNav />
      <CookieBannerGui />
    </div>
    <Footer />
  </div>
);

export default Gui;
