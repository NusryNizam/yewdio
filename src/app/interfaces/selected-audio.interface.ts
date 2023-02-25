import AudioInterface from "./audio.interface";

export default interface SelectedAudioInterface extends AudioInterface {
    url: string;
    genre: string;
    albumArt: string;
}