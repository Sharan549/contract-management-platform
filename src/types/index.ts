export type FieldType = 'text' | 'date' | 'signature' | 'checkbox';

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  position: {
    x: number;
    y: number;
  };
  required?: boolean;
}

export interface Blueprint {
  id: string;
  name: string;
  fields: Field[];
  createdAt: Date;
}

export type ContractStatus = 'created' | 'approved' | 'sent' | 'signed' | 'locked' | 'revoked';

export interface Contract {
  id: string;
  name: string;
  blueprintId: string;
  blueprintName: string;
  status: ContractStatus;
  fieldValues: Record<string, string | boolean | Date | null>;
  createdAt: Date;
  updatedAt: Date;
}

export type FilterStatus = 'all' | 'active' | 'pending' | 'signed';
