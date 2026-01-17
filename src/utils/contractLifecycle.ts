import { ContractStatus } from '../types';

export const CONTRACT_STATUSES: ContractStatus[] = [
  'created',
  'approved',
  'sent',
  'signed',
  'locked',
];

export const STATUS_LABELS: Record<ContractStatus, string> = {
  created: 'Created',
  approved: 'Approved',
  sent: 'Sent',
  signed: 'Signed',
  locked: 'Locked',
  revoked: 'Revoked',
};

export const STATUS_COLORS: Record<ContractStatus, string> = {
  created: '#3b82f6', // blue
  approved: '#10b981', // green
  sent: '#f59e0b', // amber
  signed: '#8b5cf6', // purple
  locked: '#6b7280', // gray
  revoked: '#ef4444', // red
};

export function canTransitionTo(currentStatus: ContractStatus, targetStatus: ContractStatus): boolean {
  // Revoked contracts cannot proceed
  if (currentStatus === 'revoked') {
    return false;
  }

  // Locked contracts cannot be edited or transitioned
  if (currentStatus === 'locked') {
    return false;
  }

  // Can always revoke (except if already revoked or locked)
  if (targetStatus === 'revoked') {
    return true;
  }

  // Find current index
  const currentIndex = CONTRACT_STATUSES.indexOf(currentStatus);
  const targetIndex = CONTRACT_STATUSES.indexOf(targetStatus);

  // Can only move forward one step at a time, or to revoked
  return targetIndex === currentIndex + 1;
}

export function getNextStatus(currentStatus: ContractStatus): ContractStatus | null {
  const currentIndex = CONTRACT_STATUSES.indexOf(currentStatus);
  if (currentIndex < CONTRACT_STATUSES.length - 1) {
    return CONTRACT_STATUSES[currentIndex + 1];
  }
  return null;
}

export function getFilterStatus(contractStatus: ContractStatus): 'active' | 'pending' | 'signed' {
  if (contractStatus === 'signed' || contractStatus === 'locked') {
    return 'signed';
  }
  if (contractStatus === 'revoked') {
    return 'pending';
  }
  if (contractStatus === 'created' || contractStatus === 'approved' || contractStatus === 'sent') {
    return 'pending';
  }
  return 'active';
}
