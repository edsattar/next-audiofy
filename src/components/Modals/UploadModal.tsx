"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import uniqid from "uniqid";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import Modal from "./Modal";
import Input from "../ui/input";
import Button from "../Buttons/Button";

const UploadModal = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { isOpen, openUploadModal, closeUploadModal } = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const myform = useForm({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });
  const { register, handleSubmit, reset } = myform;
  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      closeUploadModal();
    }
  };
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields");
        return;
      }
      const a = await supabaseClient.storage;

      const uniqueID = uniqid();
      // Upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage.from("images").upload(uniqueID, imageFile);
      if (imageError) {
        setIsLoading(false);
        return toast.error(`Failed image upload : ${imageError.message}`);
      }
      // Upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(uniqueID, songFile);
      if (songError) {
        setIsLoading(false);
        await supabaseClient.storage.from("images").remove([uniqueID]);
        return toast.error(`Failed song upload : ${songError.message}`);
      }
      // // Create record
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success("Song created!");
      reset();
      closeUploadModal();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Upload an song"
      description=""
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          disabled={isLoading}
          placeholder="Song title"
          {...register("title", { required: true })}
        />

        <Input
          disabled={isLoading}
          placeholder="Song author"
          {...register("author", { required: true })}
        />

        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            disabled={isLoading}
            type="file"
            accept="audio/*"
            {...register("song", { required: true })}
          />
        </div>

        <div>
          <div className="pb-1">Select an Album cover</div>
          <Input
            disabled={isLoading}
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>

        <Button disabled={isLoading} type="submit">
          Upload
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
