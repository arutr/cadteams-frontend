export default interface Media {
  id?: number;
  caption?: string;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  mime?: string;
  url: string;
}

interface ImageFormat {
  url: string;
}
