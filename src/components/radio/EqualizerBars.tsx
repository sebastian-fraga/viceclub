const barDelays = [0, 0.15, 0.3];

export function EqualizerBars() {
    return (
        <div className="flex items-end gap-0.5 h-4 w-4">
            {barDelays.map((delay, i) => (
                <span
                    key={i}
                    className="equalizer-bar w-1 rounded-full bg-violet-400"
                    style={{ animationDelay: `${delay}s` }}
                />
            ))}
        </div>
    );
}
