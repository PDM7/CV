import { useState, useRef } from "react";

export function AvatarUpload() {
  const [image, setImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    <div>
      <label className="cursor-pointer relative inline-block">
        <div
          className={`w-24 h-24 rounded-full overflow-hidden flex items-center justify-center border-2 
            ${image ? "border-primary" : "border-base-300"} 
            ${image ? "" : "bg-base-200"} 
          `}
        >
          {image ? (
            <img
              src={image}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-base-content text-sm">Upload Photo</span>
          )}
        </div>

        {image && (
          <button
            onClick={handleRemove}
            className="absolute top-2.5 right-2.5 w-6 h-6 bg-error text-error-content rounded-full flex items-center justify-center text-xs shadow-lg hover:bg-error-focus transition transform -translate-y-1/4 translate-x-1/4"
            title="Remover"
            type="button"
          >
            ×
          </button>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          ref={inputRef}
          className="hidden"
        />
      </label>
    </div>
  );
}
