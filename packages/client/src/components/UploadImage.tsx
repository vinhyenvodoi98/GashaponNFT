import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ArrowUpIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface FileInterface {
  initialData?: string
  size?: string
  setFile: Dispatch<SetStateAction<File | null>>
}

export default function UploadImage({initialData, size="small" , setFile}: FileInterface) {
  const [initImage, setinitImage] = useState<string | null>(initialData || null)
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setinitImage(null)

      // Create a preview URL for the selected file
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);
  if (size === "small") {
    return (
      <div className="flex justify-between w-full max-w h-32">
        <label className="form-control">
          <div className="grid grid-cols-3 gap-4 border hover:border-gray-300 p-4 rounded-lg cursor-pointer">
              <div className="col-span-1">
              {
                  preview ? <img src={preview} alt="Image Preview" className="w-32 h-32 object-contain rounded-lg" />
                  :
                  <div className="w-32 h-32 border border-dashed hover:border-solid rounded-lg flex justify-center items-center">
                    <PhotoIcon className="w-8 h-8 text-gray-400" />
                  </div>
              }
              </div>
              <input type="file" className="hidden" onChange={handleFileChange}/>
              <div className="col-span-2">
                  <h3 className="font-bold">Click to upload</h3>
                  <p>Recommended size: 350 x 350. File types: JPG, PNG, SVG, or GIF</p>
              </div>
          </div>
        </label>
      </div>
    );
  } else {
    return (
      <div className="flex justify-between w-full h-full">
        <label className="form-control w-full h-full">
          <div className="w-full h-full border hover:border-gray-300 p-4 rounded-lg cursor-pointer">
              <div className="w-full h-full">
              {
                  preview ? <img src={preview} alt="Image Preview" className="w-full h-full object-contain rounded-lg" />
                  :
                  <div className="w-full h-full border border-dashed hover:border-solid rounded-lg flex flex-col justify-center items-center">
                    <ArrowUpIcon className="w-8 h-8 text-gray-400" />
                    <div className="text-center">
                      <h4 className="font-bold">Click to upload media</h4>
                      <p className="text-base-400">Max size: 50MB</p>
                      <p className="text-base-400">File types: JPG, PNG, SVG, or GIF</p>
                    </div>
                  </div>
              }
              </div>
              <input type="file" className="hidden" onChange={handleFileChange}/>
          </div>
        </label>
      </div>
    );
  }
}
