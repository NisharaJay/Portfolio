import { useState, useEffect, useRef } from "react";
import {
  Code,
  ExternalLink,
  Github,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Box, Typography, styled } from "@mui/material";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  year: string;
  images: string[];
  githubUrl?: string;
  dockerHubUrl?: string;
}

// Styled components
const Container = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4, 2),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3, 2),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2, 1.5),
  },
}));

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

const AmbientLight = styled(Box)({
  position: "absolute",
  borderRadius: "50%",
  filter: "blur(40px)",
});

const AmbientLight1 = styled(AmbientLight)({
  top: "20%",
  right: "20%",
  width: "300px",
  height: "300px",
  background:
    "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
});

const AmbientLight2 = styled(AmbientLight)({
  bottom: "20%",
  left: "20%",
  width: "250px",
  height: "250px",
  background:
    "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)",
});

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 10,
  width: "100%",
  maxWidth: "1200px",
  margin: theme.spacing(1, "auto"),
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
  },
}));

const SectionHeader = styled(Box)({
  textAlign: "center",
  marginBottom: "2rem",
});

const IconWrapper = styled(Box)({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0.75rem",
  borderRadius: "9999px",
  background: "linear-gradient(to right, #6366f1, #8b5cf6)",
  marginBottom: 0,
});

const Title = styled(Typography)({
  fontSize: "2.5rem",
  fontWeight: "bold",
  background: "linear-gradient(to right, #818cf8, #a78bfa)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  marginBottom: "1.5rem",
  "@media (max-width: 768px)": {
    fontSize: "2rem",
  },
  "@media (max-width: 480px)": {
    fontSize: "1.8rem",
  },
});

const Divider = styled(Box)({
  width: "6rem",
  height: "0.25rem",
  margin: "0 auto 1rem",
  borderRadius: "9999px",
  background: "linear-gradient(to right, #818cf8, #a78bfa)",
});

const Subtitle = styled(Typography)({
  color: "#9ca3af",
  fontSize: "1.125rem",
});

const ProjectsGrid = styled(Box)(() => ({
  display: "grid",
  gap: "2rem",
  gridTemplateColumns: "repeat(3, minmax(0, 320px))",
  gridTemplateRows: "auto auto",
  justifyContent: "center",
  justifyItems: "center",
  "@media (max-width: 1200px)": {
    gridTemplateColumns: "repeat(2, minmax(0, 320px))",
    justifyContent: "center",
  },
  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
    gap: "1.5rem",
    justifyContent: "center",
  },
}));

interface ProjectCardProps {
  isVisible: boolean;
}

const ProjectCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isVisible",
})<ProjectCardProps>(({ isVisible }) => ({
  width: "100%",
  maxWidth: "320px",
  borderRadius: "1.5rem",
  backdropFilter: "blur(10px)",
  background: "rgba(31, 41, 55, 0.7)",
  border: "1px solid rgba(99, 102, 241, 0.2)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  overflow: "hidden",
  position: "relative",
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? "translateY(0)" : "translateY(20px)",
  "&:hover": {
    transform: "translateY(-8px)",
    borderColor: "rgba(99, 102, 241, 0.4)",
    boxShadow: "0 15px 40px rgba(99, 102, 241, 0.25)",
  },
  "@media (max-width: 768px)": {
    maxWidth: "400px",
  },
  "@media (max-width: 480px)": {
    maxWidth: "100%",
    margin: "0 8px",
  },
}));

const LoadingAnimation = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(31, 41, 55, 0.8)",
  zIndex: 5,
  transition: "opacity 0.3s ease",
});

const LoadingSpinner = styled(Box)({
  width: "40px",
  height: "40px",
  border: "3px solid rgba(99, 102, 241, 0.3)",
  borderRadius: "50%",
  borderTopColor: "#6366f1",
  animation: "spin 1s ease-in-out infinite",
  "@keyframes spin": {
    to: { transform: "rotate(360deg)" },
  },
});

const ImageContainer = styled(Box)({
  position: "relative",
  height: "200px",
  overflow: "hidden",
  "&:hover .hoverOverlay": {
    opacity: 1,
  },
  "&:hover .imageOverlay": {
    opacity: 1,
  },
  "@media (max-width: 480px)": {
    height: "180px",
  },
});

const ProjectImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.3s ease, opacity 0.5s ease",
});

const HoverOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.4)",
  opacity: 0,
  transition: "opacity 0.3s ease",
  zIndex: 1,
});

const ImageOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
  transition: "opacity 0.3s ease",
  zIndex: 2,
});

const ProjectLinks = styled(Box)({
  display: "flex",
  gap: "1rem",
});

