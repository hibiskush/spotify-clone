// PlaylistsModal.tsx
"use client";

import { FC } from "react";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import CustomSelect from "./CustomSelect";
import toast from "react-hot-toast";
import useGetPlaylists from "@/hooks/useGetPlaylists";
import usePlayer from "@/hooks/usePlayer";

interface PlaylistsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PlaylistsModal: FC<PlaylistsModalProps> = ({ isOpen, onClose }) => {
    const { playlists, fetchPlaylists } = useGetPlaylists();
    const player = usePlayer();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState<string>("");

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            playlistName: '',
        }
    });

    const handleCreatePlaylist: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/create-playlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: values.playlistName }),
            });

            const result = await response.json();
            console.log(result); // Log the result to debug

            if (response.ok && result && result.name) {
                setMessage(`Playlist "${result.name}" created successfully!`);
                setIsSuccess(true);
                reset();
                fetchPlaylists(); // Re-fetch playlists after creating a new one
            } else {
                setMessage("Failed to create playlist.");
                setIsSuccess(false);
            }
        } catch (error) {
            setMessage("An error occurred: " + (error instanceof Error ? error.message : "Unknown error"));
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddToPlaylist = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/add-to-playlist', {
                method: 'POST',
                body: JSON.stringify({ playlistId: selectedPlaylist, songId: player.activeId }),
            });

            const result = await response.json();

            if (response.ok && result) {
                setMessage(`Song added to playlist successfully!`);
                setIsSuccess(true);
                onClose();
            } else {
                setMessage("Failed to add song to playlist.");
                setIsSuccess(false);
            }
        } catch (error) {
            setMessage("An error occurred.");
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            onClose();
        }
    };

    return (
        <Modal
            title="Manage Playlists"
            description="Create a new playlist or add the current song to an existing playlist"
            isOpen={isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(handleCreatePlaylist)}
                className="flex flex-col gap-y-4"
            >
                <Input
                    id="playlistName"
                    disabled={isLoading}
                    {...register('playlistName', { required: true })}
                    placeholder="Enter playlist name"
                />
                <Button disabled={isLoading} type="submit">
                    Create Playlist
                </Button>
                {message && (
                    <p className={`mt-2 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </p>
                )}
            </form>
            <div className="mt-4 flex flex-col gap-y-4">
                <h2 className="text-xl font-bold mb-2">Add Song to Playlist</h2>
                <CustomSelect
                    options={playlists.map(playlist => ({ value: playlist.id, label: playlist.name }))}
                    value={selectedPlaylist}
                    onChange={setSelectedPlaylist}
                    disabled={isLoading}
                />
                <Button
                    onClick={handleAddToPlaylist}
                    disabled={isLoading}
                >
                    Add to Playlist
                </Button>
            </div>
        </Modal>
    );
};

export default PlaylistsModal;