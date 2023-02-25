interface ThumbnailInterface {
    quality: string;
    url: string;
    width: number;
    height: number;
}

interface AudioInterface {
    type: string;
    title: string;
    videoId: string;
    author: string;
    lengthSeconds: number;
    videoThumbnails: ThumbnailInterface[]
}

export default AudioInterface