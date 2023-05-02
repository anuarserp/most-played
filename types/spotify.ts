export enum AlbumType {
  Album = "ALBUM",
  Single = "SINGLE",
}

export interface Album {
  album_type: AlbumType;
  artists: Artist[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  total_tracks: number;
  uri: string;
}

export interface Artist {
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Track {
  album: Album;
  artists: Artist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: null | string;
  track_number: number;
  uri: string;
  color: string;
  top: number;
}
