import { useState, useEffect, useRef } from "react";
import {
  Code,
  ExternalLink,
  Github,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import styles from "../styles/Projects.module.css";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  year: string;
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const Projects = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "Personal portfolio with modern design and animations",
      tech: ["Vite", "TypeScript"],
      year: "2025",
      images: ["/Portfolio.png"],
      githubUrl: "https://github.com/yourusername/portfolio",
      liveUrl: "https://your-portfolio.com",
    },
    {
      id: 2,
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
      id: 3,
      title: "StrayCare",
      description: "Volunteering Platform for Stray Animals",
      tech: ["React", "MongoDB", "Tailwind CSS", "Ballerina"],
      year: "2024",
      images: ["/StrayCare.png"],
      githubUrl: "https://github.com/AnjanaNimesh/Stray-Care-Ballerina",
    },
    {
      id: 4,
      title: "Expense Tracker",
      description:
        "A platform to track expenses and visualize data with login authentication",
      tech: ["Next.js", "MongoDB", "Tailwind CSS"],
      year: "2025",
      images: ["/Expense.png"],
      githubUrl: "https://github.com/NisharaJay/Expense-Tracker",
    },
    {
      id: 5,
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

  return (
    <div className={styles.container}>
      <div className={styles.backgroundLayer}>
        <div className={styles.gridPattern} />
        <div className={styles.ambientLight1} />
        <div className={styles.ambientLight2} />
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.sectionHeader}>
          <div className={styles.iconWrapper}>
            <Code className={styles.icon} />
          </div>
          <h2 className={styles.title}>Featured Projects</h2>
          <div className={styles.divider} />
          <p className={styles.subtitle}>
            Some of my recent work and contributions
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                projectRefs.current[index] = el;
              }}
              data-id={project.id}
              className={`${styles.projectCard} ${
                visibleProjects.includes(project.id) ? styles.visible : ""
              }`}
            >
              {!visibleProjects.includes(project.id) && (
                <div className={styles.loadingAnimation}>
                  <div className={styles.loadingSpinner} />
                </div>
              )}

              <ImageCarousel
                images={project.images}
                title={project.title}
                isVisible={visibleProjects.includes(project.id)}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
              />

              <div className={styles.projectContent}>
                <div className={styles.projectHeader}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <span className={styles.projectYear}>
                    <Calendar className={styles.yearIcon} />
                    {project.year}
                  </span>
                </div>

                <p className={styles.projectDescription}>
                  {project.description}
                </p>

                <div className={styles.techStack}>
                  {project.tech.map((tech, index) => (
                    <span key={index} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
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
    <div className={styles.imageContainer}>
      <div className={styles.carouselContainer}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${title} - Image ${index + 1}`}
            className={styles.projectImage}
            style={{
              opacity: index === currentIndex ? 1 : 0,
              position: index === currentIndex ? "relative" : "absolute",
              top: 0,
              left: 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        ))}

        {images.length > 1 && (
          <>
            <button
              className={`${styles.carouselNav} ${styles.carouselPrev}`}
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className={`${styles.carouselNav} ${styles.carouselNext}`}
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        <div className={styles.imageOverlay}>
          <div className={styles.projectLinks}>
            {liveUrl && (
              <button
                className={styles.linkButton}
                aria-label="View Live Project"
                onClick={(e) => handleLinkClick(e, liveUrl)}
              >
                <ExternalLink className={styles.linkIcon} />
              </button>
            )}
            {githubUrl && (
              <button
                className={styles.linkButton}
                aria-label="View Source Code"
                onClick={(e) => handleLinkClick(e, githubUrl)}
              >
                <Github className={styles.linkIcon} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;