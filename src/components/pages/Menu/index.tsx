'use client';

import React, { useEffect, useState } from 'react';
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

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const storedProjects = LocalStorageService.getProjects();
    if (storedProjects && storedProjects.length > 0) {
      setProjects(storedProjects);
    }
  }, [isOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const todayDate = moment().format('YYYY-MM-DD');

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

    const newProject = {
      id: projects.length + 1,
      name: inputValue,
      date: moment().format('YYYY-MM-DD'),
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    LocalStorageService.saveProjects(updatedProjects);
    setInputValue('');
    toggleModal();
  };

  const router = useRouter();

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
          <div className="flex items-center justify-between mb-4">
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
          </div>

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
            <span className="text-sm text-purple-600 flex-1">
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

          <div className="flex flex-col mt-4">
            {isOpen && (
              <ul className="mt-1">
                {filteredProjects.map((project) => (
                  <li
                    key={project.id}
                    className="flex items-center p-2 cursor-pointer rounded-lg bg-purple-100 hover:bg-purple-200 mt-2"
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <HiOutlineFolderOpen className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="text-sm text-purple-600">
                      {project.name}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

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
        <div className="flex flex-col items-center justify-start h-full pt-4">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full bg-purple-500 hover:bg-purple-700 text-white"
          >
            <TfiLayout className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SideMenu;
