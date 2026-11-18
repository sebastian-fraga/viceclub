import "./GradientBorder.css";

export default function GradientBorder() {
    return (
        <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
        >
            <span className="gb-ring" />
        </div>
    );
}
