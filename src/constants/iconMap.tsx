import {
    FaUserFriends,
    FaUserTie,
    FaDragon,
    FaMapMarkedAlt,
    FaGavel,
    FaStickyNote,
} from 'react-icons/fa';

export const iconMap: Record<string, React.ReactNode> = {
    players: <FaUserFriends />,
    characters: <FaUserTie />,
    bestiary: <FaDragon />,
    places: <FaMapMarkedAlt />,
    artifacts: <FaGavel />,
    notes: <FaStickyNote />,
};
