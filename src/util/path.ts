import path from 'path';
import { SERVER_CONFIG } from '@/config';

const { WORK_PATH } = SERVER_CONFIG;

export function resolveCWD(...dirs: string[]) {
    return path.resolve(WORK_PATH, '..', ...dirs);
}
