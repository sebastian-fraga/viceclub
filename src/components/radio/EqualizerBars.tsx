const bars = [
    { delay: 0, duration: 0.8, maxHeight: "50%", midHeight: "20%" },
    { delay: 0.25, duration: 1.1, maxHeight: "75%", midHeight: "40%" },
    { delay: 0.1, duration: 0.7, maxHeight: "100%", midHeight: "30%" },
    { delay: 0.4, duration: 1.2, maxHeight: "75%", midHeight: "25%" },
    { delay: 0.15, duration: 0.9, maxHeight: "50%", midHeight: "35%" },
];

export function EqualizerBars() {
    return (
        <div className="flex items-center gap-0.5 h-4 w-full">
            {bars.map((bar, i) => (
                <span
                    key={i}
                    className={`equalizer-bar ${i === 2 ? "w-4" : "w-3.5"} rounded-full bg-black`}
                    style={
                        {
                            animationDelay: `${bar.delay}s`,
                            animationDuration: `${bar.duration}s`,
                            "--max-height": bar.maxHeight,
                            "--mid-height": bar.midHeight,
                        } as React.CSSProperties
                    }
                />
            ))}
        </div>
    );
}
