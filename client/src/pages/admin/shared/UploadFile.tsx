import { FC, ChangeEvent } from "react";

interface UploadFileProps {
  fileInput: string;
  handler: (e: ChangeEvent<HTMLInputElement>) => any;
  image?: string | ArrayBuffer | null;
  name?: string;
}

const UploadFile: FC<UploadFileProps> = ({
  fileInput,
  handler,
  image,
  name,
}) => {
  return (
    <div className="file-upload">
      {!!image && (
        <img
          src={`${import.meta.env.CLIENT_BACKEND_STATIC_URL}${image}`}
          alt={name}
        />
      )}

      <input
        name="file"
        type="file"
        id="field-file-2"
        className="field field-file"
        onChange={handler}
      />
      <label className="field-file-wrapper" htmlFor="field-file-2">
        <div className="field-file-fake">{fileInput}</div>
        <div className="field-file-button">Выбрать</div>
      </label>
    </div>
  );
};
export default UploadFile;
