export default interface WorkHistory {
  id: number;
  endYear?: number;
  location?: string;
  organization?: string;
  startYear: number;
  title: string;
  type: 'education' | 'employment';
}
