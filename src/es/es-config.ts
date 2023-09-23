export class ESConfig {
    public static config(url: string) {
        return {
            node: url,
            maxRetries: 5,
        }
    }
}