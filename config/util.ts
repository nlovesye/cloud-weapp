import path from "path";

export function resolve(...dirs: string[]) {
    return path.join(__dirname, "..", ...dirs);
}