const LinkButton = styled("button")({
  padding: "0.75rem",
  borderRadius: "50%",
  background: "rgba(139, 92, 246, 0.9)",
  border: "none",
  color: "white",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "rgba(139, 92, 246, 1)",
    transform: "scale(1.1)",
  },
});

const CarouselContainer = styled(Box)({
  position: "relative",
  height: "100%",
});

const CarouselNav = styled("button")({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  background: "rgba(0, 0, 0, 0.5)",
  border: "none",
  color: "white",
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  zIndex: 3,
  opacity: 0,
  transition: "opacity 0.3s ease",
  "@media (max-width: 768px)": {
    opacity: 1,
  },
});

const CarouselPrev = styled(CarouselNav)({
  left: "10px",
});

const CarouselNext = styled(CarouselNav)({
  right: "10px",
});

const ProjectContent = styled(Box)(() => ({
  padding: "1.5rem",
  "@media (max-width: 768px)": {
    padding: "1.25rem",
  },
  "@media (max-width: 480px)": {
    padding: "1rem",
  },
}));

const ProjectHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "1rem",
  "@media (max-width: 768px)": {
    flexDirection: "column",
    gap: "0.5rem",
    alignItems: "flex-start",
  },
});

const ProjectTitle = styled(Typography)({
  fontSize: "1.25rem",
  fontWeight: "bold",
  color: "white",
  margin: 0,
  "@media (max-width: 480px)": {
    fontSize: "1.1rem",
  },
});

const ProjectYear = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
  color: "#9ca3af",
  fontSize: "0.9rem",
});

const ProjectDescription = styled(Typography)({
  color: "#d1d5db",
  marginBottom: "1.5rem",
  lineHeight: 1.6,
});

const TechStack = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
});

const TechTag = styled(Box)({
  background: "rgba(55, 65, 81, 0.6)",
  color: "#d1d5db",
  padding: "0.25rem 0.75rem",
  borderRadius: "9999px",
  fontSize: "0.8rem",
  border: "1px solid rgba(148, 163, 184, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: "rgba(139, 92, 246, 0.5)",
    color: "white",
    background: "rgba(99, 102, 241, 0.2)",
  },
});

