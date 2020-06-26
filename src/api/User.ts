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
}

export interface Individual extends User {
  dailyRate: number;
  designs: Media[];
  languages: Label[];
  specialization: string;
  tools: Label[];
  uniqueSkills?: UniqueSkill[];
}

export interface Enterprise extends User {
  company?: string;
  website?: string;
}

export interface Outsourcing extends User {
  company: string;
  website: string;
}

export interface Label {
  id: number;
  label: string;
}

export interface UniqueSkill {
  id: number;
  skill: string;
}
