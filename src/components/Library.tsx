"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import { Song } from "@/types";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import MediaItem from "./MediaItem";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import useOnPlay from "@/hooks/useOnPlay";

interface Props {
  songs: Song[];
}

const Library = ({ songs }: Props) => {
  const { user, subscription } = useUser();
  const { openUploadModal } = useUploadModal();
  const { openAuthModal } = useAuthModal();

  const subscribeModal = useSubscribeModal();

  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) {
      return openAuthModal();
    }
    if (!subscription) {
      return subscribeModal.onOpen();
    }
    return openUploadModal();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-md font-medium text-neutral-400">Your Songs</p>
        </div>
        <AiOutlinePlus className="cursor-pointer text-neutral-400 transition hover:text-white" onClick={onClick} size={24} />
      </div>
      <div className="mt-4 flex flex-col gap-y-2 px-3">
        List of Songs
        {songs.map((item) => (
          <MediaItem
            onClick={(id: string) => onPlay(id)}
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
