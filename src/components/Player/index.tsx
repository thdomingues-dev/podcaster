import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Slider from 'rc-slider';

import { usePlayer } from '../../contexts/PlayerContext';

import styles from './styles.module.scss';
import 'rc-slider/assets/index.css';

export default function Player() {
	const audioRef = useRef<HTMLAudioElement>(null);

	const {
		episodeList,
		currentEpisodeIndex,
		isPlaying,
		isLooping,
		isShuffling,
		toggleShuffle,
		togglePlay,
		toggleLoop,
		setPlayingState,
		handlePlayNext,
		handlePlayBack,
	} = usePlayer();

	const episode = episodeList[currentEpisodeIndex];

	useEffect(() => {
		if (!audioRef.current) return;

		if (isPlaying) {
			audioRef.current.play();
		} else {
			audioRef.current.pause();
		}
	}, [isPlaying]);

	return (
		<div className={styles.playerContainer}>
			<header>
				<img src="/playing.svg" alt="Tocando agora" />
				<strong>Tocando agora</strong>
			</header>

			{episode ? (
				<div className={styles.currentEpisode}>
					<Image
						width={592}
						height={592}
						src={episode.thumbnail}
						objectFit="cover"
					/>
					<strong>{episode.title}</strong>
					<span>{episode.members}</span>
				</div>
			) : (
				<div className={styles.emptyPlayer}>
					<strong>Selecione um podcast para ouvir</strong>
				</div>
			)}

			<footer className={!episode ? styles.empty : ''}>
				<div className={styles.progress}>
					<span>00:00</span>
					<div className={styles.slider}>
						{episode ? (
							<Slider
								trackStyle={{ background: '#04d361' }}
								railStyle={{ background: '#9f75ff' }}
								handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
							/>
						) : (
							<div className={styles.emptySlider} />
						)}
					</div>
					<span>00:00</span>
				</div>

				{episode &&
					<audio
						src={episode.url}
						ref={audioRef}
						loop={isLooping}
						autoPlay
						onPlay={() => setPlayingState(true)}
						onPause={() => setPlayingState(false)}
					/>
				}

				<div className={styles.buttons}>
					<button
						type="button"
						onClick={toggleShuffle}
						disabled={!episode || episodeList.length === 1}
						className={isShuffling ? styles.isActive : ''}
					>
						<img src="/shuffle.svg" alt="Embaralhar" />
					</button>

					<button type="button" onClick={handlePlayBack} disabled={!episode}>
						<img src="/play-previous.svg" alt="Tocar anterior" />
					</button>

					<button
						type="button"
						className={styles.playButton}
						disabled={!episode}
						onClick={togglePlay}
					>
						{isPlaying
							? <img src="/pause.svg" alt="Tocar" />
							: <img src="/play.svg" alt="Tocar" />
						}
					</button>

					<button type="button" onClick={handlePlayNext} disabled={!episode}>
						<img src="/play-next.svg" alt="Tocar próxima" />
					</button>

					<button
						type="button"
						onClick={toggleLoop}
						disabled={!episode}
						className={isLooping ? styles.isActive : ''}
					>
						<img src="/repeat.svg" alt="Repetir" />
					</button>
				</div>
			</footer>
		</div>
	);
}
