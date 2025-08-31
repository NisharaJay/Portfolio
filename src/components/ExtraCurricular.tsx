import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
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

// Styled Components
const MainContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(8, 4),
}));

const ContentWrapper = styled(Box)({
  position: "relative",
  zIndex: 10,
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
});

const HeaderContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(8),
}));

const IconWrapper = styled(Box)({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "12px",
  borderRadius: "9999px",
  background: "linear-gradient(to right, #6366f1, #8b5cf6)",
  marginBottom: "16px",
});

const GradientTitle = styled(Typography)({
  fontSize: "2.5rem",
  fontWeight: "bold",
  background: "linear-gradient(to right, #818cf8, #a78bfa)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  marginBottom: "24px",
  margin: 0,
  padding: 0,
});

const Divider = styled(Box)({
  width: "96px",
  height: "4px",
  margin: "14px auto 16px",
  borderRadius: "9999px",
  background: "linear-gradient(to right, #818cf8, #a78bfa)",
});

const SubTitle = styled(Typography)({
  color: "#9ca3af",
  fontSize: "1.125rem",
  margin: 0,
});

const ScrollWrapper = styled(Box)({
  position: "relative",
  overflow: "hidden",
  padding: "0 0 16px 0",
});

const ScrollContainer = styled(Box)({
  display: "flex",
  overflowX: "auto",
  overflowY: "hidden",
  gap: "32px",
  padding: "16px",
  scrollSnapType: "none",
  scrollbarWidth: "none",
  scrollBehavior: "auto",
  WebkitOverflowScrolling: "touch",
  backfaceVisibility: "hidden",
  transform: "translateZ(0)",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const CardWrapper = styled(Box)<{ visiblecards: number }>(({ visiblecards }) => ({
  scrollSnapAlign: "none",
  transition: "transform 0.3s ease, opacity 0.3s ease",
  flex: "0 0 auto",
  willChange: "transform",
  backfaceVisibility: "hidden",
  transform: "translateZ(0)",
  width: visiblecards === 3 ? "calc(33.333% - 21.33px)" : 
         visiblecards === 2 ? "calc(50% - 16px)" : 
         "calc(100% - 32px)",
}));

const ActivityCard = styled(Card)({
  background: "linear-gradient(to bottom right, rgba(31, 41, 55, 0.9), rgba(17, 24, 39, 0.9))",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  padding: "24px",
  border: "1px solid rgba(99, 102, 241, 0.3)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  height: "100%",
  position: "relative",
  overflow: "hidden",
  minHeight: "400px",
  display: "flex",
  flexDirection: "column",
});

const PhotoContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "160px",
  borderRadius: "12px",
  overflow: "hidden",
  marginBottom: "16px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

const PhotoOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.6) 100%)",
  transition: "opacity 0.3s ease",
});

const ActivityTitle = styled(Typography)({
  fontSize: "1.25rem",
  fontWeight: "bold",
  color: "white",
  marginBottom: "8px",
  lineHeight: 1.3,
  transition: "color 0.3s ease",
});

const Organization = styled(Typography)({
  color: "#a5b4fc",
  fontWeight: 500,
  fontSize: "1rem",
  marginBottom: "12px",
  transition: "color 0.3s ease",
});

const MetaItem = styled(Stack)({
  color: "#9ca3af",
  fontSize: "0.85rem",
  transition: "color 0.3s ease",
  marginBottom: "16px",
});

const Description = styled(Typography)({
  color: "#d1d5db",
  lineHeight: 1.6,
  fontSize: "0.9rem",
  transition: "color 0.3s ease",
  marginTop: "auto",
});

const DotsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(4),
  padding: theme.spacing(2, 0),
}));

const DotButton = styled(IconButton)<{ active?: boolean }>(({ active }) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  background: active ? "linear-gradient(45deg, #8b5cf6, #a78bfa)" : "#4b5563",
  border: "none",
  cursor: "pointer",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  outline: "none",
  padding: 0,
  minWidth: "auto",
  boxShadow: active ? "0 0 15px rgba(139, 92, 246, 0.6)" : "none",
  "&:hover": {
    background: active ? "linear-gradient(45deg, #8b5cf6, #a78bfa)" : "#6b7280",
  },
}));

const ExtraCurricular: React.FC = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  
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
        description: "Designing promotional materials for events.",
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
    if (isLgUp) {
      setVisibleCards(3);
    } else if (isMdUp) {
      setVisibleCards(2);
    } else {
      setVisibleCards(1);
    }
  }, [isLgUp, isMdUp]);

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

  return (
    <MainContainer>
      <ContentWrapper>
        {/* Section Header */}
        <HeaderContainer>
          <IconWrapper>
            <Trophy size={32} color="white" />
          </IconWrapper>
          <GradientTitle>Beyond Academics</GradientTitle>
          <Divider />
          <SubTitle>
            Leadership, Volunteering and Participation in Hackathons
          </SubTitle>
        </HeaderContainer>

        {/* Activity Cards */}
        <ScrollWrapper>
          <ScrollContainer ref={scrollRef}>
            {circularActivities.map((activity, i) => (
              <CardWrapper 
                key={`${activity.id || i}`}
                visiblecards={visibleCards}
              >
                <ActivityCard>
                  <CardContent sx={{ padding: 0, height: "100%", "&:last-child": { paddingBottom: 0 } }}>
                    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                      {/* Photo */}
                      {activity.photo && (
                        <PhotoContainer>
                          <CardMedia
                            component="img"
                            image={activity.photo}
                            alt={activity.title}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                              filter: "brightness(0.9)",
                            }}
                          />
                          <PhotoOverlay />
                        </PhotoContainer>
                      )}

                      {/* Content */}
                      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <Box sx={{ marginBottom: "16px" }}>
                          <ActivityTitle>
                            {activity.title}
                          </ActivityTitle>
                          <Organization>
                            {activity.organization}
                          </Organization>
                          <MetaItem direction="row" alignItems="center" spacing={1}>
                            <Calendar size={16} />
                            <span>{activity.period}</span>
                          </MetaItem>
                        </Box>

                        {/* Description */}
                        <Description>
                          {activity.description}
                        </Description>
                      </Box>
                    </Box>
                  </CardContent>
                </ActivityCard>
              </CardWrapper>
            ))}
          </ScrollContainer>

          {/* Dots Indicator */}
          {activities.length > 0 && (
            <DotsContainer>
              {activities.map((_, idx) => (
                <DotButton
                  key={idx}
                  active={currentIndex === idx}
                  onClick={() => scrollToActivity(idx)}
                  aria-label={`Go to activity ${idx + 1}`}
                />
              ))}
            </DotsContainer>
          )}
        </ScrollWrapper>
      </ContentWrapper>
    </MainContainer>
  );
};

export default ExtraCurricular;