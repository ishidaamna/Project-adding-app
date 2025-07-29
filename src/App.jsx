import { useState } from "react";

import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSideBar from "./components/ProjectsSideBar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const { selectedProjectId, projects } = projectsState;
  const isNoProjectSelected = selectedProjectId === null;
  const isProjectUninitialized = selectedProjectId === undefined;
  const selectedProject = projects.find((p) => p.id === selectedProjectId);


  function handleAddTask() {

  }

  function handleDeletetask(){ 
    
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

function handleDeleteProject() {
  setProjectsState((prevState) => {
    return {
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId),

    };
  });
}



  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSideBar
        onStartAddProject={handleStartAddProject}
        projects={projects}
        onSelectProject={handleSelectProject}
      />

      {isNoProjectSelected && (
        <NewProject
          onAdd={handleAddProject}
          onCancel={handleCancelAddProject}
        />
      )}

      {isProjectUninitialized && (
        <NoProjectSelected onStartAddProject={handleStartAddProject} />
      )}

      {!isNoProjectSelected && !isProjectUninitialized && selectedProject && (
        <SelectedProject 
        project={selectedProject}
        onDelete={handleDeleteProject}
         />
      )}
    </main>
  );
}

export default App;
