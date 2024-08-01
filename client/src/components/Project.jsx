import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getUser } from "../utils/getUser";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactLoading from "react-loading";
import CustomModal from "./CustomModal";

const Project = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [project, setProject] = useState(null);
  const [user, setUser] = useState({});
  const [htmlContent, setHtmlContent] = useState(null);
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [currentInfo, setCurrentInfo] = useState("code");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Delete the project
  const deleteProject = async () => {
    try {
      await axios.delete(`${apiUrl}/files/project/${projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      navigate(`/personal-sanctuary/${user.user_id}`);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch the project
  const fetchProject = async () => {
    // If the projectId is not present, redirect to 404 page
    if (!projectId) {
      navigate("/404");
      return;
    }
    try {
      const response = await axios.get(`${apiUrl}/api/project/${projectId}`);
      setProject(response.data[0]);
      // If the project does not exist, redirect to 404 page
      if (!response.data[0]) {
        navigate("/404");
        return;
      }
      const htmlResponse = await axios.get(
        `${response.data[0].html_file}`,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      setHtmlContent(htmlResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const changeInfo = (info) => {
    setCurrentInfo(info);
  };

  useEffect(() => {
    fetchProject();
    if (localStorage.getItem("accessToken")) {
      getUser(setUser);
    }
  }, [projectId]);

  if (!project && !htmlContent) {
    return (
      <div className="flex justify-center items-center h-[80vh] flex-col">
        <h1 className="indie-flower-regular text-4xl m-8">Loading Project</h1>
        <ReactLoading
          type="spinningBubbles"
          color="#0000FF"
          height={150}
          width={100}
        />
      </div>
    );
  }

  return (
    <div className="m-8">
      <h1 className="indie-flower-regular text-2xl inline-block">
        {project.title}
      </h1>
      {user.user_id == project.user_id ? (
        <div className="inline">
          <i
            className="fa-solid fa-trash inline-block float-right text-2xl hover:cursor-pointer"
            style={{ color: "#df0707" }}
            onClick={openModal}
          ></i>
          <CustomModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            content={
              <p className="gupter-regular text-xl">
                Are you sure you want to delete this project? <br />
                <span className="text-indigo-400">
                  Project Title: {project.title}
                </span>
              </p>
            }
            onYesClick={deleteProject}
          />
        </div>
      ) : (
        <Link
          to={`/personal-sanctuary/${project.user_id}`}
          className="float-right p-2 text-2xl gupter-bold hover:text-green-500 hover:underline"
        >
          By {project.username}
        </Link>
      )}
      <iframe
        src={`${project.html_file}`}
        className="w-full h-[90vh]"
        sandbox="allow-same-origin allow-scripts"
      ></iframe>
      <div className="w-full h-[80vh] border mt-4 border-green-400 overflow-visible">
        <div className="w-full h-[7%] indie-flower-regular text-xl">
          <button
            className={`text-center p-2 w-28 border-r-2 ${
              currentInfo == "code" ? "bg-green-500" : "bg-gray-500"
            }`}
            onClick={() => changeInfo("code")}
          >
            Code
          </button>
          <button
            className={`text-center p-2 w-28 ${
              currentInfo == "description" ? "bg-green-500" : "bg-gray-500"
            }`}
            onClick={() => changeInfo("description")}
          >
            Description
          </button>
          <Link
            to={`/personal-sanctuary/${project.user_id}`}
            className="float-right p-2 text-2xl gupter-bold hover:text-green-500 hover:underline"
          >
            By {project.username}
          </Link>
        </div>
        <SyntaxHighlighter
          language="html"
          style={atomDark}
          className="h-[90%] w-[100%]"
        >
          {currentInfo == "code" ? htmlContent : project.description}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default Project;
