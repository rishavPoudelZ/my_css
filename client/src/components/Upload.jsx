import { useState, useEffect } from "react";
import axios from "axios";
import { getUser } from "../utils/getUser";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // New state variable

  const acessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const htmlFile = event.target.files[0];
    if (htmlFile.size > 0.5 * 1024 * 1024) {
      setMessage("Please select a valid html file less than 0.5MB");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }
    setSelectedFile(htmlFile);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file.size > 1.5 * 1024 * 1024) {
      setMessage("Please select a valid image file less than 1.5MB");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }
    setPreviewImage(event.target.files[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile || !previewImage || !title || !description) {
      setMessage("Please fill all the fields");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    // Set loading to true to disable the button
    setLoading(true);

    const formData = new FormData();
    formData.append("htmlFile", selectedFile);
    formData.append("imageFile", previewImage);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await axios.post(`${apiUrl}/files/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${acessToken}`,
        },
      });
      console.log("File uploaded successfully", response.data);
      navigate(`/personal-sanctuary/${user.user_id}`);
    } catch (error) {
      console.error("Error uploading file", error);
    } finally {
      // Set loading to false to re-enable the button
      setLoading(false);
    }
  };

  if (!localStorage.getItem("accessToken")) {
    window.location.href = "/login";
    return;
  }

  useEffect(() => {
    getUser(setUser);
  }, []);

  return (
    <div className="ml-[100px] mr-[100px] indie-flower-regular">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="ml-[150px]">
          <label
            htmlFor="file-upload"
            style={{ cursor: "pointer", display: "inline-block" }}
            className="w-[100px]"
          >
            <i className="fas fa-file-upload text-6xl mt-4 border p-6 rounded-[20px] hover:text-[rgba(101,85,143,1.000)] hover:border-[rgba(101,85,143,1.000)] "></i>
            <br />
          </label>
          {selectedFile && (
            <p className="text-xl inline-block ml-4 font-sans">
              Selected File:{" "}
              <span className="font-sans text-green-500">
                {selectedFile.name}
              </span>
            </p>
          )}
          <p className="mt-6 text-xl">
            <span className="text-green-500 text-3xl">*</span> Select file to
            upload to your santuary. Only html files can be uploaded. Make sure
            to have all you <br />
            css, javascript and html code in ‘.html’ file before uploading. Also
            make sure it works first, for error free uploads. (Less than 1MB)
            <span className="text-green-500 text-3xl">*</span>
          </p>
          <input
            id="file-upload"
            type="file"
            accept=".html"
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e)}
          />
        </div>
        <div className="ml-[150px] mt-4">
          <p className="inline-block text-2xl mr-4">Preview Image</p>
          <label
            htmlFor="image-upload"
            style={{ cursor: "pointer", display: "inline-block" }}
          >
            <i className="fas fa-file-upload text-4xl hover:text-[#9b8cc5] inline-block border p-4 rounded-[20px]"></i>
          </label>
          <input
            name="image-upload"
            id="image-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            className="inline-block"
            onChange={(e) => handleImageChange(e)}
          />
          <p className="inline-block text-xl mr-4 ml-4 w-[700px]">
            <span className="text-green-500 text-3xl">*</span> Also upload a
            image to be showed as a preview (Upload a screenshot of what you’ve
            built with ur code for like a small preview) (Less than 5MB)
            <span className="text-green-500 text-3xl">*</span>
          </p>
          <br />
          {imageSrc && (
            <img
              src={imageSrc}
              alt="Selected Preview"
              className="w-[200px] h-[100px] object-contain"
            />
          )}
          {previewImage && (
            <p className="text-xl mt-2 font-sans">
              Selected image:{" "}
              <span className="text-green-500">{previewImage.name}</span>
            </p>
          )}
          <div className="mt-4">
            <label htmlFor="Title" className="text-xl mt-4">
              Title
            </label>{" "}
            <br />
            <input
              type="text"
              className="border border-gray-400 w-[500px] bg-transparent outline-none appearance-none p-1"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />{" "}
            <br />
            <label htmlFor="Description" className="text-xl mt-4">
              Description
            </label>{" "}
            <br />
            <textarea
              name="Description"
              id="Description"
              cols="30"
              rows="7"
              className="border border-gray-400 w-[1000px] bg-transparent outline-none appearance-none p-1"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          {message && <p className="text-red-500">{message}</p>}
          <button
            type="submit"
            className="bg-[rgba(101,85,143,1.000)] text-white p-2 w-32 rounded-[100px] hover:bg-[#9b8cc5]"
            disabled={loading} // Disable the button when loading is true
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
