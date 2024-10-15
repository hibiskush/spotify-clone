"use client";

import { useEffect, useState } from "react";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import usePlayerSettings from "@/hooks/usePlayerSettings";
import useSound from "use-sound";
import ProgressBar from './ProgressBar';
import { LuRepeat, LuRepeat1, LuShuffle } from 'react-icons/lu';
import PlaylistsModal from "./PlaylistsModal";

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl
}) => {
    const player = usePlayer();
    const { volume, repeatState, shuffleState, setVolume, setRepeatState, setShuffleState } = usePlayerSettings();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showPlaylistInput, setShowPlaylistInput] = useState(false);
    const [message, _] = useState("");

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        let nextSong;

        if (shuffleState) {
            const filter = player.ids.filter((id) => id !== player.activeId);
            const random_index = Math.floor(Math.random() * filter.length);
            nextSong = filter[random_index];
        } else {
            nextSong = player.ids[currentIndex + 1];
        }

        if (!nextSong) {
            return player.setId(player.ids[0]);
        }

        player.setId(nextSong);
    }

    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1]);
        }

        player.setId(previousSong);
    };

    const [play, { pause, sound }] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false);
                onPlayNext();
            },
            onpause: () => setIsPlaying(false),
            format: ['mpeg', 'mp3', 'wav']
        }
    );

    useEffect(() => {
        sound?.play();

        return () => {
            sound?.unload();
        }
    }, [sound]);

    useEffect(() => {
        if (sound) {
            const interval = setInterval(() => {
                setCurrentTime(sound.seek() || 0); 
                setDuration(sound.duration() || 0); 
            }, 1000); 

            return () => clearInterval(interval); 
        }
    }, [sound]);

    const handlePlay = () => {
        if (!isPlaying) {
            play();
        } else {
            pause();
        }
    };

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1);
        } else {
            setVolume(0);
        }
    }

    const handleSeek = (time: number) => {
        sound.seek(time);
        setCurrentTime(time);
    };

    const handleRepeat = () => {
        if (repeatState === 'disable') {
            setRepeatState('enable repeat');
        } else if (repeatState === 'enable repeat') {
            setRepeatState('enable repeat one');
        } else {
            setRepeatState('disable');
        }
    };

    const handleShuffle = () => {
        console.log(shuffleState);
        setShuffleState(!shuffleState);
    };

    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 h-full">
                <div className="flex w-full justify-start">
                    <div className="flex items-center gap-x-3" style={{ userSelect: 'none' }}>
                        <MediaItem data={song} />
                        <LikeButton songId={song.id} />
                        <MdOutlinePlaylistAdd
                            onClick={() => setShowPlaylistInput(true)}
                            size={30}
                            className="text-white cursor-pointer"
                        />
                    </div>
                </div>

                <div className="flex md:hidden col-auto w-full justify-end items-center">
                    <div
                        onClick={handlePlay}
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
                    >
                        <Icon size={30} className="text-black" />
                    </div>
                </div>

                <div className="hidden h-full md:flex flex-col justify-center items-center w-full max-w-[722px] gap-y-2">
                    <div className="flex justify-center items-center w-full gap-x-6">
                        <button
                            onClick={handleShuffle}
                            className="text-neutral-400 cursor-pointer hover:text-white transition"
                        >
                            <LuShuffle
                                color={shuffleState ? '#22C55E' : '#7D7D7D'}
                                size={20}
                            />
                        </button>
                        <AiFillStepBackward
                            onClick={onPlayPrevious}
                            size={30}
                            className="text-neutral-400 cursor-pointer hover:text-white transition"
                        />
                        <div
                            onClick={handlePlay}
                            className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1"
                        >
                            <Icon size={30} className="text-black" />
                        </div>
                        <AiFillStepForward
                            onClick={onPlayNext}
                            size={30}
                            className="text-neutral-400 cursor-pointer hover:text-white transition"
                        />
                        <button
                            onClick={handleRepeat}
                            className="text-neutral-400 cursor-pointer hover:text-white transition"
                        >
                            {
                                repeatState === 'disable' &&
                                <LuRepeat
                                    color="#7D7D7D"
                                    size={20}
                                />}
                            {
                                repeatState === 'enable repeat' && <LuRepeat
                                    color="#22C55E"
                                    size={20}
                                />}
                            {
                                repeatState === 'enable repeat one' && <LuRepeat1
                                    color="#22C55E"
                                    size={20}
                                />}
                        </button>
                    </div>
                    <ProgressBar
                        currentTime={currentTime}
                        duration={duration}
                        onSeek={handleSeek}
                    />
                </div>

                <div className="hidden md:flex w-full justify-end pr-2 mt-4">
                    <div className="flex items-center gap-x-2 w-[120px]">
                        <VolumeIcon
                            onClick={toggleMute}
                            className="cursor-pointer"
                            size={34}
                        />
                        <Slider
                            value={volume}
                            onChange={(value) => setVolume(value)}
                        />
                    </div>
                </div>
            </div>
            <PlaylistsModal
                isOpen={showPlaylistInput}
                onClose={() => setShowPlaylistInput(false)}
            />
            {message && <div className="text-white">{message}</div>}
        </div>
    );
}

export default PlayerContent;