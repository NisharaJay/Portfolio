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
import { Box, Typography, Button, styled } from "@mui/material";

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

  // Styled components
  const NavbarContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isVisible',
  })<{ isVisible: boolean }>(({ isVisible }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    transition: "all 0.7s ease-out",
    width: "100%",
    transform: isVisible ? "translateY(0)" : "translateY(-100%)",
    opacity: isVisible ? 1 : 0,
    pointerEvents: isVisible ? "auto" : "none",
  }));

  const Background = styled(Box)({
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 25%, rgba(51, 65, 85, 0.95) 50%, rgba(30, 41, 59, 0.95) 75%, rgba(15, 23, 42, 0.95) 100%)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
  });

  const GridPattern = styled(Box)({
    position: "absolute",
    inset: 0,
    opacity: 0.05,
    backgroundImage: "radial-gradient(circle at 2px 2px, #64748b 1px, transparent 0)",
    backgroundSize: "50px 50px",
  });

  const GradientBorder = styled(Box)({
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "1px",
    background: "linear-gradient(to right, transparent, rgba(139, 92, 246, 0.3), transparent)",
  });

  const AmbientLight = styled(Box)({
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(3rem)",
  });

  const AmbientLight1 = styled(AmbientLight)({
    top: 0,
    right: "25%",
    width: "8rem",
    height: "8rem",
    background: "rgba(139, 92, 246, 0.05)",
  });

  const AmbientLight2 = styled(AmbientLight)({
    top: 0,
    left: "25%",
    width: "6rem",
    height: "6rem",
    background: "rgba(6, 182, 212, 0.05)",
  });

  const NavContent = styled(Box)(({ theme }) => ({
    position: "relative",
    width: "100%",
    padding: theme.spacing(0, 2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 1),
    },
  }));

  const NavInner = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    minHeight: "64px",
  });

  const LogoContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.02)",
    },
  });

  const LogoWrapper = styled(Box)({
    position: "relative",
  });

  const Logo = styled(Box)({
    width: "3rem",
    height: "3rem",
    borderRadius: "0.75rem",
    background: "linear-gradient(135deg, #8b5cf6, #7c3aed, #06b6d4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 15px -3px rgba(139, 92, 246, 0.2)",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 10px 25px -3px rgba(139, 92, 246, 0.4)",
      transform: "scale(1.05)",
    },
  });

  const LogoImage = styled("img")({
    width: "40px",
    height: "40px",
    objectFit: "contain",
  });

  const LogoGlow = styled(Box)({
    position: "absolute",
    inset: 0,
    borderRadius: "0.75rem",
    background: "linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(6, 182, 212, 0.4))",
    opacity: 0,
    transition: "opacity 0.3s ease",
    filter: "blur(0.5rem)",
    zIndex: -1,
    [`${LogoContainer}:hover &`]: {
      opacity: 0.2,
    },
  });

  const BrandText = styled(Box)({
    display: "flex",
    flexDirection: "column",
  });

  const BrandName = styled(Typography)({
    fontSize: "1.5rem",
    fontWeight: 300,
    background: "linear-gradient(135deg, #a855f7, #8b5cf6, #06b6d4, #10b981)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    backgroundSize: "300% 300%",
    animation: "gradient 4s ease infinite",
    transition: "all 0.3s ease",
    [`${LogoContainer}:hover &`]: {
      transform: "scale(1.05)",
    },
    "@keyframes gradient": {
      "0%, 100%": { 
        backgroundPosition: "0% 50%", 
      },
      "50%": { 
        backgroundPosition: "100% 50%", 
      },
    },
    "@media (max-width: 640px)": {
      fontSize: "1.25rem",
    },
  });

  const BrandSubtitle = styled(Typography)({
    fontSize: "0.75rem",
    color: "#64748b",
    fontWeight: 400,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    "@media (max-width: 640px)": {
      fontSize: "0.65rem",
    },
    "@media (max-width: 480px)": {
      display: "none",
    },
  });

  const DesktopNav = styled(Box)(({ theme }) => ({
    display: "none",
    alignItems: "center",
    gap: "2rem",
    [theme.breakpoints.up("lg")]: {
      display: "flex",
    },
  }));

  const NavItem = styled(Box)({
    position: "relative",
  });

  const NavButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'isActive',
  })<{ isActive: boolean }>(({ isActive }) => ({
    fontSize: "0.875rem",
    fontWeight: 400,
    transition: "all 0.4s ease",
    padding: "0.75rem 1.5rem",
    borderRadius: "1rem",
    border: "1px solid transparent",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    color: "#cbd5e1",
    background: "transparent",
    position: "relative",
    "&:hover, &.Mui-active": {
      color: "white",
    },
    ...(isActive && {
      background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1))",
      borderColor: "rgba(139, 92, 246, 0.3)",
      boxShadow: "0 10px 15px -3px rgba(139, 92, 246, 0.1)",
    }),
    "&:hover": {
      background: "rgba(30, 41, 59, 0.3)",
      borderColor: "rgba(100, 116, 139, 0.5)",
    },
  }));

  const ActiveIndicator = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isActive',
  })<{ isActive: boolean }>(({ isActive }) => ({
    position: "absolute",
    bottom: "0.25rem",
    left: "50%",
    transform: "translateX(-50%)",
    transition: "all 0.3s ease-out",
    width: isActive ? "1.5rem" : 0,
    height: "0.125rem",
    opacity: isActive ? 1 : 0,
  }));

  const IndicatorLine = styled(Box)({
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
    borderRadius: "9999px",
  });

  const ButtonGlow = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isActive',
  })<{ isActive: boolean }>(({ isActive }) => ({
    position: "absolute",
    inset: 0,
    borderRadius: "1rem",
    background: "linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(6, 182, 212, 0.05))",
    opacity: isActive ? 1 : 0,
    transition: "opacity 0.3s ease",
  }));

  const MobileNav = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  }));

  const MobileMenuButton = styled(Button)({
    position: "relative",
    padding: "0.75rem",
    borderRadius: "0.75rem",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid transparent",
    color: "#cbd5e1",
    background: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "auto",
    "&:hover": {
      background: "rgba(30, 41, 59, 0.4)",
      borderColor: "rgba(100, 116, 139, 0.5)",
      color: "white",
    },
  });

  const MobileMenuOverlay = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isOpen',
  })<{ isOpen: boolean }>(({ isOpen }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(15, 23, 42, 0.95)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    zIndex: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? "visible" : "hidden",
    transition: "all 0.3s ease",
  }));

  const MobileMenuContent = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    width: "100%",
    maxWidth: "300px",
    padding: "2rem",
  });

  const MobileMenuItem = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'isActive',
  })<{ isActive: boolean }>(({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem 1.5rem",
    borderRadius: "1rem",
    background: isActive ? "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1))" : "transparent",
    border: isActive ? "1px solid rgba(139, 92, 246, 0.3)" : "1px solid transparent",
    color: isActive ? "white" : "#cbd5e1",
    fontSize: "1.1rem",
    transition: "all 0.3s ease",
    boxShadow: isActive ? "0 10px 15px -3px rgba(139, 92, 246, 0.1)" : "none",
    "&:hover": {
      background: "rgba(30, 41, 59, 0.4)",
      borderColor: "rgba(100, 116, 139, 0.5)",
      color: "white",
      transform: "translateX(0.5rem)",
    },
  }));

  return (
    <>
      <NavbarContainer isVisible={isVisible}>
        {/* Background with Home component styling */}
        <Background>
          {/* Subtle grid pattern overlay */}
          <GridPattern />

          {/* Gradient border bottom */}
          <GradientBorder />

          {/* Ambient light effects */}
          <AmbientLight1 />
          <AmbientLight2 />
        </Background>

        {/* Navigation content - Full Width */}
        <NavContent>
          <NavInner>
            {/* Logo/Brand - Left Side */}
            <LogoContainer onClick={() => scrollToSection("home")}>
              <LogoWrapper>
                {/* Logo with enhanced styling matching Home component */}
                <Logo>
                  <LogoImage src="/logo.png" alt="Logo" />
                </Logo>

                {/* Glow effect on hover */}
                <LogoGlow />
              </LogoWrapper>

              <BrandText>
                <BrandName variant="h1">Nishara Jayakody</BrandName>
                <BrandSubtitle variant="subtitle2">Portfolio</BrandSubtitle>
              </BrandText>
            </LogoContainer>

            {/* Navigation Links - Right Side (Desktop) */}
            <DesktopNav>
              {navItems.map(({ id, label }) => (
                <NavItem key={id}>
                  <NavButton
                    onClick={() => scrollToSection(id)}
                    isActive={activeSection === id}
                  >
                    {label}
                    <ActiveIndicator isActive={activeSection === id}>
                      <IndicatorLine />
                    </ActiveIndicator>
                    <ButtonGlow isActive={activeSection === id} />
                  </NavButton>
                </NavItem>
              ))}
            </DesktopNav>

            {/* Mobile Menu Button */}
            <MobileNav>
              <MobileMenuButton
                type="button"
                aria-label="Toggle menu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </MobileMenuButton>
            </MobileNav>
          </NavInner>
        </NavContent>
      </NavbarContainer>

      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay isOpen={isMobileMenuOpen}>
        <MobileMenuContent>
          {navItems.map(({ id, label, icon: Icon }) => (
            <MobileMenuItem
              key={id}
              onClick={() => scrollToSection(id)}
              isActive={activeSection === id}
              startIcon={<Icon size={20} />}
            >
              {label}
            </MobileMenuItem>
          ))}
        </MobileMenuContent>
      </MobileMenuOverlay>
    </>
  );
};

export default Navbar;