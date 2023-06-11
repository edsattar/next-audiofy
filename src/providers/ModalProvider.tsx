"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/Modals/AuthModal";
import SubscribeModal from "@/components/Modals/SubscribeModal";
import UploadModal from "@/components/Modals/UploadModal";
import { ProductWithPrice } from "@/types";

interface ModalProviderProps {
  products: ProductWithPrice[];
}

const ModalProvider = ({ products }: ModalProviderProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <SubscribeModal products={products} />
      <UploadModal />
    </>
  );
};

export default ModalProvider;
