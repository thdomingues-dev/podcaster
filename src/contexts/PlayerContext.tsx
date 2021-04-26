import { createContext, ReactNode, useContext, useState } from 'react';

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
	isLooping: boolean;
	isShuffling: boolean;
	toggleShuffle: () => void;
	toggleLoop: () => void;
	handlePlayList: (list: Episode[], index: number) => void;
	togglePlay: () => void;
	setPlayingState: (state: boolean) => void;
	handlePlay: (episode: Episode) => void;
	handlePlayNext: () => void;
	handlePlayBack: () => void;
};

type PlayerProviderProps = {
	children: ReactNode;
}

const PlayerContext = createContext({} as PlayerContextData);

export const PlayerProvider: React.FC = ({ children }: PlayerProviderProps) => {
	const [episodeList, setEpisodeList] = useState([]);
	const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLooping, setIsLooping] = useState(false);
	const [isShuffling, setIsShuffling] = useState(false);

	function handlePlay(episode: Episode) {
		setEpisodeList([episode]);
		setCurrentEpisodeIndex(0);
		togglePlay();
	}

	function handlePlayList(list: Episode[], index: number) {
		currentEpisodeIndex === index ? togglePlay() : setIsPlaying(true);

		setEpisodeList(list);
		setCurrentEpisodeIndex(index);
	}

	function togglePlay() {
		setIsPlaying(!isPlaying);
	}

	function toggleLoop() {
		setIsLooping(!isLooping);
	}

	function toggleShuffle() {
		setIsShuffling(!isShuffling);
	}

	function setPlayingState(state: boolean) {
		setIsPlaying(state);
	}

	function handlePlayNext() {
		const nextEpisodeIndex = currentEpisodeIndex + 1;

		if (isShuffling) {
			const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
			setCurrentEpisodeIndex(nextRandomEpisodeIndex);
		} else if (nextEpisodeIndex < episodeList.length) {
			setCurrentEpisodeIndex(currentEpisodeIndex + 1);
		}
	}

	function handlePlayBack() {
		if (currentEpisodeIndex > 0) {
			setCurrentEpisodeIndex(currentEpisodeIndex - 1);
		}
	}

	return (
		<PlayerContext.Provider
			value={{
				episodeList,
				currentEpisodeIndex,
				isPlaying,
				isLooping,
				isShuffling,
				toggleLoop,
				toggleShuffle,
				handlePlay,
				handlePlayNext,
				handlePlayBack,
				togglePlay,
				handlePlayList,
				setPlayingState,
			}}
		>
			{children}
		</PlayerContext.Provider>
	);
};

export default PlayerContext;

export const usePlayer = () => {
	return useContext(PlayerContext);
};
