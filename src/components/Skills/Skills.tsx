import styles from './styles.module.css';

interface SkillProps {
  skillName: string;
}

interface SkillsProps {
  skills: string[];
}

const Skill = ({ skillName }: SkillProps) => {
  return (
    <li className={styles.skill} data-testid="skillItem">
      {skillName}
    </li>
  );
};

const Skills = ({ skills }: SkillsProps) => {
  return (
    <ul className={styles.skillList} data-testid="skillList">
      {skills.map((skill, index) => (
        <Skill skillName={skill} key={index} />
      ))}
    </ul>
  );
};

export default Skills;
