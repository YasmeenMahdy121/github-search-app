export interface IRepository {
  id: number;
  name: string;
  private: boolean;
  description: string;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  watchers_count: number;
  forks_count: number;
  visibility: string;
  mirror_url?: any;
  default_branch: string;
}
