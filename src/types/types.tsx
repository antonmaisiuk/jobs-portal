export interface Job {
  id: number,
  createdAt: string,
  updatedAt: string,
  title: string | null,
  contactName: string | null,
  location: string | null,
  description: string | null,
  salary: string | null,
  // salaryType: '#',
  // salaryCurr: '#',
  attrs: { name: string; value: string; }[],
  url: string,
}
