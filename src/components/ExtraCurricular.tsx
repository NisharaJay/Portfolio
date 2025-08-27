import { useState, useRef, useEffect, useMemo } from "react";
import { Trophy, Calendar } from "lucide-react";

interface Activity {
  title: string;
  organization: string;
  period: string;
  description: string;
  category: "leadership" | "volunteer" | "creative" | "technical";
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
        title: "Co-Lead Marketing Idealize 2025",
        organization: "AIESEC in University of Moratuwa",
        period: "2025 - Present",
        description:
          "Planning and executing promotional activities regarding the event and Leading the team.",
        category: "leadership",
        gradient: "from-blue-500 to-indigo-500",
        photo: "/oc.jpg",
      },
      {
        title: "Best Performing Team Member",
        organization: "AIESEC in University of Moratuwa",
        period: "2024",
        description:
          "Awarded Best Performing oGV B2C Team Member for outstanding contribution.",
        category: "leadership",
        gradient: "from-blue-500 to-indigo-500",
        photo: "/award.jpg",
      },
      {
        title: "Innovate with Ballerina Idea Hackathon",
        organization: "Organized by IEEE SB UOM & WSO2",
        period: "2024",
        description:
          "Recognized as one of the most popular innovations in the hackathon.",
        category: "technical",
        gradient: "from-yellow-500 to-orange-500",
        photo: "/ballerina.jpg",
      },
      {
        title: "Design Committee Member - FestX 5.0 | HackElite 1.0",
        organization: "IEEE Women in Engineering UOM",
        period: "2024",
        description:
          "Designing promotional materials for events.",
        category: "volunteer",
        gradient: "from-purple-500 to-pink-500",
        photo: "/wie.jpg",
      },
      {
        title: "Infinity'25 Participation",
        organization: "AIESEC in Si Lanka",
        period: "2025",
        description:
          "Participated in Infinity National Conference 2025, engaging in leadership development, strategic collaboration sessions, and national-level networking with delegates from across Sri Lanka.",
        category: "volunteer",
        gradient: "from-purple-500 to-pink-500",
        photo: "/infinity.jpg",
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
    const duplicateCount = Math.max(visibleCards * 2, 4);
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
        const leftBoundary = duplicateCount - 1;
        const rightBoundary = duplicateCount + activities.length + 1;
        
        if (currentCardIndex <= leftBoundary) {
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
      }, 100);
      
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

  const getCardWidth = () => {
    if (visibleCards === 3) return "calc(33.333% - 1.333rem)";
    if (visibleCards === 2) return "calc(50% - 1rem)";
    return "calc(100% - 2rem)";
  };

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4rem 2rem",
  };

  const contentWrapperStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 10,
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const sectionHeaderStyle: React.CSSProperties = {
    textAlign: "center",
    marginBottom: "4rem",
  };

  const iconWrapperStyle: React.CSSProperties = {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.75rem",
    borderRadius: "9999px",
    background: "linear-gradient(to right, #6366f1, #8b5cf6)",
    marginBottom: "1rem",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    background: "linear-gradient(to right, #818cf8, #a78bfa)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    marginBottom: "1.5rem",
    margin: 0,
    padding: 0,
  };

  const dividerStyle: React.CSSProperties = {
    width: "6rem",
    height: "0.25rem",
    margin: "0 auto 1rem",
    borderRadius: "9999px",
    background: "linear-gradient(to right, #818cf8, #a78bfa)",
  };

  const subtitleStyle: React.CSSProperties = {
    color: "#9ca3af",
    fontSize: "1.125rem",
    margin: 0,
  };

  const scrollWrapperStyle: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    padding: "0 0 1rem 0",
  };

  const scrollContainerStyle: React.CSSProperties = {
    display: "flex",
    overflowX: "auto",
    overflowY: "hidden",
    gap: "2rem",
    padding: "1rem",
    scrollSnapType: "none",
    scrollbarWidth: "none",
    scrollBehavior: "auto",
    WebkitOverflowScrolling: "touch",
    backfaceVisibility: "hidden",
    transform: "translateZ(0)",
  };

  const cardWrapperStyle: React.CSSProperties = {
    scrollSnapAlign: "none",
    transition: "transform 0.3s ease, opacity 0.3s ease",
    flex: "0 0 auto",
    willChange: "transform",
    backfaceVisibility: "hidden",
    transform: "translateZ(0)",
    width: getCardWidth(),
  };

  const cardStyle: React.CSSProperties = {
    background: "linear-gradient(to bottom right, rgba(31, 41, 55, 0.9), rgba(17, 24, 39, 0.9))",
    backdropFilter: "blur(10px)",
    borderRadius: "1rem",
    padding: "1.5rem",
    border: "1px solid rgba(99, 102, 241, 0.3)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    minHeight: "300px",
  };

  const photoContainerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "160px",
    borderRadius: "0.75rem",
    overflow: "hidden",
    marginBottom: "1rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const photoStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    filter: "brightness(0.9)",
  };

  const photoOverlayStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.6) 100%)",
    transition: "opacity 0.3s ease",
  };

  const activityTitleStyle: React.CSSProperties = {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "white",
    marginBottom: "0.5rem",
    lineHeight: 1.3,
    transition: "color 0.3s ease",
  };

  const organizationStyle: React.CSSProperties = {
    color: "#a5b4fc",
    fontWeight: 500,
    fontSize: "1rem",
    marginBottom: "0.75rem",
    transition: "color 0.3s ease",
  };

  const metaItemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#9ca3af",
    fontSize: "0.85rem",
    transition: "color 0.3s ease",
    marginBottom: "1rem",
  };

  const descriptionStyle: React.CSSProperties = {
    color: "#d1d5db",
    lineHeight: 1.6,
    fontSize: "0.9rem",
    transition: "color 0.3s ease",
    marginTop: "auto",
  };

  const dotsStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "0.75rem",
    marginTop: "2rem",
    padding: "1rem 0",
  };

  const dotStyle: React.CSSProperties = {
    width: "0.75rem",
    height: "0.75rem",
    borderRadius: "50%",
    background: "#4b5563",
    border: "none",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    outline: "none",
  };

  const activeDotStyle: React.CSSProperties = {
    ...dotStyle,
    background: "linear-gradient(45deg, #8b5cf6, #a78bfa)",
    boxShadow: "0 0 15px rgba(139, 92, 246, 0.6)",
  };

  return (
    <div style={containerStyle}>
      <div style={contentWrapperStyle}>
        {/* Section Header */}
        <div style={sectionHeaderStyle}>
          <div style={iconWrapperStyle}>
            <Trophy style={{ width: "2rem", height: "2rem", color: "white" }} />
          </div>
          <h2 style={titleStyle}>Beyond Academics</h2>
          <div style={dividerStyle} />
          <p style={subtitleStyle}>
            Leadership, Volunteering and Participation in Hackathons
          </p>
        </div>

        {/* Activity Cards */}
        <div style={scrollWrapperStyle}>
          <div ref={scrollRef} style={scrollContainerStyle}>
            {circularActivities.map((activity, i) => (
              <div 
                key={`${activity.id || i}`}
                style={cardWrapperStyle}
              >
                <div style={cardStyle}>
                  <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    {/* Photo */}
                    {activity.photo && (
                      <div style={photoContainerStyle}>
                        <img
                          src={activity.photo}
                          alt={activity.title}
                          style={photoStyle}
                        />
                        <div style={photoOverlayStyle}></div>
                      </div>
                    )}

                    {/* Description */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ marginBottom: "1rem" }}>
                        <h3 style={activityTitleStyle}>
                          {activity.title}
                        </h3>
                        <p style={organizationStyle}>
                          {activity.organization}
                        </p>
                        <div style={metaItemStyle}>
                          <Calendar style={{ width: "1rem", height: "1rem", flexShrink: 0 }} />
                          <span>{activity.period}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p style={descriptionStyle}>
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
            <div style={dotsStyle}>
              {activities.map((_, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => scrollToActivity(idx)}
                  style={currentIndex === idx ? activeDotStyle : dotStyle}
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