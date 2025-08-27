import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  useTheme,
  useMediaQuery,
  styled 
} from '@mui/material';
import { Activity } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  iconPath?: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Programming",
    skills: [
      { name: "C", level: 85, iconPath: "/C.svg" },
      { name: "C#", level: 85, iconPath: "/CSharp.svg" },
      { name: "Java", level: 70, iconPath: "/Java.svg" },
      { name: "Python", level: 70, iconPath: "/Python.svg" },
      { name: "JavaScript", level: 70, iconPath: "/JavaScript.svg" },
      { name: "TypeScript", level: 70, iconPath: "/TypeScript.svg" },
    ],
  },
  {
    name: "Web Development",
    skills: [
      { name: "React", level: 90, iconPath: "/react.svg" },
      { name: "Next.js", level: 85, iconPath: "/Next.js.svg" },
      { name: "Vite.js", level: 85, iconPath: "/Vite.js.svg" },
      { name: "Tailwind CSS", level: 88, iconPath: "/TailwindCSS.svg" },
      { name: "HTML", level: 95, iconPath: "/HTML5.svg" },
      { name: "CSS", level: 90, iconPath: "/CSS3.svg" },
      { name: "Node.js", level: 85, iconPath: "/Node.js.svg" },
      { name: "ASP.Net Core", level: 70, iconPath: "/NETcore.svg" },
    ],
  },
  {
    name: "Database",
    skills: [
      { name: "MySQL", level: 85, iconPath: "/MySQL.svg" },
      { name: "MSSQL", level: 70, iconPath: "/MSSQL.svg" },
      { name: "MongoDB", level: 70, iconPath: "/MongoDB.svg" },
    ],
  },
  {
    name: "Other",
    skills: [
      { name: "Figma", level: 70, iconPath: "/Figma.svg" },
    ],
  },
];

// Styled components
const BackgroundLayer = styled(Box)({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  pointerEvents: 'none',
});

const GridPattern = styled(Box)({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  opacity: 0.03,
  backgroundImage: 'radial-gradient(circle at 2px 2px, #64748b 1px, transparent 0)',
  backgroundSize: '50px 50px',
});

const IconWrapper = styled(Box)({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0.75rem',
  borderRadius: '9999px',
  background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
  marginTop: '1.5rem',
  boxShadow: '0 4px 10px rgba(99, 102, 241, 0.4)',
});

const Divider = styled(Box)({
  width: '6rem',
  height: '0.25rem',
  margin: '0 auto 1rem',
  borderRadius: '9999px',
  background: 'linear-gradient(to right, #818cf8, #a78bfa)',
});

const SkillIconWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 80,
  height: 80,
  padding: '1rem',
  background: 'linear-gradient(145deg, rgba(55, 65, 81, 0.8), rgba(31, 41, 55, 0.9))',
  borderRadius: '1.2rem',
  border: '1px solid rgba(148, 163, 184, 0.15)',
  boxShadow: `0 8px 16px rgba(0, 0, 0, 0.3),
              0 4px 8px rgba(0, 0, 0, 0.2),
              inset 0 1px 2px rgba(255, 255, 255, 0.1),
              inset 0 -1px 2px rgba(0, 0, 0, 0.2)`,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  
  '&:hover': {
    transform: 'translateY(-8px) scale(1.08)',
    boxShadow: `0 15px 30px rgba(0, 0, 0, 0.4),
                0 8px 16px rgba(139, 92, 246, 0.2),
                inset 0 2px 4px rgba(255, 255, 255, 0.15),
                inset 0 -2px 4px rgba(0, 0, 0, 0.3)`,
    background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.3), rgba(55, 65, 81, 0.9))',
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  
  '&:active': {
    transform: 'translateY(-6px) scale(1.05)',
    boxShadow: `0 10px 20px rgba(0, 0, 0, 0.3),
                0 4px 8px rgba(139, 92, 246, 0.15),
                inset 0 1px 2px rgba(255, 255, 255, 0.1),
                inset 0 -1px 3px rgba(0, 0, 0, 0.4)`,
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '1px',
    left: '1px',
    right: '1px',
    bottom: '1px',
    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05), transparent)',
    borderRadius: '1.1rem',
    pointerEvents: 'none',
  },
});

const SkillsBox = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '2rem',
  margin: '0 auto',
});

const Skills: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const allSkills = skillCategories.flatMap((cat) => cat.skills);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isSmallMobile ? '2rem 1rem' : isMobile ? '2rem 1rem' : '4rem 2rem',
      }}
    >
      {/* Background Elements */}
      <BackgroundLayer>
        <GridPattern />
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            right: '20%',
            width: { xs: 200, sm: 250, md: 300 },
            height: { xs: 200, sm: 250, md: 300 },
            borderRadius: '50%',
            filter: 'blur(40px)',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: '20%',
            width: { xs: 200, sm: 250, md: 300 },
            height: { xs: 200, sm: 250, md: 300 },
            borderRadius: '50%',
            filter: 'blur(40px)',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
          }}
        />
      </BackgroundLayer>

      <Container 
        sx={{ 
          position: 'relative', 
          zIndex: 10, 
          width: '100%', 
          maxWidth: 1000, 
          margin: '0 auto' 
        }}
      >
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <IconWrapper>
            <Activity style={{ width: '2rem', height: '2rem', color: 'white' }} />
          </IconWrapper>
          <Typography 
            variant="h2" 
            sx={{
              fontSize: isSmallMobile ? '1.8rem' : isMobile ? '2rem' : '2.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #818cf8, #a78bfa)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              mb: 2,
              mt: 3,
            }}
          >
            Skills
          </Typography>
          <Divider />
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#9ca3af', 
              fontSize: '1.125rem' 
            }}
          >
            Technologies and tools I work with
          </Typography>
        </Box>

        {/* Single Skills Box */}
        <SkillsBox sx={{ gap: isSmallMobile ? '1rem' : isMobile ? '1.5rem' : '2rem' }}>
          {allSkills.map((skill) => (
            <SkillIconWrapper 
              key={skill.name}
              sx={{ 
                width: isSmallMobile ? 60 : isMobile ? 70 : 80, 
                height: isSmallMobile ? 60 : isMobile ? 70 : 80,
                padding: isSmallMobile ? '0.6rem' : isMobile ? '0.8rem' : '1rem'
              }}
            >
              {skill.iconPath ? (
                <img 
                  src={skill.iconPath} 
                  alt={skill.name} 
                  style={{ 
                    width: isSmallMobile ? 30 : isMobile ? 35 : 40, 
                    height: isSmallMobile ? 30 : isMobile ? 35 : 40,
                    objectFit: 'contain',
                    filter: 'grayscale(0.3) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                    transition: 'all 0.3s ease',
                    zIndex: 1,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0) drop-shadow(0 4px 8px rgba(139, 92, 246, 0.4))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0.3) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))';
                  }}
                />
              ) : (
                <span>💻</span>
              )}
            </SkillIconWrapper>
          ))}
        </SkillsBox>
      </Container>
    </Box>
  );
};

export default Skills;
