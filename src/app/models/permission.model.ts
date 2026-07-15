export type PermissionValue = 'Yes' | 'No' | 'N/A';

export type RoleName =
  | 'Administrator'
  | 'Technician'
  | 'Surgeon'
  | 'Sales Rep'
  | 'Assistant'
  | 'Operations';

export interface PermissionEntry {
  action: string;
  permissions: Record<RoleName, PermissionValue>;
}

export type ViewType = 'table' | 'compare' | 'cards';
