import { Photo } from "./photo";

export interface User {
    id: number;
    username: string;
    token: string;
    photoUrl: string;
    memeUrl: string;
    gender: string;
    roles: string[];
    numberOflikes: number;
    likedByUsers: number;
    isBanned: boolean;
    toggleSounds: boolean;
    banExpiration: Date;
    banReason: string;
    photos: Photo[];
    email: string;
}