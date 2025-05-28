'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './headerStyles.module.css';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs'

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === 'admin';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoPrimary}>Exam</span>
          <span className={styles.logoSecondary}>Pro</span>
        </Link>
      </div>

      <nav className={styles.nav}>
        <Link 
          href="/" 
          className={`${styles.navLink} ${activeLink === 'home' ? styles.active : ''}`}
          onClick={() => setActiveLink('home')}
        >
          Home
        </Link>
        <Link 
          href="/about" 
          className={`${styles.navLink} ${activeLink === 'about' ? styles.active : ''}`}
          onClick={() => setActiveLink('about')}
        >
          About
        </Link>
        <Link 
          href="/tests" 
          className={`${styles.navLink} ${activeLink === 'tests' ? styles.active : ''}`}
          onClick={() => setActiveLink('tests')}
        >
          Tests
        </Link>
        <Link 
          href="/results" 
          className={`${styles.navLink} ${styles.blinking} ${activeLink === 'results' ? styles.active : ''}`}
          onClick={() => setActiveLink('results')}
        >
          Results
        </Link>
        
        <SignedOut>
          <SignInButton>
            <button className={`${styles.navLink} ${styles.authButton} ${styles.signInButton}`}>
              Sign In
            </button>
          </SignInButton>
          <SignUpButton>
            <button className={`${styles.navLink} ${styles.authButton} ${styles.signUpButton}`}>
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        
        <SignedIn>
          {isAdmin && (
            <Link 
              href="/admin" 
              className={`${styles.navLink} ${styles.adminButton}`}
              onClick={() => setActiveLink('admin')}
            >
              Admin
            </Link>
          )}
          <div className={styles.userButtonWrapper}>
            <UserButton afterSignOutUrl="/" appearance={{
              elements: {
                userButtonAvatarBox: styles.userAvatar,
                userButtonOuterIdentifier: styles.userName,
                userButtonPopoverCard: styles.userPopover,
                userButtonTrigger: styles.userButtonTrigger
              }
            }} />
          </div>
        </SignedIn>
      </nav>
    </header>
  );
};

export default Header;