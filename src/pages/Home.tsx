import { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  ExternalLink,
  Download,
  Mail,
  MapPin,
} from "lucide-react";
import styles from "../styles/Home.module.css";

interface HomeProps {
  onTypingComplete: () => void;
}

const Home: React.FC<HomeProps> = ({ onTypingComplete }) => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [currentWord, setCurrentWord] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  const typingStartedRef = useRef(false); // Add ref to track if typing has started

  const name = "Nishara Jayakody";
  const dynamicWords = ["Full-Stack Developer", "Problem Solver", "AI ML Enthusiastic", "Creator"];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % dynamicWords.length);
    }, 3000);

    // Only start typing animation if it hasn't started yet
    if (!typingStartedRef.current) {
      typingStartedRef.current = true;
      
      // Typing animation for name
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < name.length) {
          setTypedText(name.substring(0, i + 1));
          i++;
        } else {
          setTypingComplete(true);
          onTypingComplete(); // Notify parent component
          clearInterval(typingInterval);
        }
      }, 100);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [onTypingComplete]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-container">
      {/* Animated Background */}
      <div className={styles.backgroundLayer}>
        <div className={styles.gridPattern} />

        <div
          className={styles.gradientBlob}
          style={{
            left: `${mousePosition.x * 0.01}px`,
            top: `${mousePosition.y * 0.01}px`,
          }}
        />

        <div className={styles.ambientLight1} />
        <div className={styles.ambientLight2} />
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Centered Header */}
        <div className={styles.header}>
          <div className={styles.nameTitle}>
            <span className={styles.greeting}>
              Hi, I'm <span className={styles.name}>{typedText}</span>
              {!typingComplete && <span className={styles.cursor}>|</span>}
            </span>
          </div>

          <div className={styles.dynamicRole}>
            <span>{dynamicWords[currentWord]}</span>
          </div>
        </div>

        {/* Content Grid */}
        <div className={styles.contentGrid}>
          {/* Photo Section */}
          <div className={styles.photoContainer}>
            <div className={styles.photoWrapper}>
              <div className={styles.photoGlow} />

              <div className={styles.photo}>
                <div className={styles.photoInner}>
                  <img
                    src="/profile.png"
                    alt="Nishara"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </div>

                <div className={styles.onlineIndicator} />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className={styles.contentSection}>
            <p className={styles.description}>
              I'm a motivated and adaptable third year IT undergraduate with a strong
              passion for full-stack development and problem-solving. With a
              proactive mindset, I'm always eager to gain hands-on experience,
              collaborate with others, and deliver impactful solutions.<br /><br />
              Beyond tech, I enjoy content creation and have a growing interest in
              marketing and digital engagement.{" "}
            </p>

            <div className={styles.skillsContainer}>
              {["Full-Stack", "UI/UX", "Problem Solving"].map(
                (skill, index) => (
                  <span
                    key={skill}
                    className={styles.skillTag}
                    style={{ animationDelay: `${800 + index * 100}ms` }}
                  >
                    {skill}
                  </span>
                )
              )}
            </div>

            <div className={styles.buttonContainer}>
              <button
                className={styles.primaryButton}
                onClick={() => scrollToSection("projects")}
              >
                View My Work
                <ExternalLink size={16} />
              </button>

              <button
                className={styles.primaryButton}
                onClick={() => window.open("/CV.pdf", "_blank")}
              >
                <Download size={16} />
                View CV
              </button>
            </div>

            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Mail size={16} />
                <span>dthnjayakody@gmail.com</span>
              </div>
              <div className={styles.contactItem}>
                <MapPin size={16} />
                <span>Gampaha, Sri Lanka</span>
              </div>
            </div>

            <div className={styles.socialLinks}>
              {[
                {
                  icon: Github,
                  href: "https://github.com/NisharaJay",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com/in/nishara-jayakody-4b8b33270",
                  label: "LinkedIn",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  title={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;