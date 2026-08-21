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