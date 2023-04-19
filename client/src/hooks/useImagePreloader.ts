import { useEffect, useState } from "react";

const preloadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = img.onabort = () => reject();

    img.src = import.meta.env.CLIENT_NEXT_PUBLIC_BACKEND_BASE_URL + src;
  });

const useImagePreloader = (imageList: string[]) => {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const preloadImages = async () => {
      const imagesPromiseList: Promise<HTMLImageElement>[] = imageList.map(
        (img) => preloadImage(img)
      );

      try {
        const res = await Promise.all(imagesPromiseList);
      } catch (error: unknown) {
        console.error(error);
      }

      if (isCancelled) {
        return;
      }

      setImagesPreloaded(true);
    };

    preloadImages();

    return () => {
      isCancelled = true;
    };
  }, [imageList]);

  return { imagesPreloaded };
};

export default useImagePreloader;
