import styles from "../styles/Skills.module.css";
import { Activity } from "lucide-react";

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
      { name: "Adobe Photoshop", level: 85, iconPath: "/AdobePhotoshop.svg" },
      { name: "GIMP", level: 70, iconPath: "/GIMP.svg" },
    ],
  },
];

const Skills: React.FC = () => {
  const allSkills = skillCategories.flatMap((cat) => cat.skills);

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
            <Activity className={styles.icon} />
          </div>
          <h2 className={styles.title}>Skills</h2>
          <div className={styles.divider} />
          <p className={styles.subtitle}>Technologies and tools I work with</p>
        </div>

        {/* Single Skills Box */}
        <div className={styles.skillsBox}>
          {allSkills.map((skill) => (
            <div key={skill.name} className={styles.skillIconWrapper}>
              {skill.iconPath ? (
                <img src={skill.iconPath} alt={skill.name} className={styles.skillIcon} />
              ) : (
                <span>💻</span>
              )}
              <div className={styles.skillName}>{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;