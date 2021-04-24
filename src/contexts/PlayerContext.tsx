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
	handlePlay: (episode: Episode) => void;
};

const PlayerContext = createContext({} as PlayerContextData);

export const PlayerProvider: React.FC = ({ children }) => {
	const [episodeList, setEpisodeList] = useState([]);
	const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

	function handlePlay(episode) {
		setEpisodeList([episode]);
		setCurrentEpisodeIndex(0);
	}

	return (
		<PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, handlePlay }}>
			{children}
		</PlayerContext.Provider>
	);
};

export default PlayerContext;

