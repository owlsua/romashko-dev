import { render, screen } from '@testing-library/react';
import Skills from '@/components/Skills/Skills';

test('renders Skills', () => {
  const skills = ['JavaScript', 'React', 'TypeScript'];

  render(<Skills skills={skills} />);

  const skillList = screen.getByTestId('skillList');
  expect(skillList).toBeInTheDocument();

  const skillItems = screen.getAllByTestId('skillItem');
  expect(skillItems).toHaveLength(skills.length);

  skills.forEach((skill, index) => {
    expect(skillItems[index]).toHaveTextContent(skill);
  });
});
