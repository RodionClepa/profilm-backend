export interface RawReview {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number | null;
  };
  content: string;
  created_at: Date;
  id: string;
  updated_at: Date;
  url: string;
}

export interface RawReviewsResult {
  page: number;
  results: RawReview[];
  total_pages: number;
  total_results: number;
}

export interface Review {
  id: string;
  author: string;
  avatarPath: string;
  rating: number | null;
  content: string;
}

export interface ReviewsResult {
  page: number;
  results: Review[];
  totalPages: number;
  totalResults: number;
}