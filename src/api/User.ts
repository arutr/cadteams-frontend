import Media from './Media';

export default interface User {
  contactEmail?: string;
  country: string;
  description?: string;
  email?: string;
  experience: number;
  id?: number;
  location: string;
  phone?: string;
  profilePicture: Media;
  sectors: Label[];
  username: string;
  type: string;

  // individual
  dailyRate: number;
  designs: Media[];
  instantBooking?: boolean;
  history?: WorkHistory[];
  languages: Label[];
  specialization: string;
  tools: Label[];
  uniqueSkills?: UniqueSkill[];
  verified: boolean;

  // enterprise
  company?: string;
  website?: string;
}

export type WorkHistory = {
  id: number;
  endYear?: number;
  location?: string;
  organization?: string;
  startYear: number;
  title: string;
  type: 'education' | 'employment';
};

export interface Label {
  id: number;
  label: string;
}

export interface UniqueSkill {
  id: number;
  skill: string;
}
