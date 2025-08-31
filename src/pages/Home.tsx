import { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  ExternalLink,
  Download,
  Mail,
  MapPin,
} from "lucide-react";
import { Box, Typography, Button, Avatar, Stack } from "@mui/material";

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
  const typingStartedRef = useRef(false);

  const name = "Nishara Jayakody";
  const dynamicWords = [
    "Full-Stack Developer",
    "Problem Solver",
    "AI ML Enthusiast",
    "Creator",
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % dynamicWords.length);
    }, 3000);

    if (!typingStartedRef.current) {
      typingStartedRef.current = true;
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < name.length) {
          setTypedText(name.substring(0, i + 1));
          i++;
        } else {
          setTypingComplete(true);
          onTypingComplete();
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
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#fff",
      }}
    >
      {/* Background */}
      <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #64748b 1px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            opacity: 0.15,
            filter: "blur(60px)",
            transition: "all 1200ms ease-out",
            background: "linear-gradient(45deg, #8b5cf6, #06b6d4, #10b981)",
            transform: `translate(${mousePosition.x * 0.01 - 50}%, ${
              mousePosition.y * 0.01 - 50
            }%)`,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            right: "20%",
            width: 300,
            height: 300,
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(40px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "20%",
            left: "20%",
            width: 250,
            height: 250,
            background:
              "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(40px)",
          }}
        />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 10,
          minHeight: { xs: "100vh", lg: "90vh" }, // Reduced height on larger screens
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center", // Center vertically
          px: { xs: 2, md: 4 },
          maxWidth: 1400,
          mx: "auto",
          pt: { xs: 2, lg: 0 }, // Remove top padding on larger screens
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 3, lg: 2 } }}>
          {" "}
          {/* Reduced bottom margin */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 100,
              mb: 1,
              mt: { xs: 2, lg: 1 }, // Reduced top margin
              fontSize: { xs: "2rem", sm: "2.5rem", lg: "3rem" }, // Responsive font size
            }}
          >
            Hi, I'm{" "}
            <Box
              component="span"
              sx={{
                background:
                  "linear-gradient(135deg, #a855f7, #8b5cf6, #06b6d4, #10b981)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontWeight: 600,
                backgroundSize: "300% 300%",
                animation: "gradient 4s ease infinite",
              }}
            >
              {typedText}
            </Box>
            {!typingComplete && (
              <Box
                component="span"
                sx={{ color: "#a855f7", animation: "blink 1s infinite" }}
              >
                |
              </Box>
            )}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "#a855f7",
              mt: { xs: 2, lg: 1 }, // Reduced top margin
              mb: { xs: 0, lg: 8 },
              fontSize: { xs: "1.2rem", sm: "1.5rem", lg: "1.75rem" }, // Responsive font size
            }}
          >
            {dynamicWords[currentWord]}
          </Typography>
        </Box>

        {/* Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 2fr" },
            gap: { xs: 3, lg: 4 }, // Reduced gap on larger screens
            alignItems: "center",
            width: "100%",
            mt: { xs: 2, lg: 0 }, // Remove top margin on larger screens
          }}
        >
          {/* Photo */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", lg: "flex-start" },
              mt: { xs: 0, lg: -2 }, // Negative margin to pull up on larger screens
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: -2,
                  right: -2,
                  bottom: -2,
                  left: -2,
                  background:
                    "linear-gradient(45deg, rgba(139, 92, 246, 0.3), transparent, rgba(6, 182, 212, 0.3))",
                  borderRadius: "50%",
                  filter: "blur(20px)",
                  opacity: 0.3,
                  transition: "opacity 800ms ease-out",
                  "&:hover": { opacity: 0.7 },
                }}
              />
              <Avatar
                src="/profile.png"
                alt="Nishara"
                sx={{
                  width: { xs: 220, sm: 260, lg: 380 }, // Reduced size on larger screens
                  height: { xs: 220, sm: 260, lg: 380 },
                  border: "3px solid rgba(139,92,246,0.4)",
                  transform: "translateY(0)", // Removed translateY
                  boxShadow:
                    "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,92,246,0.2), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 25px rgba(139,92,246,0.4)",
                  transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow:
                      "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,92,246,0.2), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 25px rgba(139,92,246,0.4)",
                  },
                }}
              />
            </Box>
          </Box>

          {/* Content Section */}
          <Box
            sx={{
              textAlign: { xs: "center", lg: "left" },
              px: { xs: 0, md: 2 },
              mt: { xs: 0, lg: -2 }, // Negative margin to pull up on larger screens
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#cbd5e1",
                fontWeight: 300,
                lineHeight: 1.8,
                mb: 2,
                fontSize: { xs: 17, sm: 17, md: 18 },
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              }}
            >
              I’m a motivated and adaptable third-year IT undergraduate with a
              strong passion for full-stack development and problem-solving.
              With a proactive mindset, I’m always eager to gain hands-on
              experience, collaborate with others, and deliver impactful
              solutions. I enjoy taking on challenges that allow me to explore
              new technologies and expand my skill set, particularly in web and
              mobile application development.
              <br />
              <br />
              Beyond tech, I enjoy content creation and have a growing interest
              in marketing and digital engagement.
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              justifyContent={{ xs: "center", lg: "flex-start" }}
              flexWrap="wrap"
              mb={4}
            >
              {" "}
              {/* Reduced bottom margin */}
              {["Full-Stack", "UI/UX", "Problem Solving"].map((skill) => (
                <Box
                  key={skill}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: "2rem",
                    fontSize: 14,
                    color: "#cbd5e1",
                    border: "1px solid rgba(148,163,184,0.2)",
                    background: "rgba(51,65,85,0.3)",
                    backdropFilter: "blur(10px)",
                    animation: "fadeIn 0.8s ease-out forwards",
                    transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                    "&:hover": {
                      borderColor: "rgba(139,92,246,0.5)",
                      color: "#a855f7",
                      background: "rgba(139,92,246,0.1)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {skill}
                </Box>
              ))}
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              mb={4}
              alignItems={{ xs: "center", sm: "flex-start" }}
            >
              <Button
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: "2rem",
                  fontWeight: 600,
                  textTransform: "none",
                  background: "linear-gradient(135deg, #ffffff, #f8fafc)",
                  color: "#0f172a",
                  boxShadow: "0 4px 15px rgba(255,255,255,0.2)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 25px rgba(255,255,255,0.3)",
                  },
                }}
                onClick={() => scrollToSection("projects")}
                endIcon={<ExternalLink size={16} />}
              >
                View My Work
              </Button>

              <Button
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: "2rem",
                  fontWeight: 600,
                  textTransform: "none",
                  background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                  color: "#fff",
                  "&:hover": {
                    background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                    transform: "translateY(-3px)",
                  },
                }}
                onClick={() => window.open("/CV.pdf", "_blank")}
                startIcon={<Download size={16} />}
              >
                View CV
              </Button>
            </Stack>

            <Stack
              direction="row"
              spacing={3}
              justifyContent={{ xs: "center", lg: "flex-start" }}
              mb={3}
              flexWrap="wrap"
            >
              {" "}
              {/* Reduced bottom margin */}
              <Stack direction="row" spacing={1} alignItems="center">
                <Mail size={16} />
                <Typography variant="body2" color="#94a3b8">
                  dthnjayakody@gmail.com
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <MapPin size={16} />
                <Typography variant="body2" color="#94a3b8">
                  Gampaha, Sri Lanka
                </Typography>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              spacing={2}
              justifyContent={{ xs: "center", lg: "flex-start" }}
            >
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
                <Box
                  key={href}
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    p: 1.5,
                    color: "#94a3b8",
                    background: "rgba(51,65,85,0.3)",
                    borderRadius: "50%",
                    border: "1px solid rgba(148,163,184,0.2)",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                    "&:hover": {
                      color: "#fff",
                      background: "rgba(139,92,246,0.2)",
                      borderColor: "rgba(139,92,246,0.4)",
                      transform: "translateY(-3px)",
                    },
                  }}
                  title={label}
                >
                  <Icon size={28} />
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* Animations */}
      <style>
        {`
        @keyframes gradient { 0%,100%{background-position:0% 50%}50%{background-position:100% 50%} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.8;transform:scale(1.1)} }
        @keyframes blink {0%,50%{opacity:1}51%,100%{opacity:0}}
        @keyframes fadeIn {from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}}
        `}
      </style>
    </Box>
  );
};

export default Home;
