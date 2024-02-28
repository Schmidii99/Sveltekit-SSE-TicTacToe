import { makeId } from './utilities';

const key = "session";

export function createSessionIfNotSet() {
    if (localStorage.getItem(key) == null) {
        localStorage.setItem(key, makeId(32));
    }
}

export function isSessionSet(): boolean {
    return localStorage.getItem(key) != null;
}

export function getSession(): string {
    createSessionIfNotSet();
    return localStorage.getItem(key)!;
}