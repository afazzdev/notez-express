export interface GetNotesFilter {
  id: string;
  title: string;
  content: string;
  favorite: boolean;
  userId: string;
  updatedAt: string;
  createdAt: string;

  limit: number;
  skip: number;
}
