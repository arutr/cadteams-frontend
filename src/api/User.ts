import WorkHistory from 'src/api/WorkHistory';
import Media from './Media';

export default interface User {
  contactEmail?: string;
  country: string;
  description?: string;
  email?: string;
  experience: number;
  id?: number;
  location: string;
  notifications?: Notification[];
  phone?: string;
  profilePicture: Media;
  provider?: 'local' | 'facebook';
  rating?: number;
  sectors: Label[];
  username: string;
  type: 'individual' | 'enterprise';

  // individual
  calendar?: Calendar;
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

export interface Calendar {
  unavailableDates: {
    id: number;
    date: string;
  }[];
}

export interface Notification {
  type: 'connection';
  email?: boolean;
  sms?: boolean;
}

export interface Label {
  id: number;
  label: string;
}

export interface UniqueSkill {
  id: number;
  skill: string;
}

export const industries = [
  'Arts & Culture',
  'Aviation',
  'Data Centres',
  'Education',
  'Healthcare',
  'Industrial',
  'Infrastructure',
  'Residential',
  'Retail & Leisure',
];
export const specializations = [
  'BIM Engineering',
  'BIM Architecture',
  'CAD Engineering',
  'CAD Architecture',
  'Civil Engineering',
  'MEP Technician',
  'Parametric Design',
  'Rendering',
  'Structural Technician',
  'Surveying',
];
