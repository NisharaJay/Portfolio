import { useState, useEffect } from "react";
import {
  Home,
  GraduationCap,
  Code,
  FolderOpen,
  Trophy,
  Mail,
  Menu,
  X,
} from "lucide-react";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "extra", label: "Highlights", icon: Trophy },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar when not on home section (scrolled past first section)
      const homeSection = document.getElementById("home");
      if (homeSection) {
        const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
        setIsVisible(window.scrollY >= homeBottom - 100);
      }

      // Update active section
      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`${styles.navbar} ${
          isVisible ? styles.visible : styles.hidden
        }`}
      >
        {/* Background with Home component styling */}
        <div className={styles.background}>
          {/* Subtle grid pattern overlay */}
          <div className={styles.gridPattern} />

          {/* Gradient border bottom */}
          <div className={styles.gradientBorder} />

          {/* Ambient light effects */}
          <div className={styles.ambientLight1} />
          <div className={styles.ambientLight2} />
        </div>

        {/* Navigation content - Full Width */}
        <div className={styles.navContent}>
          <div className={styles.navInner}>
            {/* Logo/Brand - Left Side */}
            <div
              className={styles.logoContainer}
              onClick={() => scrollToSection("home")}
            >
              <div className={styles.logoWrapper}>
                {/* Logo with enhanced styling matching Home component */}
                <div className={styles.logo}>
                  <img src="/logo.png" alt="Logo" className={styles.logoImage} />
                </div>

                {/* Glow effect on hover */}
                <div className={styles.logoGlow} />
              </div>

              <div className={styles.brandText}>
                <div className={styles.brandName}>Nishara Jayakody</div>
                <div className={styles.brandSubtitle}>Portfolio</div>
              </div>
            </div>

            {/* Navigation Links - Right Side (Desktop) */}
            <div className={styles.desktopNav}>
              {navItems.map(({ id, label }) => (
                <div key={id} className={styles.navItem}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className={`${styles.navButton} ${
                      activeSection === id ? styles.active : ""
                    }`}
                  >
                    <span className={styles.buttonText}>{label}</span>

                    {/* Active indicator - enhanced underline */}
                    <div
                      className={`${styles.activeIndicator} ${
                        activeSection === id ? styles.active : ""
                      }`}
                    >
                      <div className={styles.indicatorLine} />
                    </div>

                    {/* Subtle glow effect on hover */}
                    <div
                      className={`${styles.buttonGlow} ${
                        activeSection === id ? styles.active : ""
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className={styles.mobileNav}>
              <button
                type="button"
                aria-label="Toggle menu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={styles.mobileMenuButton}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
        <div className={styles.mobileMenuContent}>
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`${styles.mobileMenuItem} ${
                activeSection === id ? styles.mobileMenuItemActive : ""
              }`}
            >
              <Icon size={20} className={styles.mobileMenuIcon} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;