import { createContext, useContext, useState, ReactNode } from 'react';
import { Blueprint, Contract, Field } from '../types';
import { uuidv4 } from './utils';

interface StoreContextType {
  blueprints: Blueprint[];
  contracts: Contract[];
  addBlueprint: (blueprint: Omit<Blueprint, 'id' | 'createdAt'>) => void;
  addContract: (contract: Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateContract: (id: string, updates: Partial<Contract>) => void;
  getBlueprint: (id: string) => Blueprint | undefined;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [blueprints, setBlueprints] = useState<Blueprint[]>(() => {
    // Initialize with sample data
    const sampleBlueprint: Blueprint = {
      id: 'bp-1',
      name: 'Employment Agreement',
      createdAt: new Date('2024-01-01'),
      fields: [
        {
          id: 'field-1',
          type: 'text',
          label: 'Employee Name',
          position: { x: 50, y: 100 },
          required: true,
        },
        {
          id: 'field-2',
          type: 'date',
          label: 'Start Date',
          position: { x: 50, y: 200 },
          required: true,
        },
        {
          id: 'field-3',
          type: 'checkbox',
          label: 'I agree to the terms',
          position: { x: 50, y: 300 },
          required: true,
        },
        {
          id: 'field-4',
          type: 'signature',
          label: 'Signature',
          position: { x: 50, y: 400 },
          required: true,
        },
      ],
    };
    return [sampleBlueprint];
  });

  const [contracts, setContracts] = useState<Contract[]>([]);

  const addBlueprint = (blueprint: Omit<Blueprint, 'id' | 'createdAt'>) => {
    const newBlueprint: Blueprint = {
      ...blueprint,
      id: uuidv4(),
      createdAt: new Date(),
    };
    setBlueprints((prev) => [...prev, newBlueprint]);
  };

  const addContract = (contract: Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newContract: Contract = {
      ...contract,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setContracts((prev) => [...prev, newContract]);
  };

  const updateContract = (id: string, updates: Partial<Contract>) => {
    setContracts((prev) =>
      prev.map((contract) =>
        contract.id === id
          ? { ...contract, ...updates, updatedAt: new Date() }
          : contract
      )
    );
  };

  const getBlueprint = (id: string) => {
    return blueprints.find((bp) => bp.id === id);
  };

  return (
    <StoreContext.Provider
      value={{
        blueprints,
        contracts,
        addBlueprint,
        addContract,
        updateContract,
        getBlueprint,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
}
