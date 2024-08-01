import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  //gets the projects from the server and sets the projects state in desc order according to the date uploaded
  const getProjects = async (page) => {
    const response = await axios.get(`${apiUrl}/api/projects`, {
      params: { page, limit: 12 },
    });

    //The code will set the projects state to the new projects if the page is 1 beacuse teh code was being buggy and the same projects were being loaded again i concluded it was due to react strictmode calling the getProjects function twice inside of useEffect
    const newProjects = response.data.projects;
    if (page === 1) {
      setProjects(newProjects);
      setHasMore(newProjects.length > 0);
      return;
    }
    setProjects((prevProjects) => [...prevProjects, ...newProjects]);
    setHasMore(newProjects.length > 0);
  };

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  useEffect(() => {
    getProjects(page);
  }, [page]);

  return (
    <div className="indie-flower-regular">
      <div className="text-center">
        <p className="text-xl">
          The CSS sanctuary, Showcase you CSS skills and build awesome and cool{" "}
          <br />
          things with just html, css and javascript
        </p>
      </div>
      <InfiniteScroll
        dataLength={projects.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={<h4 className="text-center">Loading...</h4>}
        endMessage={<p className="text-center">No more projects</p>}
      >
        <div className="grid grid-cols-4 m-8 gap-4 p-4 overflow-hidden">
          {projects.map((project) => (
            <div
              className="border-2 h-[444px] border-green-500 hover:border-blue-400"
              key={project.project_id}
              onClick={() => {
                handleProjectClick(project.project_id);
              }}
            >
              <h1 className="text-center p-6 text-2xl truncate">
                {project.title}
              </h1>
              <img
                src={`${project.image_file}`}
                alt="Preview Image"
                className="h-[300px] w-full object-contain"
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Home;
