import { BookOpen, Calculator, FlaskConical, Globe2, Landmark } from 'lucide-react';

const visuals = {
  'Matemática': ['blue', Calculator],
  'Português': ['purple', BookOpen],
  'Ciências': ['green', FlaskConical],
  'História': ['orange', Landmark],
  'Geografia': ['teal', Globe2],
};
export function subjectVisual(name) {
  return visuals[name] || ['blue', BookOpen];
}
