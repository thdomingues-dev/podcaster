import { createContext, useState } from 'react';

type Episode = {
	title: string;
	members: string;
	thumbnail: string;
	duration: number;
	url: string;
};

type PlayerContextData = {
	episodeList: Episode[];
	currentEpisodeIndex: number;
	isPlaying: boolean;
	togglePlay: () => void;
	handlePlay: (episode: Episode) => void;
};

const PlayerContext = createContext({} as PlayerContextData);

export const PlayerProvider: React.FC = ({ children }) => {
	const [episodeList, setEpisodeList] = useState([]);
	const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	function handlePlay(episode) {
		setEpisodeList([episode]);
		setCurrentEpisodeIndex(0);
		togglePlay();
	}

	function togglePlay() {
		setIsPlaying(!isPlaying);
	}

	return (
		<PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, isPlaying, handlePlay, togglePlay }}>
			{children}
		</PlayerContext.Provider>
	);
};

export default PlayerContext;

