const imageClasses = "h-9 w-auto transition duration-200 hover:brightness-85"

function Support() {
    return (
        <>
            <div className="flex items-center justify-center gap-4">
                <a
                    href="https://cafecito.app/sebastianfraga"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="https://cdn.cafecito.app/imgs/buttons/button_1_3.75x.png"
                        alt="Cafecito"
                        className={imageClasses}
                        loading="lazy"
                    />
                </a>

                <a
                    href="https://ko-fi.com/T6T71RM9WX"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="/assets/images/app/kofi.webp"
                        alt="Ko-fi"
                        className={imageClasses}
                        loading="lazy"
                    />
                </a>
            </div>
        </>
    );
}

export default Support;
