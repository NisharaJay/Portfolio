import { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  HStack,
  VStack,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { styled } from "@mui/material";
import {
  GraduationCap,
  Calendar,
  MapPin,
} from "lucide-react";

// Define the type for education items
interface EducationItem {
  degree: string;
  year: string;
  institution: string;
  description: string;
  score?: string;
  logo: string;
  status: "ongoing" | "completed";
}

const educations: EducationItem[] = [
  {
    degree: "BSc (Hons) in Information Technology",
    year: "2023 - Present",
    institution: "University of Moratuwa",
    description:
      "Specializing in software engineering and full-stack development with focus on modern web technologies.",
    score: "GPA: 3.81/4.00",
    logo: "./UOMLogo.png",
    status: "ongoing",
  },
  {
    degree: "Assured Diploma in Information Technology",
    year: "2022",
    institution: "Esoft Metro Campus Gampaha",
    description:
      "Passed with distinction, focusing on software development and IT fundamentals.",
    logo: "/ESOFTLogo.png",
    status: "completed",
  },
  {
    degree: "GCE Advanced Level",
    year: "2022(2021)",
    institution: "Holy Cross College Gampaha",
    description: "Passed in Combined Maths, Physics and ICT.",
    score: "Z-Score: 1.619",
    logo: "/HCCLogo.png",
    status: "completed",
  },
  {
    degree: "GCE Ordinary Level",
    year: "2018",
    institution: "Holy Cross College Gampaha",
    description: "Passed with 8A Passes and 1C pass.",
    logo: "/HCCLogo.png",
    status: "completed",
  },
];

// Styled components
const BackgroundLayer = styled(Box)({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  pointerEvents: "none",
});

const GridPattern = styled(Box)({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  opacity: 0.03,
  backgroundImage:
    "radial-gradient(circle at 2px 2px, #64748b 1px, transparent 0)",
  backgroundSize: "50px 50px",
});

const IconWrapper = styled(Box)({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0.75rem",
  borderRadius: "9999px",
  background: "linear-gradient(to right, #6366f1, #8b5cf6)",
  marginTop: "1.5rem",
  boxShadow: "0 4px 10px rgba(99, 102, 241, 0.4)",
});

const Divider = styled(Box)({
  width: "6rem",
  height: "0.25rem",
  margin: "0 auto 1rem",
  borderRadius: "9999px",
  background: "linear-gradient(to right, #818cf8, #a78bfa)",
});

const EducationItemWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "1.5rem",
  background:
    "linear-gradient(145deg, rgba(55, 65, 81, 0.8), rgba(31, 41, 55, 0.9))",
  borderRadius: "1.5rem",
  border: "1px solid rgba(148, 163, 184, 0.15)",
  boxShadow: `0 8px 16px rgba(0, 0, 0, 0.3),
              0 4px 8px rgba(0, 0, 0, 0.2),
              inset 0 1px 2px rgba(255, 255, 255, 0.1),
              inset 0 -1px 2px rgba(0, 0, 0, 0.2)`,
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  position: "relative",

  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: `0 15px 30px rgba(0, 0, 0, 0.4),
                0 8px 16px rgba(139, 92, 246, 0.2),
                inset 0 2px 4px rgba(255, 255, 255, 0.15),
                inset 0 -2px 4px rgba(0, 0, 0, 0.3)`,
    background:
      "linear-gradient(145deg, rgba(99, 102, 241, 0.3), rgba(55, 65, 81, 0.9))",
    borderColor: "rgba(139, 92, 246, 0.4)",
  },

  "&:active": {
    transform: "translateY(-6px)",
    boxShadow: `0 10px 20px rgba(0, 0, 0, 0.3),
                0 4px 8px rgba(139, 92, 246, 0.15),
                inset 0 1px 2px rgba(255, 255, 255, 0.1),
                inset 0 -1px 3px rgba(0, 0, 0, 0.4)`,
  },

  "&::before": {
    content: '""',
    position: "absolute",
    top: "1px",
    left: "1px",
    right: "1px",
    bottom: "1px",
    background:
      "linear-gradient(145deg, rgba(255, 255, 255, 0.05), transparent)",
    borderRadius: "1.4rem",
    pointerEvents: "none",
  },
});

const EducationIconWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: 80,
  height: 80,
  padding: "0.5rem",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
});

// Timeline Line Component
const TimelineLine = styled(Box)(() => ({
  position: "absolute",
  left: "50%",
  top: 0,
  bottom: 0,
  width: "3px",
  background: "linear-gradient(to bottom, #8b5cf6, #6366f1)",
  transform: "translateX(-50%)",
  "@media (max-width: 768px)": {
    left: "30px",
  },
}));

// Timeline Dot Component
const TimelineDot = styled(Box)<{ status: string }>(({ status }) => ({
  position: "absolute",
  left: "50%",
  top: "20px",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  background:
    status === "ongoing"
      ? "linear-gradient(45deg, #10b981, #059669)"
      : "linear-gradient(45deg, #8b5cf6, #6366f1)",
  border: "4px solid #1a202c",
  transform: "translateX(-50%)",
  zIndex: 2,
  boxShadow: "0 0 0 4px rgba(139, 92, 246, 0.3)",
  "@media (max-width: 768px)": {
    left: "30px",
  },
}));

