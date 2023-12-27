import path from 'path';

export function getFrontPath(file: string) {
    return path.join(__dirname, `../../../frontend/build/${file}`);
}