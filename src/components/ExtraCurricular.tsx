import { useState, useRef, useEffect, useMemo } from "react";
import {
  Trophy,
  Calendar,
  MapPin,
} from "lucide-react";
import styles from "../styles/ExtraCurricular.module.css";

interface Activity {
  title: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  category: "leadership" | "volunteer" | "creative" | "technical" | "sports";
  gradient: string;
  photo?: string;
}

const ExtraCurricular = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const [visibleCards, setVisibleCards] = useState(3);

  const activities: Activity[] = useMemo(
    () => [
      {
        title: "Co-Lead Marketing",
        organization: "AIESEC in University of Moratuwa",
        period: "2025 - Present",
        location: "Colombo, Sri Lanka",
        description:
          "Planning and executing promotional activities regarding the event and Leading the team.",
        category: "leadership",
        gradient: "from-blue-500 to-indigo-500",
        photo: "/images/aiesec.jpg",
      },
      {
        title: "AIESEC Member",
        organization: "AIESEC in University of Moratuwa",
        period: "2024 - 2025",
        location: "Colombo, Sri Lanka",
        description:
          "Participated in international exchange programs and leadership development activities.",
        category: "leadership",
        gradient: "from-blue-500 to-indigo-500",
        photo: "/images/aiesec2.jpg",
      },
      {
        title: "AIESEC Volunteer",
        organization: "AIESEC in University of Moratuwa",
        period: "2023 - 2024",
        location: "Colombo, Sri Lanka",
        description:
          "Volunteered for social impact projects and community development initiatives.",
        category: "volunteer",
        gradient: "from-purple-500 to-pink-500",
        photo: "/images/aiesec3.jpg",
      },
      {
        title: "IEEE WIE Member",
        organization: "IEEE Women in Engineering",
        period: "2022 - 2024",
        location: "University of Colombo",
        description:
          "Participated in workshops, mentoring sessions, and community outreach initiatives supporting women in tech.",
        category: "volunteer",
        gradient: "from-purple-500 to-pink-500",
      },
      {
        title: "Hackathon Winner",
        organization: "University Tech Competition",
        period: "2023",
        location: "Colombo, Sri Lanka",
        description:
          "Developed an innovative solution for sustainable energy management using IoT technology.",
        category: "technical",
        gradient: "from-yellow-500 to-orange-500",
      },
    ],
    []
  );

  // Update visible cards based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setVisibleCards(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Create circular array with enough duplicates for smooth infinite scroll
  const circularActivities = useMemo(() => {
    const duplicateCount = Math.max(visibleCards * 2, 4); // Ensure enough duplicates
    const result = [];
    
    // Add activities before the main set
    for (let i = 0; i < duplicateCount; i++) {
      result.push({
        ...activities[activities.length - 1 - (i % activities.length)],
        id: `prev-${i}`
      });
    }
    result.reverse();
    
    // Add main activities
    activities.forEach((activity, index) => {
      result.push({
        ...activity,
        id: `main-${index}`
      });
    });
    
    // Add activities after the main set
    for (let i = 0; i < duplicateCount; i++) {
      result.push({
        ...activities[i % activities.length],
        id: `next-${i}`
      });
    }
    
    return result;
  }, [activities, visibleCards]);

  // Initialize scroll position to the center (main activities)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || circularActivities.length === 0) return;

    const cardWidth = container.offsetWidth / visibleCards;
    const duplicateCount = Math.max(visibleCards * 2, 4);
    const initialScrollPosition = duplicateCount * cardWidth;
    
    // Set initial position without triggering scroll event
    isScrolling.current = true;
    container.scrollLeft = initialScrollPosition;
    
    setTimeout(() => {
      isScrolling.current = false;
    }, 100);
  }, [circularActivities, visibleCards]);

  // Handle scroll events for infinite scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollTimeout: ReturnType<typeof setTimeout>;
    
    const handleScroll = () => {
      if (isScrolling.current) return;
      
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth / visibleCards;
      const duplicateCount = Math.max(visibleCards * 2, 4);
      const mainStartIndex = duplicateCount;
      
      // Clear any existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Only handle infinite scroll after user stops scrolling
      scrollTimeout = setTimeout(() => {
        const currentCardIndex = Math.round(container.scrollLeft / cardWidth);
        
        // More precise boundary detection
        const leftBoundary = duplicateCount - 1; // When we're near the end of the left duplicates
        const rightBoundary = duplicateCount + activities.length + 1; // When we're near the start of right duplicates
        
        if (currentCardIndex <= leftBoundary) {
          // Scrolled too far left - jump to equivalent position in the main section
          const positionInDuplicates = currentCardIndex;
          const equivalentMainIndex = positionInDuplicates % activities.length;
          const newPosition = (mainStartIndex + activities.length - activities.length + equivalentMainIndex) * cardWidth;
          
          isScrolling.current = true;
          requestAnimationFrame(() => {
            container.scrollLeft = newPosition;
            requestAnimationFrame(() => {
              isScrolling.current = false;
            });
          });
          
        } else if (currentCardIndex >= rightBoundary) {
          // Scrolled too far right - jump to equivalent position in the main section
          const positionInRightDuplicates = currentCardIndex - rightBoundary;
          const equivalentMainIndex = positionInRightDuplicates % activities.length;
          const newPosition = (mainStartIndex + equivalentMainIndex) * cardWidth;
          
          isScrolling.current = true;
          requestAnimationFrame(() => {
            container.scrollLeft = newPosition;
            requestAnimationFrame(() => {
              isScrolling.current = false;
            });
          });
        }
      }, 100); // Slightly longer delay for smoother experience
      
      // Update current index for dots indicator (real-time)
      const currentCardIndex = Math.round(scrollLeft / cardWidth);
      const displayIndex = ((currentCardIndex - mainStartIndex) % activities.length + activities.length) % activities.length;
      
      setCurrentIndex(displayIndex);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [activities, visibleCards, circularActivities]);

  const scrollToActivity = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    
    const cardWidth = container.offsetWidth / visibleCards;
    const duplicateCount = Math.max(visibleCards * 2, 4);
    const targetScroll = (duplicateCount + index) * cardWidth;
    
    isScrolling.current = true;
    container.scrollTo({ left: targetScroll, behavior: "smooth" });
    
    setTimeout(() => {
      isScrolling.current = false;
    }, 500);
  };

  return (
    <div className={styles.container}>
      {/* Background Elements */}
      <div className={styles.backgroundLayer}>
        <div className={styles.gridPattern} />
        <div className={styles.ambientLight1} />
        <div className={styles.ambientLight2} />
      </div>

      <div className={styles.contentWrapper}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.iconWrapper}>
            <Trophy className={styles.icon} />
          </div>
          <h2 className={styles.title}>Beyond Academics</h2>
          <div className={styles.divider} />
          <p className={styles.subtitle}>
            Leadership, Volunteering and Participation in Hackathons
          </p>
        </div>

        {/* Activity Cards */}
        <div className={styles.scrollWrapper}>
          <div ref={scrollRef} className={styles.scrollContainer}>
            {circularActivities.map((activity, i) => (
              <div 
                key={`${activity.id || i}`}
                className={`${styles.cardWrapper} ${styles[`show${visibleCards}`]}`}
              >
                <div className={styles.card}>
                  <div className={styles.cardContent}>
                    {/* Photo on left side */}
                    {activity.photo && (
                      <div className={styles.photoContainer}>
                        <img
                          src={activity.photo}
                          alt={activity.title}
                          className={styles.photo}
                        />
                        <div className={styles.photoOverlay}></div>
                      </div>
                    )}

                    {/* Description on right side */}
                    <div className={styles.descriptionContainer}>
                      <div className={styles.cardHeader}>
                        <div className={styles.cardTitle}>
                          <h3 className={styles.activityTitle}>
                            {activity.title}
                          </h3>
                          <p className={styles.organization}>
                            {activity.organization}
                          </p>
                          <div className={styles.meta}>
                            <span className={styles.metaItem}>
                              <Calendar className={styles.metaIcon} />{" "}
                              {activity.period}
                            </span>
                            <span className={styles.metaItem}>
                              <MapPin className={styles.metaIcon} />{" "}
                              {activity.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className={styles.description}>
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          {activities.length > 0 && (
            <div className={styles.dots}>
              {activities.map((_, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => scrollToActivity(idx)}
                  className={`${styles.dot} ${
                    currentIndex === idx ? styles.activeDot : ""
                  }`}
                  aria-label={`Go to activity ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExtraCurricular;