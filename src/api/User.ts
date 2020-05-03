interface User {
  firstName: string;
  lastName: string;
  profilePhoto?: string;
  specialization: string;
  sectors: string[];
  location: string;
  experience: number;
  languages: string[];
  tools: string[];
  designs: string[];
  uniqueSkills?: string[];
}

export default User;
