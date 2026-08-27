export interface Song {
    artist: string;
    title: string;
    start: number;
    end: number;
    duration: number;
}

export interface Playlist {
    id: string;
    name: string;
    djs: string[];
    genres: string[];
    audio: string;
    songs: Song[];
}

export interface RadioStation {
    id: string;
    displayName: string;
    image: string;
    playlists: Playlist[];
    volume?: number;
}

export interface RawRadioSong {
    artist: string;
    title: string;
    start: string;
    end: string;
}

export interface RawRadioStation {
    displayName: string;
    image: string;
    audio: string;
    dj: string | string[];
    genre: string | string[];
    songs: RawRadioSong[];
    playlists?: RawRadioPlaylist[];
}

export interface RawRadioPlaylist {
    name: string;
    audio: string;
    dj?: string | string[];
    genre?: string | string[];
    songs: RawRadioSong[];
}

export type RawRadioData = Record<string, RawRadioStation>;

export type RadioDataMap = Record<string, RadioStation>;
