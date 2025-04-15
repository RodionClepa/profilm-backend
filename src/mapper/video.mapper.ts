import { RawVideo, VideoResponse } from "../types/video.type.js";

export const mapVideo = (video: RawVideo): VideoResponse => (
  {
    id: video.id,
    name: video.name,
    official: video.official,
    link: video.key
  }
)