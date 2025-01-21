import React, { useState } from 'react';
import Button from '@/components/global/Button';
import Divider from '@/components/global/Divider';
import TextInput from '@/components/global/TextInput/TextInput';
import {
  MdMoreVert,
  MdEdit,
  MdDelete,
  MdOutlineCalendarMonth,
  MdOutlineLocalOffer,
} from 'react-icons/md';
import { TfiLayoutAccordionSeparated } from 'react-icons/tfi';
import { IoFlagOutline } from 'react-icons/io5';
import TaskDetailsModal from '../TaskModal';

interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: string;
  labels?: string[];
}

interface Session {
  id: number;
  name: string;
  tasks: Task[];
}

interface Project {
  id: number;
  name: string;
  date: string;
  session?: Session[];
}

interface ProjectDetailsGridProps {
  project: Project | null;
  onUpdateProject: (updatedProject: Project) => void;
}

const ProjectDetailsGrid: React.FC<ProjectDetailsGridProps> = ({
  project,
  onUpdateProject,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [inputTask, setInputTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editSessionName, setEditSessionName] = useState('');
  const [sessionToEdit, setSessionToEdit] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<number | null>(null);
  const [showInput, setShowInput] = useState(false);
  const [menuOpenSession, setMenuOpenSession] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    null
  );

  if (!project) {
    return <p>Carregando dados do projeto...</p>;
  }

  const handleOpenTaskModal = (session: Session, task: Task) => {
    setSelectedTask(task);
    setSelectedSessionId(session.id);
    setIsModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setSelectedTask(null);
    setSelectedSessionId(null);
    setIsModalOpen(false);
  };

  const handleNextTask = () => {
    if (!project || selectedSessionId === null || !selectedTask) return;

    const session = project.session?.find(
      (sess) => sess.id === selectedSessionId
    );
    if (!session) return;

    const currentIndex = session.tasks.findIndex(
      (t) => t.id === selectedTask.id
    );
    if (currentIndex < session.tasks.length - 1) {
      setSelectedTask(session.tasks[currentIndex + 1]);
    }
  };

  const handlePreviousTask = () => {
    if (!project || selectedSessionId === null || !selectedTask) return;

    const session = project.session?.find(
      (sess) => sess.id === selectedSessionId
    );
    if (!session) return;

    const currentIndex = session.tasks.findIndex(
      (t) => t.id === selectedTask.id
    );
    if (currentIndex > 0) {
      setSelectedTask(session.tasks[currentIndex - 1]);
    }
  };

  const handleSaveTask = (updatedTask: Task | null) => {
    if (!project || selectedSessionId === null) return;

    const updatedProject: Project = {
      ...project,
      session: project.session?.map((sess) =>
        sess.id === selectedSessionId
          ? {
              ...sess,
              tasks: updatedTask
                ? sess.tasks.map((task) =>
                    task.id === updatedTask.id ? updatedTask : task
                  )
                : sess.tasks.filter((task) => task.id !== selectedTask?.id),
            }
          : sess
      ),
    };

    onUpdateProject(updatedProject);
  };

  const handleAddSession = () => {
    if (!inputValue.trim()) return;

    const newSession: Session = {
      id: Math.random(),
      name: inputValue,
      tasks: [],
    };

    const updatedProject: Project = {
      ...project!,
      session: [...(project?.session || []), newSession],
    };

    onUpdateProject(updatedProject);
    setInputValue('');
    setShowInput(false);
  };

  const handleAddTask = (sessionId: number) => {
    if (!inputTask.trim()) return;

    const newTask: Task = {
      id: Math.random(),
      title: inputTask,
    };

    const updatedProject: Project = {
      ...project,
      session: project.session?.map((sess) =>
        sess.id === sessionId
          ? {
              ...sess,
              tasks: [...sess.tasks, newTask],
            }
          : sess
      ),
    };

    onUpdateProject(updatedProject);
    setInputTask('');
    setSelectedSessionId(null);
  };

  const handleEditSession = () => {
    if (!editSessionName.trim() || sessionToEdit === null) return;

    const updatedProject: Project = {
      ...project,
      session: project.session?.map((sess) =>
        sess.id === sessionToEdit ? { ...sess, name: editSessionName } : sess
      ),
    };

    onUpdateProject(updatedProject);
    setIsEditing(false);
    setSessionToEdit(null);
    setEditSessionName('');
  };

  const handleDeleteSession = () => {
    if (sessionToDelete === null) return;

    const updatedProject: Project = {
      ...project,
      session: project.session?.filter((sess) => sess.id !== sessionToDelete),
    };

    onUpdateProject(updatedProject);
    setIsDeleting(false);
    setSessionToDelete(null);
  };

  return (
    <div className="flex flex-col w-full max-w-[70vw] p-5 bg-white border border-gray-100 shadow-lg ml-20">
      <h1 className="text-2xl font-semibold text-gray-700 truncate overflow-hidden whitespace-nowrap">
        {project.name}
      </h1>
      <Divider />
      <div className="flex gap-6 mt-6 overflow-x-auto scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {project.session?.map((sess) => (
          <div key={sess.id} className="p-4 bg-white w-[300px] flex-none">
            <div className=" w-[100%] flex justify-between">
              <h3 className="text-lg font-medium text-gray-800 truncate overflow-hidden whitespace-nowrap">
                {sess.name}
              </h3>
              <div className="relative">
                <button
                  onClick={() =>
                    setMenuOpenSession(
                      menuOpenSession === sess.id ? null : sess.id
                    )
                  }
                  className="text-gray-600 hover:text-gray-800"
                >
                  <MdMoreVert size={24} />
                </button>
                {menuOpenSession === sess.id && (
                  <div className="absolute right-0 bg-white border shadow-md rounded-lg p-2">
                    <button
                      onClick={() => {
                        setEditSessionName(sess.name);
                        setSessionToEdit(sess.id);
                        setIsEditing(true);
                        setMenuOpenSession(null);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <MdEdit />
                      <span>Editar</span>
                    </button>
                    <button
                      onClick={() => {
                        setSessionToDelete(sess.id);
                        setIsDeleting(true);
                        setMenuOpenSession(null);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <MdDelete />
                      <span>Excluir</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <Divider />
            <div className="mt-3 space-y-2">
              {sess.tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 bg-gray-50 border border-gray-200 rounded-md shadow-sm cursor-pointer hover:bg-gray-100"
                  onClick={() => handleOpenTaskModal(sess, task)}
                >
                  <p className="text-sm font-medium text-gray-700 mb-3 truncate overflow-hidden whitespace-nowrap">
                    {task.title}
                  </p>
                  <Divider />
                  <div className="flex space-x-2 mb-1 mt-2">
                    <button className="p-2 rounded-md shadow-sm hover:bg-gray-200 border border-[#8F8F8F]">
                      <MdOutlineCalendarMonth color="#8F8F8F" />
                    </button>
                    <button className="p-2 rounded-md shadow-sm hover:bg-gray-200 border border-[#8F8F8F]">
                      <IoFlagOutline color="#8F8F8F" />
                    </button>
                    <button className="p-2 rounded-md shadow-sm hover:bg-gray-200 border border-[#8F8F8F]">
                      <MdOutlineLocalOffer color="#8F8F8F" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {selectedSessionId === sess.id && (
              <div className="mt-3 p-4 border border-purple-500 rounded-lg shadow-md">
                <TextInput
                  placeholder="Adicione uma nova tarefa"
                  value={inputTask}
                  onInputChange={(value) => setInputTask(value)}
                />
                <Divider />
                <div className="flex space-x-2 mt-4">
                  <Button
                    text="Adicionar"
                    onClick={() => handleAddTask(sess.id)}
                    color="purple"
                  />
                  <Button
                    text="Cancelar"
                    color="white"
                    textColor="black"
                    onClick={() => setSelectedSessionId(null)}
                  />
                </div>
              </div>
            )}
            {!selectedSessionId && (
              <button
                className="mt-4 w-full bg-purple-500 text-white py-2 rounded-lg shadow-md hover:bg-purple-700"
                onClick={() => setSelectedSessionId(sess.id)}
              >
                Adicionar Tarefa
              </button>
            )}
          </div>
        ))}
        {!showInput ? (
          <button
            className="flex items-center justify-center w-[350px] h-[40px] bg-purple-100 text-purple-600 rounded-lg shadow-md mr-40"
            onClick={() => setShowInput(true)}
          >
            <div className=" flex w-[268px] justify-center gap-2">
              <TfiLayoutAccordionSeparated size={20} />
              <span className="ml-2">Adicionar Seção</span>
            </div>
          </button>
        ) : (
          <div className="w-[300px] p-4 bg-gray-50 border border-gray-300 rounded-lg">
            <TextInput
              placeholder="Nome da Seção"
              value={inputValue}
              onInputChange={(value) => setInputValue(value)}
            />
            <div className="flex space-x-2 mt-3">
              <Button text="Adicionar" onClick={handleAddSession} />
              <Button
                text="Cancelar"
                color="white"
                textColor="black"
                onClick={() => setShowInput(false)}
              />
            </div>
          </div>
        )}
      </div>
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white w-[400px] rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Editar Seção
            </h3>
            <TextInput
              placeholder="Novo nome da seção"
              value={editSessionName}
              onInputChange={(value) => setEditSessionName(value)}
            />
            <div className="flex space-x-2 mt-4">
              <Button text="Salvar" onClick={handleEditSession} />
              <Button
                text="Cancelar"
                color="white"
                textColor="black"
                onClick={() => setIsEditing(false)}
              />
            </div>
          </div>
        </div>
      )}
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white w-[400px] rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Confirmar Exclusão
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Tem certeza que deseja excluir esta seção?
            </p>
            <div className="flex space-x-2 mt-4">
              <Button
                text="Sim, excluir"
                color="red"
                onClick={handleDeleteSession}
              />
              <Button
                text="Cancelar"
                color="white"
                textColor="black"
                onClick={() => setIsDeleting(false)}
              />
            </div>
          </div>
        </div>
      )}
      <TaskDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseTaskModal}
        projectName={project.name}
        subProjectName={
          project.session?.find((sess) => sess.id === selectedSessionId)
            ?.name || ''
        }
        task={selectedTask}
        onSave={handleSaveTask}
        onNext={handleNextTask}
        onPrevious={handlePreviousTask}
      />
    </div>
  );
};

export default ProjectDetailsGrid;
