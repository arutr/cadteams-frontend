export default interface Media {
  id?: number;
  mime?: string;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  url: string;
}

interface ImageFormat {
  url: string;
}
