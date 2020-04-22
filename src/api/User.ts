interface User {
  firstName: string;
  lastName: string;
  profileUrl?: string;
  specialisation: string;
  labels: string[];
  location: string;
  experience: number;
  languages: string[];
  tools: string[];
  designs: string[];
  uniqueSkills?: string[];
}

export default User;
