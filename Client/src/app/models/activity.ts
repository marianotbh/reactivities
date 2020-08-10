export type Activity = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  city: string;
  venue: string;
};

export type EditableActivity = {
  time?: Date;
} & Partial<Activity>;
