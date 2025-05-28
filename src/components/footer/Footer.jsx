'use client';
import Link from 'next/link';
import styles from './footerStyles.module.css';
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>ExamPro</h3>
          <p className={styles.footerText}>
            Your premier online mock test platform for professional certification preparation.
          </p>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialLink} aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="#" className={styles.socialLink} aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className={styles.socialLink} aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="#" className={styles.socialLink} aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>Quick Links</h3>
          <ul className={styles.footerLinks}>
            <li><Link href="/" className={styles.footerLink}>Home</Link></li>
            <li><Link href="/about" className={styles.footerLink}>About Us</Link></li>
            <li><Link href="/tests" className={styles.footerLink}>All Tests</Link></li>
            <li><Link href="/results" className={styles.footerLink}>Your Results</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>Legal</h3>
          <ul className={styles.footerLinks}>
            <li><Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link></li>
            <li><Link href="/terms" className={styles.footerLink}>Terms of Service</Link></li>
            <li><Link href="/cookies" className={styles.footerLink}>Cookie Policy</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>Contact Us</h3>
          <ul className={styles.footerContacts}>
            <li>hello@exampro.com</li>
            <li>+1 (555) 123-4567</li>
            <li>123 Education St, Tech City</li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.copyright}>
          &copy; {currentYear} ExamPro. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;