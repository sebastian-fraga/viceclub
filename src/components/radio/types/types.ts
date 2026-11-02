export type SongType = "preview" | "segment" | "news" | "episode";

export interface Song {
    artist: string;
    title: string;
    type?: SongType;
    order?: number;
    start: number;
    end: number;
    duration: number;
}

export interface Playlist {
    id: string;
    name: string;
    djs: string[];
    genres: string[];
    /** Derived by `parseRadioData` from `PUBLIC_R2_BUCKET`; not stored in the JSON. */
    audio: string;
    songs: Song[];
}

export interface RadioStation {
    id: string;
    displayName: string;
    displayNameKey?: string;
    color?: string;
    image: string;
    playlists: Playlist[];
    volume?: number;
}

export interface RawRadioSong {
    artist: string;
    title: string;
    type?: SongType;
    order?: number;
    start: string;
    end: string;
}

export interface RawRadioStation {
    displayName: string;
    displayNameKey?: string;
    color?: string;
    image: string;
    dj: string | string[];
    genre: string | string[];
    songs: RawRadioSong[];
    playlists?: RawRadioPlaylist[];
}

export interface RawRadioPlaylist {
    /**
     * Numeric index (1, 2, 3…) used ONLY to build the audio file name
     * (`{stationId}_{id}.ogg`) via `getStationAudioUrl`.
     *
     * It is NOT `Playlist.id`, which is the slug of the playlist name and is
     * what the UI uses to track the selected playlist.
     */
    id: number;
    name: string;
    dj?: string | string[];
    genre?: string | string[];
    songs: RawRadioSong[];
}

export type RawRadioData = Record<string, RawRadioStation>;

export type RadioDataMap = Record<string, RadioStation>;
