'use client';

import React, { useState } from 'react';
import TextInput from '../../global/TextInput/TextInput';
import moment from 'moment';
import Modal from '@/components/global/Modal';
import Button from '@/components/global/Button';
import { HiOutlineFolderOpen } from 'react-icons/hi';

const CreateFirstProject: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const toggleModal = () => setIsOpen(!isOpen);

  const handleCreate = () => {
    const existingProjects = JSON.parse(
      localStorage.getItem('projects') || '[]'
    );

    const newProject = {
      id: existingProjects.length + 1,
      name: inputValue,
      date: moment().format('YYYY-MM-DD'),
    };

    existingProjects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(existingProjects));
    toggleModal();
    setInputValue('');
  };

  return (
    <div className="relative inline-block">
      <button onClick={toggleModal} className="border px-4 py-2 rounded ml-80">
        Crie seu primeiro projeto aqui
      </button>

      <Modal
        isOpen={isOpen}
        icon={<HiOutlineFolderOpen className="mr-7" size={50} />}
        title="Novo Projeto"
        onClose={toggleModal}
      >
        <div className="space-y-4">
          <label
            htmlFor="projectName"
            className="block text-sm font-medium text-gray-700"
          >
            Nome
          </label>
          <TextInput
            value={inputValue}
            onInputChange={handleInputChange}
            placeholder="Digite o nome do projeto..."
            className="w-full rounded p-2 text-sm"
          />
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
    </div>
  );
};

export default CreateFirstProject;