// Timeline Item Container with animation
const TimelineItem = styled(Box)<{ index: number; isVisible: boolean }>(
  ({ index, isVisible }) => ({
    position: "relative",
    width: "100%",
    marginBottom: "3rem",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(50px)",
    transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDelay: `${index * 0.2}s`,
    "@media (min-width: 769px)": {
      paddingLeft: index % 2 === 0 ? "0" : "50%",
      paddingRight: index % 2 === 0 ? "50%" : "0",
      transform: isVisible
        ? "translateY(0) translateX(0)"
        : `translateY(50px) translateX(${index % 2 === 0 ? "-30px" : "30px"})`,
    },
    "@media (max-width: 768px)": {
      paddingLeft: "80px",
    },
  })
);

// Timeline Content
const TimelineContent = styled(Box)<{ index: number }>(({ index }) => ({
  position: "relative",
  "@media (min-width: 769px)": {
    marginLeft: index % 2 === 0 ? "0" : "30px",
    marginRight: index % 2 === 0 ? "30px" : "0",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "20px",
      width: "0",
      height: "0",
      border: "15px solid transparent",
      borderRightColor: index % 2 === 0 ? "#2d3748" : "transparent",
      borderLeftColor: index % 2 === 0 ? "transparent" : "#2d3748",
      left: index % 2 === 0 ? "-30px" : "auto",
      right: index % 2 === 0 ? "auto" : "-30px",
    },
  },
  "@media (max-width: 768px)": {
    "&::before": {
      content: '""',
      position: "absolute",
      top: "20px",
      left: "-30px",
      width: "0",
      height: "0",
      border: "15px solid transparent",
      borderRightColor: "#2d3748",
    },
  },
}));

// Animated Timeline Dot
const AnimatedTimelineDot = styled(TimelineDot)<{ isVisible: boolean }>(
  ({ isVisible }) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? "translateX(-50%) scale(1)"
      : "translateX(-50%) scale(0)",
    transition: "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    "@media (max-width: 768px)": {
      transform: isVisible
        ? "translateX(-50%) scale(1)"
        : "translateX(-50%) scale(0)",
    },
  })
);

// Custom hook for intersection observer - triggers every time element enters/leaves view
const useIntersectionObserver = (options = {}) => {
  const [visibleElements, setVisibleElements] = useState<Set<number>>(
    new Set()
  );
  const elementsRef = useRef<Map<number, Element>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(
            entry.target.getAttribute("data-index") || "0"
          );
          setVisibleElements((prev) => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(index);
            } else {
              newSet.delete(index); // Remove when not visible - enables re-animation
            }
            return newSet;
          });
        });
      },
      {
        threshold: 0.15,
        rootMargin: "-10px 0px",
        ...options,
      }
    );

    elementsRef.current.forEach((element) => {
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [elementsRef.current.size]); // Re-run when elements change

  const setElementRef = (index: number) => (element: Element | null) => {
    if (element) {
      elementsRef.current.set(index, element);
      // Observe new elements immediately
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    } else {
      if (observerRef.current && elementsRef.current.has(index)) {
        const elementToUnobserve = elementsRef.current.get(index);
        if (elementToUnobserve) {
          observerRef.current.unobserve(elementToUnobserve);
        }
      }
      elementsRef.current.delete(index);
    }
  };

  return { visibleElements, setElementRef };
};

