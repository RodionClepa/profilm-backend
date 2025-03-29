import NodeCache from 'node-cache';

class CacheService {
    private cache: NodeCache;

    constructor() {
        this.cache = new NodeCache({ stdTTL: 300, checkperiod: 320 });
    }

    get<T>(key: string): T | undefined {
        return this.cache.get(key);
    }

    set<T>(key: string, value: T): boolean {
        return this.cache.set(key, value);
    }

    has(key: string): boolean {
        return this.cache.has(key);
    }

    del(key: string): boolean {
        return this.cache.del(key) > 0;
    }

    flush(): void {
        this.cache.flushAll();
    }
}

export default new CacheService();
