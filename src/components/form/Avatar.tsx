import { useState, useRef, useEffect } from "react";

interface AvatarUploadProps {
  initialImage?: string;
}

export function AvatarUpload({ initialImage }: AvatarUploadProps) {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialImage) setImage(initialImage);
  }, [initialImage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImage(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <label className="cursor-pointer block">
          <div
            className={`w-24 h-24 rounded-full overflow-hidden flex items-center justify-center border-2 
              ${image ? "border-primary" : "border-base-300"} 
              ${image ? "" : "bg-base-200"}`}
          >
            {image ? (
              <img src={image} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-base-content text-sm">Upload</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            ref={inputRef}
            className="hidden"
          />
        </label>

        {image && (
          <button
            onClick={handleRemove}
            className="absolute top-1 right-1 w-6 h-6 bg-error text-error-content rounded-full 
              flex items-center justify-center text-xs shadow hover:bg-error-focus"
            type="button"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
