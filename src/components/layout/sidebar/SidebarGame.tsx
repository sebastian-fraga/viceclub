import SidebarGameButton from "@/components/layout/sidebar/SidebarGameButton";
import SidebarGameSections from "@/components/layout/sidebar/SidebarGameSections";
import { type GameId, type SectionId } from "@/config/games";

type SidebarGameProps = {
    game: {
        id: GameId;
        name: string;
    };
    sections: SectionId[];
    isOpen: boolean;
    isActiveGame: boolean;
    activeSection: SectionId | null;
    showLabels: boolean;
    onToggle: () => void;
};

function SidebarGame({
    game,
    sections,
    isOpen,
    isActiveGame,
    activeSection,
    showLabels,
    onToggle,
}: SidebarGameProps) {

    return (
        <div className="flex flex-col gap-1 w-full max-mobile:last:pb-32">
            <SidebarGameButton
                game={game}
                isOpen={isOpen}
                isActiveGame={isActiveGame}
                showLabels={showLabels}
                onToggle={onToggle}
            />

            <SidebarGameSections
                gameId={game.id}
                sections={sections}
                isOpen={isOpen}
                isActiveGame={isActiveGame}
                activeSection={activeSection}
                showLabels={showLabels}
            />
        </div>
    );
}

export default SidebarGame;
