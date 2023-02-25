import AudioInterface from "./audio.interface";

interface AdaptiveFormatsInterface {
    audioQuality: string;
    type: string;
    url: string;
}

export default interface DetailedAudioInterface extends AudioInterface {
    url: string;
    genre: string;
    adaptiveFormats: AdaptiveFormatsInterface[];
    albumArt: string;
}