const Education = () => {

  const { visibleElements, setElementRef } = useIntersectionObserver();

  return (
    <Box
      minH="100vh"
      pos="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={{ base: "1rem", md: "2rem" }}
    >
      {/* Background Elements */}
      <BackgroundLayer>
        <GridPattern />
        <Box
          minH="100vh"
          pos="relative"
          overflow="hidden"
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={{ base: "1rem", md: "2rem" }}
          
        />

        <Box
          minH="100vh"
          pos="relative"
          overflow="hidden"
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={{ base: "1rem", md: "2rem" }}
          
        />
      </BackgroundLayer>

      <Container
        maxW="6xl"
        position="relative"
        zIndex={10}
        width="100%"
        mt={{base:8, md: "0", lg: "0"}}
      >
        {/* Header - Fixed to be visible */}
        <VStack gap={2} textAlign="center" mb={16}>
          <IconWrapper>
            <GraduationCap
              style={{ width: "2rem", height: "2rem", color: "white" }}
            />
          </IconWrapper>
          <Heading
            bgGradient="linear(to-r, purple.400, purple.600)"
            bgClip="text"
            mb={5}
            mt={3}
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="bold"
            color={"#818cf8"}
          >
            Education
          </Heading>
          <Divider />
          <Text fontSize={{ base: "17px", md: "18px" }} color="gray.400">
            Milestones in my academic adventure
          </Text>
        </VStack>

        {/* Timeline Container */}
        <Box position="relative" maxW="1000px" mx="auto">
          {/* Timeline Line */}
          <TimelineLine />

          {educations.map((edu, index) => {
            
            const isVisible = visibleElements.has(index);

            return (
              <TimelineItem
                key={index}
                index={index}
                isVisible={isVisible}
                ref={setElementRef(index)}
                data-index={index}
              >
                {/* Timeline Dot */}
                <AnimatedTimelineDot
                  status={edu.status}
                  isVisible={isVisible}
                />

                {/* Timeline Content */}
                <TimelineContent index={index}>
                  {/* Apply 3D effect to the entire education item */}
                  <EducationItemWrapper
                    p={6}
                    rounded="2xl"
                    color="white"
                    transition="all 0.3s ease-in-out"
                    cursor="pointer"
                    position="relative"
                  >
                    {/* Status Badge */}
                    <Badge
                      position="absolute"
                      top={2}
                      right={2}
                      colorScheme={
                        edu.status === "ongoing" ? "green" : "purple"
                      }
                      variant="solid"
                      size="sm"
                      textTransform="capitalize"
                    >
                      {edu.status}
                    </Badge>

                    {/* Main Content */}
                    <Flex
                      gap={4}
                      align="start"
                      direction={{ base: "column", sm: "row" }}
                    >
                      {/* Institution Logo */}
                      <EducationIconWrapper
                        width={{ base: "60px", sm: "70px", md: "80px" }}
                        height={{ base: "60px", sm: "70px", md: "80px" }}
                        padding={{ base: "0.6rem", sm: "0.8rem", md: "1rem" }}
                        mx={{ base: "auto", sm: "0" }}
                        opacity={isVisible ? 1 : 0}
                        transform={
                          isVisible
                            ? "scale(1) rotate(0deg)"
                            : "scale(0.8) rotate(-10deg)"
                        }
                        transition="all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
                        transitionDelay={`${index * 0.2 + 0.3}s`}
                      >
                        <img
                          src={edu.logo}
                          alt={edu.institution}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                            filter:
                              "grayscale(0.3) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
                            transition: "all 0.3s ease",
                            zIndex: 1,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.filter =
                              "grayscale(0) drop-shadow(0 4px 8px rgba(139, 92, 246, 0.4))";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.filter =
                              "grayscale(0.3) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))";
                          }}
                        />
                      </EducationIconWrapper>

                      <Box flex="1" textAlign={{ base: "center", sm: "left" }}>
                        <Heading
                          fontSize={{ base: "lg", md: "xl" }}
                          mb={2}
                          color="white"
                          opacity={isVisible ? 1 : 0}
                          transform={
                            isVisible ? "translateY(0)" : "translateY(20px)"
                          }
                          transition="all 0.8s ease-out"
                          transitionDelay={`${index * 0.2 + 0.1}s`}
                        >
                          {edu.degree}
                        </Heading>

                        {/* Fixed alignment for small screens */}
                        <Box
                          display="flex"
                          flexDirection={{ base: "column", sm: "row" }}
                          gap={{ base: 2, sm: 4 }}
                          mb={3}
                          opacity={isVisible ? 1 : 0}
                          transform={
                            isVisible ? "translateY(0)" : "translateY(20px)"
                          }
                          transition="all 0.8s ease-out"
                          transitionDelay={`${index * 0.2 + 0.2}s`}
                        >
                          {/* Year */}
                          <HStack 
                            gap={2} 
                            color="purple.300"
                            justifyContent={{ base: "center", sm: "flex-start" }}
                          >
                            <Calendar size={16} />
                            <Text fontSize="sm" fontWeight="medium">
                              {edu.year}
                            </Text>
                          </HStack>
                          
                          {/* Institution - Fixed alignment for small screens */}
                          <HStack 
                            gap={2} 
                            color="purple.300"
                            justifyContent={{ base: "center", sm: "flex-start" }}
                          >
                            <MapPin size={16} />
                            <Text fontSize="sm">{edu.institution}</Text>
                          </HStack>
                        </Box>

                        {edu.score && (
                          <Badge
                            colorScheme="purple"
                            rounded="md"
                            px={3}
                            py={1}
                            mb={3}
                            fontSize="xs"
                            opacity={isVisible ? 1 : 0}
                            transform={isVisible ? "scale(1)" : "scale(0.8)"}
                            transition="all 0.8s ease-out"
                            transitionDelay={`${index * 0.2 + 0.4}s`}
                            display="inline-block"
                          >
                            {edu.score}
                          </Badge>
                        )}

                        <Text
                          fontSize="sm"
                          color="gray.300"
                          lineHeight="1.6"
                          opacity={isVisible ? 1 : 0}
                          transform={
                            isVisible ? "translateY(0)" : "translateY(20px)"
                          }
                          transition="all 0.8s ease-out"
                          transitionDelay={`${index * 0.2 + 0.5}s`}
                          textAlign={{ base: "center", sm: "left" }}
                        >
                          {edu.description}
                        </Text>
                      </Box>

                      
                    </Flex>

                    
                  </EducationItemWrapper>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Education;