const Projects = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "Moodify",
      description: "Music Recommendation Chatbot based on User's Mood.",
      tech: ["Python", "PyTorch", "HuggingFace Transformers", "LangChain", "Chroma", "FastAPI", "Next.js", "Docker"],
      year: "2025",
      images: ["/moodify.png"],
      githubUrl: "https://github.com/yourusername/moodify-chat",
      dockerHubUrl: "https://hub.docker.com/repository/docker/nisharajay/moodify-chat-backend",
    },
    {
      id: 2,
      title: "LeafCare",
      description:
        "A CNN-based system to recognize 38 plant diseases with Dockerized deployment.",
      tech: ["Python", "TensorFlow/Keras", "Scikit-learn", "Streamlit", "MongoDB"],
      year: "2025",
      images: ["/leaf-image-upload.png", "/leaf-disease-analysis.png"],
      githubUrl: "https://github.com/NisharaJay/leaf-care-app",
      dockerHubUrl: "https://hub.docker.com/repository/docker/nisharajay/leaf-care-app",
    },
    {
      id: 3,
      title: "English Grammar Corrector",
      description:
        "A T5-based AI system to automatically improves sentence grammar correctness.",
      tech: ["Python", "PyTorch", "HuggingFace Transformers", "FastAPI", "Next.js"],
      year: "2025",
      images: ["/grammar.png"],
      githubUrl: "https://github.com/NisharaJay/english-grammar-corrector",
    },
    {
      id: 4,
      title: "PresCrypt",
      description:
        "Doctor-Patient Management System - Mentored by Creative Software",
      tech: [
        "Next.js",
        "ASP.NET Core",
        "MSSQL",
        "Tailwind CSS",
        "Python Flask",
        "OpenMRS",
      ],
      year: "2024 - 2025",
      images: ["/swPrj.jpg", "/PresCrypt.png"],
      githubUrl: "https://github.com/TechGenPioneers/PresCrypt",
    },
    {
      id: 5,
      title: "StrayCare",
      description: "Volunteering Platform for Stray Animals",
      tech: ["React", "MongoDB", "Tailwind CSS", "Ballerina"],
      year: "2024",
      images: ["/StrayCare.png"],
      githubUrl: "https://github.com/AnjanaNimesh/Stray-Care-Ballerina",
    },
    {
      id: 6,
      title: "Smart Exam Hall",
      description:
        "A system to automate several operational tasks within exam halls.",
      tech: ["React", "Node.js", "Tailwind CSS", "MySQL"],
      year: "2023 - 2024",
      images: ["/HardwarePrj.jpg", "/login.png"],
      githubUrl: "https://github.com/NisharaJay/SmartExamHall",
    },
  ];

  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute("data-id"));
            setTimeout(() => {
              setVisibleProjects((prev) => [...prev, id]);
            }, 150 * id);
          }
        });
      },
      { threshold: 0.2 }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Grid positioning for different screen sizes
  const getGridPosition = (index: number) => {
    if (window.innerWidth >= 1200) {
      // Desktop layout
      if (index < 3) return { gridRow: 1 };
      return { gridColumn: `${index - 2} / ${index - 1}`, gridRow: 2 };
    } else if (window.innerWidth >= 768) {
      // Tablet layout
      if (index < 2) return { gridRow: 1 };
      if (index < 4) return { gridRow: 2 };
      if (index === 4)
        return { gridRow: 3, gridColumn: "1 / 3", justifySelf: "center" };
    }
    // Mobile layout - no special positioning
    return {};
  };

  return (
    <Container>
      <BackgroundLayer>
        <GridPattern />
        <AmbientLight1 />
        <AmbientLight2 />
      </BackgroundLayer>

      <ContentWrapper>
        <SectionHeader>
          <IconWrapper style={{ marginBottom:"1.5rem"}}>
            <Code style={{ width: "2rem", height: "2rem", color: "white"}} />
          </IconWrapper>
          <Title variant="h2">Featured Projects</Title>
          <Divider />
          <Subtitle variant="subtitle1">
            Some of my recent work and contributions
          </Subtitle>
        </SectionHeader>

        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              ref={(el) => {
                projectRefs.current[index] = el as HTMLDivElement | null;
              }}
              data-id={project.id}
              isVisible={visibleProjects.includes(project.id)}
              sx={getGridPosition(index)}
            >
              {!visibleProjects.includes(project.id) && (
                <LoadingAnimation>
                  <LoadingSpinner />
                </LoadingAnimation>
              )}

              <ImageCarousel
                images={project.images}
                title={project.title}
                isVisible={visibleProjects.includes(project.id)}
                githubUrl={project.githubUrl}
                liveUrl={project.dockerHubUrl}
              />

              <ProjectContent>
                <ProjectHeader>
                  <ProjectTitle variant="h3">{project.title}</ProjectTitle>
                  <ProjectYear>
                    <Calendar style={{ width: "1rem", height: "1rem" }} />
                    {project.year}
                  </ProjectYear>
                </ProjectHeader>

                <ProjectDescription variant="body1">
                  {project.description}
                </ProjectDescription>

                <TechStack>
                  {project.tech.map((tech, techIndex) => (
                    <TechTag key={techIndex}>{tech}</TechTag>
                  ))}
                </TechStack>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ContentWrapper>
    </Container>
  );
};

interface ImageCarouselProps {
  images: string[];
  title: string;
  isVisible: boolean;
  githubUrl?: string;
  liveUrl?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  title,
  isVisible,
  githubUrl,
  liveUrl,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (images.length > 1 && isVisible) {
      intervalRef.current = setInterval(() => {
        nextImage();
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length, isVisible]);

  const nextImage = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );

    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevImage = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );

    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleLinkClick = (e: React.MouseEvent, url: string | undefined) => {
    e.stopPropagation();
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <ImageContainer>
      <CarouselContainer>
        {images.map((image, index) => (
          <ProjectImage
            key={index}
            src={image}
            alt={`${title} - Image ${index + 1}`}
            className="projectImage"
            sx={{
              opacity: index === currentIndex ? 1 : 0,
              position: index === currentIndex ? "relative" : "absolute",
              top: 0,
              left: 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        ))}

        <HoverOverlay className="hoverOverlay" />
        
        {images.length > 1 && (
          <>
            <CarouselPrev
              className="carouselNav"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </CarouselPrev>
            <CarouselNext
              className="carouselNav"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </CarouselNext>
          </>
        )}

        <ImageOverlay className="imageOverlay">
          <ProjectLinks>
            {liveUrl && (
              <LinkButton
                aria-label="View Live Project"
                onClick={(e) => handleLinkClick(e, liveUrl)}
              >
                <ExternalLink style={{ width: "1.25rem", height: "1.25rem" }} />
              </LinkButton>
            )}
            {githubUrl && (
              <LinkButton
                aria-label="View Source Code"
                onClick={(e) => handleLinkClick(e, githubUrl)}
              >
                <Github style={{ width: "1.25rem", height: "1.25rem" }} />
              </LinkButton>
            )}
          </ProjectLinks>
        </ImageOverlay>
      </CarouselContainer>
    </ImageContainer>
  );
};

export default Projects;