import {  FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import WhatsAppLink from './WhatsAppLink';
import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
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
                <li>
                    <a href="https://wa.me/5511979682009?text=Olá Matheus, está contratado, começa amanhã!" target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp />
                    </a>
                </li>
            </ul>
            <p className={styles.copyrigh}>
                <span>Costs</span> &copy; 2023
            </p>
        </footer>
    );
}

export default Footer;

