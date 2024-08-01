import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const PersonalShowcase = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [userProjects, setUserProjects] = useState([]);
  const [userUrl, setUserUrl] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  // Get the projects of the user
  const getUserProjects = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/projects/${userId}`);
      console.log(response.data);
      // If the user does not exist, redirect to 404 page
      setUserProjects(response.data);
    } catch (error) {
      console.error("Error getting projects", error);
    }
  };

  // Get the user's social media links
  const getUserUrl = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/userLinks/${userId}`);
      console.log(response.data);
      if (response.data.length === 0) {
        navigate("/404");
        return;
      }
      setUserUrl(response.data[0]);
    } catch (error) {
      console.error("Error getting user links", error);
    }
  };

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  useEffect(() => {
    getUserProjects();
    console.log("User Projects", userProjects);
  }, []);

  useEffect(() => {
    getUserUrl();
  }, []);

  return (
    <div>
      <div className="indie-flower-regular">
        <div className="text-center">
          <p className=" text-xl text-green-500">{userUrl.username}</p>
          <a
            href={userUrl.linkedin_url ? `${userUrl.linkedin_url}` : null}
            target="_blank"
          >
            <i
              className="fa-brands fa-linkedin text-4xl mr-4 hover:cursor-pointer"
              style={{ color: "#74C0FC" }}
            ></i>
          </a>
          <a
            href={userUrl.github_url ? `${userUrl.github_url}` : null}
            target="_blank"
          >
            <i
              className="fa-brands fa-github text-4xl hover:cursor-pointer"
              style={{ color: "#ffffff" }}
            ></i>
          </a>
        </div>
        {/* If the user has no projects uplaoded then show a message */}
        {userProjects.length === 0 ? (
          <h1 className="text-center text-4xl text-green-500 mt-[100px]">
            No Projects Found
          </h1>
        ) : null}
        <div className="grid grid-cols-4 m-8 gap-4 p-4">
          {userProjects.map((project) => (
            <div
              className="border-2 h-[444px] border-green-500 hover:border-blue-400"
              key={project.project_id}
              onClick={() => {
                handleProjectClick(project.project_id);
              }}
            >
              <h1 className="text-center p-6 text-2xl">{project.title}</h1>
              <img
                src={`${project.image_file}`}
                alt="Preview Image"
                className="h-[300px] w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalShowcase;
