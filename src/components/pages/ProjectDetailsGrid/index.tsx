import Button from '@/components/global/Button';
import Divider from '@/components/global/Divider';
import TextInput from '@/components/global/TextInput/TextInput';
import Image from 'next/image';
import React, { useState } from 'react';
import { TfiLayoutAccordionSeparated } from 'react-icons/tfi';
import CardItem from '../CardItem';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import CustomTaskInput from '@/components/global/CustomTaskInput';

interface Session {
  name: string;
  tasks: string[];
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
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [inputTask, setInputTask] = useState('');
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  if (!project) {
    return <p>Carregando dados do projeto...</p>;
  }

  const handleAdd = () => {
    const newSession = inputValue.trim();
    if (newSession === '') return;

    const newSection = {
      id: Date.now(),
      name: newSession,
      tasks: [],
    };

    const updatedProject = {
      ...project,
      session: [...(project.session || []), newSection],
    };

    onUpdateProject(updatedProject);

    setInputValue('');
    setShowInput(false);
  };

  const handleAddTask = () => {
    if (!selectedSession || inputTask.trim() === '') return;

    const updatedProject = {
      ...project,
      session: project.session?.map((sess) =>
        sess.name === selectedSession
          ? { ...sess, tasks: [...(sess.tasks || []), inputTask.trim()] }
          : sess
      ),
    };

    onUpdateProject(updatedProject);

    setInputTask('');
    setShowTaskInput(false);
  };

  const handleEditSession = (id: number, newText: string) => {
    if (!project) return;

    const updatedProject = {
      ...project,
      session: project.session?.map((sess) =>
        sess.id === id ? { ...sess, name: newText } : sess
      ),
    };

    onUpdateProject(updatedProject);
    setIsEditing(false);
  };

  console.log(isEditing, 'muda');

  return (
    <div className="flex w-4/5 h-[650px] flex-col items-start p-5 bg-white border border-gray-100 shadow-lg">
      <div className="flex justify-center w-full font-poppins text-x2 font-semibold text-gray-700 pb-5 ">
        {project.name}
      </div>
      <Divider />
      <div className="mt-6 overflow-x-auto whitespace-nowrap w-[900px] h-full no-scrollbar">
        <div className="flex gap-5 ">
          {project.session && project.session.length > 0 && (
            <div className="mb-4 flex flex-row gap-4">
              {project.session.map((sess, index) => (
                <div key={index} className="flex-none">
                  <CardItem
                    id={sess.id}
                    text={sess.name}
                    onEdit={handleEditSession}
                    onDelete={() => console.log('Excluir clicado')}
                    setIsEditing={setIsEditing}
                    isEditing={isEditing}
                  />
                  {selectedSession === sess.id ? (
                    <>
                      <CustomTaskInput
                        title={sess?.name}
                        subtitle="Criação de 2 artes para brigateria"
                        onAddClick={handleAdd}
                        onCancelClick={() => console.log('cliquei')}
                      />
                      <div className="mt-4 flex space-x-4">
                        <Button
                          text={'Adicionar'}
                          onClick={() => handleAddTask(sess.id)}
                        />
                        <Button
                          onClick={() => setSelectedSession(null)}
                          color="white"
                          textColor="black"
                          text={'Cancelar'}
                        />
                      </div>
                    </>
                  ) : (
                    !isEditing && (
                      <Button
                        iconLeft={<AiOutlinePlusSquare size={25} />}
                        onClick={() => setSelectedSession(sess.id)}
                        className="ml-4 bg-blue-500 text-white px-2 py-1 w-[250px] rounded"
                        text={'Adicionar Tarefa'}
                      />
                    )
                  )}
                </div>
              ))}
            </div>
          )}
          {!showInput ? (
            <Button
              className="w-[300px] h-[37px]"
              onClick={() => setShowInput(true)}
              iconLeft={<TfiLayoutAccordionSeparated size={23} />}
              text="Adicionar Seção"
              color="custom-purple-light"
              textColor="text-purple-600"
            />
          ) : (
            <div className="flex flex-col">
              <TextInput
                type="text"
                placeholder="Nome da Seção"
                value={inputValue}
                onInputChange={(value) => setInputValue(value)}
                showIcon={false}
              />

              <div className="flex space-x-4">
                <Button onClick={handleAdd} text="Adicionar" />
                <Button
                  onClick={() => setShowInput(false)}
                  text="Cancelar"
                  color="white"
                  textColor="black"
                />
              </div>
            </div>
          )}
        </div>

        {!project?.session?.length > 0 && (
          <div className="flex flex-row ml-5">
            <Image
              src={'/images/image-seta.png'}
              alt="Curiosity Search"
              width={80}
              height={80}
              className="-scale-x-100"
            />
            <Button
              text={
                <p className="font-poppins text-sm font-extralight">
                  CRIE SUA PRIMEIRA <br /> SESSÃO AQUI
                </p>
              }
              color="white"
              textColor="black"
              className="border border-gray-500 p-[-10px] relative top-[30px]"
              onClick={() => setShowInput(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsGrid;
