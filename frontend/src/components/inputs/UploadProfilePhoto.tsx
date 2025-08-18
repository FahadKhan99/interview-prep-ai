import { useRef, useState, type ChangeEvent } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

interface Props {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  preview?: string;
  setPreview?: React.Dispatch<React.SetStateAction<string | null>>;
}

const UploadProfilePhoto = ({
  image,
  setImage,
  preview,
  setPreview,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);

      // generate preview url from th image
      const preview = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(preview);
      }
      setPreviewUrl(preview); // locally
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl("");

    if (setPreview) setPreview(null);
    if (inputRef.current) inputRef.current = null;
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };
  return (
    <div className="flex justify-center mb-10">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Wrapper */}
      <div className="relative w-20 h-20">
        <div className="w-22 h-22 rounded-full overflow-hidden flex items-center justify-center bg-orange-50">
          {!image ? (
            <LuUser className="w-12 h-12 text-orange-400" />
          ) : (
            <img
              src={preview || previewUrl}
              alt="Profile Image"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <button
          type="button"
          onClick={() => (image ? handleRemoveImage() : onChooseFile())}
          className={`w-8 h-8 flex items-center justify-center text-white rounded-full absolute -bottom-3 -right-3 shadow ${image ? "bg-red-500": "bg-gradient-to-r from-orange-500/80 to-orange-600"}`}
        >
          {image ? (
            <LuTrash className="w-4 h-4" />
          ) : (
            <LuUpload className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadProfilePhoto;
