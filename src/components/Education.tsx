import { useEffect, useState, useRef } from "react";
import { GraduationCap, Calendar } from "lucide-react";
import styles from "../styles/Education.module.css";

import moratuwaLogo from "../assets/UOMLogo.png";
import esoftLogo from "../assets/ESOFTLogo.png";
import holyCrossLogo from "../assets/HCCLogo.png";

interface EducationItem {
  degree: string;
  year: string;
  institution: string;
  description: string;
  score?: string;
  logo: string;
}

const Education = () => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineLineRef = useRef<HTMLDivElement>(null);

  const educations: EducationItem[] = [
    {
      degree: "BSc (Hons) in Information Technology",
      year: "2023 - Present",
      institution: "University of Moratuwa",
      description:
        "Specializing in software engineering and full-stack development with focus on modern web technologies and system design.",
      score: "GPA: 3.81/4.00",
      logo: moratuwaLogo,
    },
    {
      degree: "Assured Diploma in Information Technology",
      year: "2022",
      institution: "Esoft Metro Campus Gampaha",
      description:
        "Completed with distinction, focusing on software development and IT fundamentals.",
      logo: esoftLogo,
    },
    {
      degree: "GCE Advanced Level",
      year: "2021(2022)",
      institution: "Holy Cross College Gampaha",
      description: "Completed A/Levels in ICT, Physics and Combined Maths.",
      score: "Z Score: 1.6198",
      logo: holyCrossLogo,
    },
    {
      degree: "GCE Ordinary Level",
      year: "2018",
      institution: "Holy Cross College Gampaha",
      description:
        "Completed O/Levels including ICT and English Literature.",
      logo: holyCrossLogo,
    },
  ];

  // Initialize visibility state
  useEffect(() => {
    setVisibleItems(new Array(educations.length).fill(false));
  }, [educations.length]);

  // Intersection Observer for loading animation (triggers every time)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          setVisibleItems(prev => {
            const newVisible = [...prev];
            newVisible[index] = entry.isIntersecting;
            return newVisible;
          });
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      itemRefs.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  // Scroll handler for active index
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const scrollY = window.scrollY + window.innerHeight / 2;
      
      const scrollPosition = scrollY - containerTop;
      
      if (scrollPosition >= 0 && scrollPosition < containerHeight) {
        const itemHeight = containerHeight / educations.length;
        const index = Math.min(
          educations.length - 1,
          Math.floor(scrollPosition / itemHeight)
        );
        setActiveIndex(index);
      } else if (scrollY < containerTop) {
        setActiveIndex(-1);
      } else if (scrollY > containerTop + containerHeight) {
        setActiveIndex(educations.length);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [educations.length]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.contentWrapper}>
        {/* Section Title */}
        <div className={styles.sectionHeader}>
          <div className={styles.iconWrapper}>
            <GraduationCap className={styles.icon} />
          </div>
          <h2 className={styles.title}>Education</h2>
          <div className={styles.divider} />
          <p className={styles.subtitle}>My academic journey</p>
        </div>

        {/* Timeline with Education Items */}
        <div className={styles.timelineContainer}>
          <div className={styles.timelineLine} ref={timelineLineRef}>
            {/* Dot markers on the timeline */}
            {educations.map((_, index) => (
              <div 
                key={index} 
                className={`${styles.timelineDotMarker} ${
                  index === activeIndex ? styles.activeDot : ""
                } ${index < activeIndex ? styles.passedDot : ""} ${
                  visibleItems[index] ? styles.visibleDot : ""
                }`}
                style={{ top: `${(index * 100) / (educations.length - 1)}%` }}
              ></div>
            ))}
          </div>
          
          {educations.map((edu, index) => (
            <div
              key={index}
              ref={el => { itemRefs.current[index] = el; }}
              data-index={index}
              className={`${styles.timelineItem} ${
                index % 2 === 0 ? styles.left : styles.right
              } ${index === activeIndex ? styles.active : ""} ${
                index < activeIndex ? styles.passed : ""
              } ${visibleItems[index] ? styles.visible : ""}`}
              style={{ 
                animationDelay: `${index * 0.2}s`,
                transitionDelay: `${index * 0.1}s`
              }}
            >
              <div className={styles.timelineContent}>
                <div className={styles.timelineDate}>{edu.year}</div>
                
                <div className={styles.educationCard}>
                  <div className={styles.cardInner}>
                    <div className={styles.itemHeader}>
                      <div className={styles.logoContainer}>
                        <img
                          src={edu.logo}
                          alt={`${edu.institution} logo`}
                          className={styles.institutionLogo}
                        />
                      </div>
                      <div className={styles.itemMainInfo}>
                        <h3 className={styles.degree}>{edu.degree}</h3>
                        <p className={styles.institution}>{edu.institution}</p>
                        <div className={styles.year}>
                          <Calendar className={styles.calendarIcon} />
                          <span>{edu.year}</span>
                        </div>
                        {edu.score && (
                          <span className={styles.gpa}>{edu.score}</span>
                        )}
                      </div>
                    </div>

                    <div className={styles.itemContent}>
                      <p className={styles.description}>{edu.description}</p>
                    </div>
                  </div>
                  
                  {/* Loading animation overlay */}
                  <div className={styles.loadingOverlay}>
                    <div className={styles.loadingBar}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;