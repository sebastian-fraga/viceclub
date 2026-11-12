const gradientCache = new Map<string, string>();

export const colorGradient = (color: string) => {
    const cached = gradientCache.get(color);
    if (cached) return cached;

    const gradient = `linear-gradient(135deg, color-mix(in srgb, ${color} 70%, white), color-mix(in srgb, ${color} 75%, black))`;
    gradientCache.set(color, gradient);
    return gradient;
};
