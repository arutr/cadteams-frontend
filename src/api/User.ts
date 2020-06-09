import Media from './Media';

interface User {
  company?: string;
  contactEmail?: string;
  country: string;
  description?: string;
  designs: Media[];
  experience: number;
  email?: string;
  id?: number;
  languages: Label[];
  location: string;
  phone?: string;
  profilePicture: Media;
  sectors: Label[];
  specialization: string;
  tools: Label[];
  type: 'individual' | 'enterprise';
  uniqueSkills: UniqueSkill[];
  username: string;
  website?: string;
}

export interface Label {
  id: number;
  label: string;
}

export interface UniqueSkill {
  id: number;
  skill: string;
}

export default User;
