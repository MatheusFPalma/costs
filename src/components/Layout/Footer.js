import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li>
                    <a href="https://www.facebook.com/horadecodar" target="_blank" rel="noopener noreferrer">
                        <FaFacebook />
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/math_palma/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/matheusfpalma/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                </li>
                <li>
                    <a href="https://github.com/MatheusFPalma" target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                    </a>
                </li>
            </ul>
            <p className={styles.copyright}>
                <span>Costs</span> &copy; 2023
            </p>
        </footer>
    );
}

export default Footer;

