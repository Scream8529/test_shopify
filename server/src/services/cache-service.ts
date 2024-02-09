import { LRUCache } from "lru-cache";
import { getProducts } from "./shopify-service";

interface ServerCache {
    products: {};
}

class CacheService {
    private CACHE_NAME: string = "CACHE";
    private cache: LRUCache<string, ServerCache>;

    constructor() {
        this.cache = new LRUCache({
            max: 500,
            maxSize: 5000,
            ttl: 1000 * 60 * 60 * 60,
            sizeCalculation: (value, key) => {
                return 1;
            },
        });
    }

    async updateCache(headers: Record<string, any> = {}) {
        await this.loadValues(headers);
    }

    async products() {
        return await this.get<any>("products");
    }

    private async get<T>(
        key: keyof ServerCache,
        headers: Record<string, any> = {}
    ) {
        const hasKey = this.cache.get(this.CACHE_NAME)?.[key];
        if (!hasKey) {
            console.log("В кэше нет данных. Загрузка с сервера.");
            await this.loadValues(headers);
        }
        const response = this.cache?.get(this.CACHE_NAME) as ServerCache;
        return response[key];
    }

    private async loadValues(headers: Record<string, any> = {}) {
        let cache: ServerCache = {
            products: {},
        };
        const response = await getProducts();
        cache.products = response.data.data.products.edges.map((item: any) => {
            return {
                id: item.node.id,
                title: item.node.title,
                bodyHTML: item.node.bodyHtml,
                img: {
                    src: item.node.images.edges[0].node.transformedSrc,
                    alt: item.node.images.edges[0].node.altText,
                },
            };
        });
        try {
            console.log("Отправка запроса на сервер shopify.");
        } catch (error) {
            console.log({ LRU_CACHE: error });
        }

        this.cache.set(this.CACHE_NAME, cache);
    }
}

export const cacheService = new CacheService();
