import UploadIcon from "../../public/Icons/UploadIcon";
import Dropzone from "react-dropzone";

function DropFileUpload(props) {
  return (
    <div className="flex justify-center mb-2">
      <Dropzone
        onDrop={(accepted, rejected) => props.uploadFiles(accepted, rejected)}
        accept={{
          "application/pdf": []
        }}
        multiple={true}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className={`
              text-black block w-[100%] text-center cursor-pointer 
              border-2 border-tertiary-375 hover:border-black
              border-dashed p-7 rounded-md transition-all`}
          >
            <input {...getInputProps()} />
            <div className="flex space-x-2 w-full justify-center">
              <p className="flex justify-center">
                <UploadIcon />
              </p>
              <p className="text-sm font-semibold text-tertiary-650">
                {props.msg}
              </p>
              <p className="text-sm font-semibold text-orange-500">
                {props.extension}
              </p>
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  );
}

export default DropFileUpload;
