import { config, PROFILE_SIZES } from "../config.js";
import { RawReview, RawReviewsResult, Review, ReviewsResult } from "../types/reviews.type.js";

export const mapReview = (rawReview: RawReview): Review => ({
  id: rawReview.id,
  author: rawReview.author,
  avatarPath: config.FILM_IMAGE_API_URL + PROFILE_SIZES.small + rawReview.author_details.avatar_path,
  rating: rawReview.author_details.rating,
  content: rawReview.content,
})

export const mapResultReviews = (rawReviewResult: RawReviewsResult): ReviewsResult => ({
  page: rawReviewResult.page,
  results: rawReviewResult.results.map(mapReview),
  totalPages: rawReviewResult.total_pages,
  totalResults: rawReviewResult.total_results
})