import { IconCoffee, IconHeart } from "@tabler/icons-react";

const buttonClasses =
    "flex items-center gap-2 text-black bg-white px-4 py-2 mobile:px-6 mobile:py-3 rounded-md transition text-sm font-medium whitespace-nowrap";

export default function Support() {
    return (
        <div className="flex items-center justify-center gap-3">
            <a
                href="https://cafecito.app/sebastianfraga"
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonClasses} hover:bg-sky-100`}
            >
                <IconCoffee stroke={1.5} className="text-sky-500" />
                Invitame un Cafecito
            </a>

            <a
                href="https://ko-fi.com/T6T71RM9WX"
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonClasses} hover:bg-red-100`}
            >
                <IconHeart stroke={1.5} className="text-red-500" />
                Support me on Ko-fi
            </a>
        </div>
    );
}
