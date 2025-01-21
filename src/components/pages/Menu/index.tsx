'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { FiCalendar } from 'react-icons/fi';
import { HiOutlineFolderOpen } from 'react-icons/hi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { TfiLayout } from 'react-icons/tfi';
import { RxCaretDown, RxCaretUp, RxPlus } from 'react-icons/rx';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import TextInput from '@/components/global/TextInput/TextInput';
import Divider from '@/components/global/Divider';
import Button from '@/components/global/Button';
import Modal from '@/components/global/Modal';
import { Project } from '@/utils/ProjectInterface';
import { LocalStorageService } from '@/services/LocalStorageService';
import { RiLayout3Line } from 'react-icons/ri';

const SideMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [filterToday, setFilterToday] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const router = useRouter();
  const todayDate = moment().format('YYYY-MM-DD');

  const fetchProjects = useCallback(() => {
    const storedProjects = LocalStorageService.getProjects();
    if (storedProjects?.length) {
      setProjects(storedProjects);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      ?.toLowerCase()
      ?.includes(searchValue.toLowerCase());
    const matchesToday = !filterToday || project.date === todayDate;
    return matchesSearch && matchesToday;
  });

  const handleCreate = () => {
    if (!inputValue.trim()) {
      alert('O nome do projeto não pode estar vazio.');
      return;
    }

    const newProject: Project = {
      id: projects.length + 1,
      name: inputValue.trim(),
      date: todayDate,
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    LocalStorageService.saveProjects(updatedProjects);
    setInputValue('');
    toggleModal();
  };

  const handleProjectClick = (projectId: number) => {
    router.push(`/meusprojetos?id=${projectId}`);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full transition-all duration-300 ${
        isMenuOpen ? 'w-[333px] p-4' : 'w-14'
      } shadow-2xl border-4 border-white bg-white`}
    >
      {isMenuOpen ? (
        <>
          <header className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Image
                src="/images/avatar.jpg"
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="ml-2 text-sm text-gray-700">
                Nome do Usuário
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <IoIosNotificationsOutline className="text-gray-400 w-6 h-6" />
              <RiLayout3Line
                onClick={toggleMenu}
                className="w-6 h-6 text-gray-400 cursor-pointer"
              />
            </div>
          </header>

          <Divider />

          <TextInput
            onInputChange={(value) => setSearchValue(value)}
            placeholder="Faça sua busca..."
            className="w-full rounded p-2 text-sm mt-5"
          />

          <div
            className="flex items-center mt-4 cursor-pointer"
            onClick={() => setFilterToday((prev) => !prev)}
          >
            <FiCalendar
              className={`w-5 h-5 mr-2 ${
                filterToday ? 'text-purple-600' : 'text-gray-600'
              }`}
            />
            <span
              className={`text-sm ${
                filterToday ? 'text-purple-600' : 'text-gray-700'
              }`}
            >
              Hoje
            </span>
          </div>

          <div
            className="flex items-center mt-4 cursor-pointer rounded-lg p-2 bg-purple-100 hover:bg-purple-200"
            onClick={toggleDropdown}
          >
            <HiOutlineFolderOpen className="w-5 h-5 text-purple-600 mr-2" />
            <span className="text-sm text-purple-600 flex-1 truncate overflow-hidden whitespace-nowrap">
              Meus Projetos
            </span>
            <button
              className="text-purple-600 font-bold text-lg mr-2"
              onClick={(event) => {
                event.stopPropagation();
                toggleModal();
              }}
            >
              <RxPlus />
            </button>
            {isOpen ? (
              <RxCaretUp className="text-purple-600 font-bold text-lg" />
            ) : (
              <RxCaretDown className="text-purple-600 font-bold text-lg" />
            )}
          </div>

          {isOpen && (
            <ul className="flex flex-col mt-4 max-h-[60%] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-100">
              {filteredProjects.map((project) => (
                <li
                  key={project.id}
                  className="flex items-center p-2 cursor-pointer rounded-lg bg-purple-100 hover:bg-purple-200 mt-2"
                  onClick={() => handleProjectClick(project.id)}
                >
                  <HiOutlineFolderOpen className="w-5 h-5 text-purple-600 mr-2" />
                  <span
                    className="text-sm text-purple-600 truncate overflow-hidden whitespace-nowrap"
                    title={project.name}
                  >
                    {project.name}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <Modal
            isOpen={isModalOpen}
            icon={<HiOutlineFolderOpen className="mr-7" size={50} />}
            title="Novo Projeto"
            onClose={toggleModal}
          >
            <div className="space-y-4">
              <Divider />
              <label
                htmlFor="projectName"
                className="block text-sm font-medium text-gray-700"
              >
                Nome
              </label>
              <TextInput
                value={inputValue}
                onInputChange={(value) => setInputValue(value)}
                placeholder="Digite o nome do projeto..."
                className="w-full rounded p-2 text-sm"
              />
              <Divider />
              <div className="flex justify-end space-x-4">
                <Button
                  onClick={toggleModal}
                  color="white"
                  text="Cancelar"
                  textColor="#ccc"
                />
                <Button onClick={handleCreate} text="Criar" />
              </div>
            </div>
          </Modal>
        </>
      ) : (
        <div className="flex flex-col mt-4 h-full overflow-y-auto">
          {filteredProjects.map((project) => (
            <li
              key={project.id}
              className="flex items-center p-2 cursor-pointer rounded-lg bg-purple-100 hover:bg-purple-200 mt-2"
              onClick={() => handleProjectClick(project.id)}
            >
              <HiOutlineFolderOpen className="w-5 h-5 text-purple-600 mr-2" />
              <span
                className="text-sm text-purple-600 truncate overflow-hidden whitespace-nowrap"
                title={project.name}
              >
                {project.name}
              </span>
              <button
                className="text-purple-600 font-bold text-lg ml-auto"
                onClick={(event) => {
                  event.stopPropagation();
                  toggleModal();
                }}
              >
                <RxPlus />
              </button>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default SideMenu;
