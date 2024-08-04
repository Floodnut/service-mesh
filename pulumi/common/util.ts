export function name(params: {prefix?: string, alias: string}): string {
    if (params.prefix) {
        return `${params.prefix}-${params.alias}`;
    }

    return `${params.alias}`;
}

export function lookup<T>(obj: { [key: string]: any }, key: string, defaultValue: T[]): T[] {
    return obj[key] !== undefined ? [obj[key]] : defaultValue;
}

export function merge(obj: { [key: string]: any }[]): { [key: string]: any } {
    return Object.assign({}, obj);
}
