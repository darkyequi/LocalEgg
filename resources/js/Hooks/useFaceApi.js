// resources/js/hooks/useFaceApi.js
import { useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

export function useFaceApi() {
    const [modelsLoaded, setModelsLoaded] = useState(false);

    useEffect(() => {
        const load = async () => {
            const MODEL_URL = '/models';
            await Promise.all([
                faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
            ]);
            setModelsLoaded(true);
        };
        load();
    }, []);

    return modelsLoaded;
}