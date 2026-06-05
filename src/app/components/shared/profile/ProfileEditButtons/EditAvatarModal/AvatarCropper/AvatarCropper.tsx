'use client'

import { useRef, useState, Dispatch, SetStateAction } from 'react';
import AvatarEditor from "react-avatar-editor";
import { AvatarZoomSlider } from "@/components/kit/AvatarZoomSlider";
import { Button } from "@/components/kit/Button";

import s from './AvatarCropper.module.scss'
import { useWindowWidth } from "@/utils/hooks/useWindowWidth";

type TrimEditAvatarProps = {
  image: string | File;
  stopCropping: () => void;
  setPreview: Dispatch<SetStateAction<string | null>>;
  setImageFile: Dispatch<SetStateAction<Blob | null>>;
}

export const AvatarCropper = ({ image, stopCropping, setPreview, setImageFile }: TrimEditAvatarProps) => {
  const [scale, setScale] = useState(1.4);
  const editorRef = useRef<AvatarEditor | null>(null);
  const screenWidth = useWindowWidth();
  const size = screenWidth - 100; // Общая ширина и высота

  const handleCropped = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage();
      canvas.toBlob((blob) => {
        // Здесь вы можете обработать загруженное изображение (например, отправить на сервер)
        if (blob) {
          const croppedImageUrl = URL.createObjectURL(blob); // Создаем URL для обрезанного изображения
          setPreview(croppedImageUrl); // Сохраняем обрезанное изображение в состоянии
          setImageFile(blob);
          stopCropping();
        }
        console.log(blob);
      });
    }
  };

  return (
    <div className={s.trimEditAvatar}>
      <AvatarEditor
        ref={editorRef}
        image={image}
        width={size}
        height={size}
        border={50}
        borderRadius={size * 50 / 100}
        scale={scale}
        rotate={0}
      />
      <div style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center'}}>
        <AvatarZoomSlider
          initialValue={scale}
          onZoomChange={(newScale) => setScale(newScale)}
          min={1.0}
          max={6.0}
          step={0.1}
        />
        <Button variant="continue" onClick={handleCropped}>Далее</Button>
      </div>
    </div>
  );
};