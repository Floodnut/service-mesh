export function name(alias: string): string {
    return `${alias}`;
}

export function lookup<T>(obj: { [key: string]: any }, key: string, defaultValue: T[]): T[] {
    return obj[key] !== undefined ? [obj[key]] : defaultValue;
}