import { Injectable, signal, computed } from '@angular/core';
import { PermissionEntry, RoleName, ViewType } from '../models/permission.model';

export const ROLES: RoleName[] = [
  'Administrator',
  'Technician',
  'Surgeon',
  'Sales Rep',
  'Assistant',
  'Operations',
];

const ALL_PERMISSIONS: ReadonlyArray<PermissionEntry> = [
  { action: 'Electronically Sign Terms and Conditions',                           permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'Yes', 'Sales Rep': 'Yes', Assistant: 'Yes', Operations: 'Yes' } },
  { action: 'Upload Terms and Conditions',                                         permissions: { Administrator: 'Yes', Technician: 'No',  Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Register Self',                                                       permissions: { Administrator: 'No',  Technician: 'No',  Surgeon: 'Yes', 'Sales Rep': 'Yes', Assistant: 'Yes', Operations: 'No'  } },
  { action: 'Create New User',                                                     permissions: { Administrator: 'Yes', Technician: 'No',  Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Archive User',                                                        permissions: { Administrator: 'Yes', Technician: 'No',  Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'View User List',                                                      permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Change Own Profile Info',                                             permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'Yes', 'Sales Rep': 'Yes', Assistant: 'Yes', Operations: 'Yes' } },
  { action: 'Permanently Delete Self Account',                                     permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'Yes', 'Sales Rep': 'Yes', Assistant: 'Yes', Operations: 'Yes' } },
  { action: "Permanently Delete Other's Account",                                  permissions: { Administrator: 'Yes', Technician: 'No',  Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Add Shipping Address to Self',                                        permissions: { Administrator: 'No',  Technician: 'No',  Surgeon: 'Yes', 'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: "Change Other User Profile Info",                                      permissions: { Administrator: 'Yes', Technician: 'No',  Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Add Shipping Address to Other Surgeons',                              permissions: { Administrator: 'Yes', Technician: 'No',  Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Verify User Identity/Email',                                          permissions: { Administrator: 'Yes', Technician: 'No',  Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Lock/Unlock Accounts',                                                permissions: { Administrator: 'Yes', Technician: 'No',  Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Link Other User to Surgeon',                                          permissions: { Administrator: 'Yes', Technician: 'No',  Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Can be Linked to Surgeon',                                            permissions: { Administrator: 'No',  Technician: 'No',  Surgeon: 'N/A', 'Sales Rep': 'Yes', Assistant: 'Yes', Operations: 'No'  } },
  { action: 'Change Own Password',                                                 permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'Yes', 'Sales Rep': 'Yes', Assistant: 'Yes', Operations: 'Yes' } },
  { action: 'Change Other User Password',                                          permissions: { Administrator: 'Yes', Technician: 'No',  Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Can Own Cases',                                                       permissions: { Administrator: 'No',  Technician: 'No',  Surgeon: 'Yes', 'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Can Create Cases for Linked Surgeons',                                permissions: { Administrator: 'N/A', Technician: 'N/A', Surgeon: 'Yes', 'Sales Rep': 'Yes', Assistant: 'Yes', Operations: 'N/A' } },
  { action: 'Can Create Cases for Any Surgeon',                                    permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Can Duplicate Cases for Any Surgeon',                                 permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'View Cases for Linked Surgeons',                                      permissions: { Administrator: 'N/A', Technician: 'N/A', Surgeon: 'N/A', 'Sales Rep': 'Yes', Assistant: 'Yes', Operations: 'N/A' } },
  { action: 'View All Cases',                                                      permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'N/A' } },
  { action: 'Can Edit Info for Allowed Cases',                                     permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'Yes', 'Sales Rep': 'Yes', Assistant: 'Yes', Operations: 'N/A' } },
  { action: 'Can Create New Shipping Addresses for Allowed Cases',                 permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'Yes', 'Sales Rep': 'Yes', Assistant: 'Yes', Operations: 'N/A' } },
  { action: 'Can Change Surgery Date for Lapsed Cases',                            permissions: { Administrator: 'Yes', Technician: 'No',  Surgeon: 'Yes', 'Sales Rep': 'Yes', Assistant: 'Yes', Operations: 'N/A' } },
  { action: 'Can Archive/Mention Allowed Cases',                                   permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'Yes', 'Sales Rep': 'Yes', Assistant: 'Yes', Operations: 'N/A' } },
  { action: 'Can Change Case Status (Manually)',                                   permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'N/A' } },
  { action: 'Upload CT for Allowed Cases',                                         permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'Yes', 'Sales Rep': 'Yes', Assistant: 'Yes', Operations: 'N/A' } },
  { action: 'View Plan for Allowed Cases',                                         permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'Yes', 'Sales Rep': 'Yes', Assistant: 'Yes', Operations: 'N/A' } },
  { action: 'Save/Edit a Plan for Allowed Cases',                                  permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'Yes', 'Sales Rep': 'Yes', Assistant: 'Yes', Operations: 'N/A' } },
  { action: 'Can Archive Plan',                                                    permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'N/A' } },
  { action: 'Can Upload Plan (from Arthrex)',                                      permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Can Comment on Plan',                                                 permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'Yes', 'Sales Rep': 'Yes', Assistant: 'Yes', Operations: 'No'  } },
  { action: 'Approve Plan',                                                        permissions: { Administrator: 'No',  Technician: 'No',  Surgeon: 'Yes', 'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Can Generate Plan Images for Approved Case',                          permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'N/A' } },
  { action: 'Can Download PDF for Allowed Cases',                                  permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'Yes', 'Sales Rep': 'Yes', Assistant: 'Yes', Operations: 'N/A' } },
  { action: 'Can View and Export Production Log',                                  permissions: { Administrator: 'Yes', Technician: 'No',  Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'Yes' } },
  { action: 'Can Request Permanent Case Deletion',                                 permissions: { Administrator: 'Yes', Technician: 'No',  Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'N/A' } },
  { action: 'Can Duplicate Plans',                                                 permissions: { Administrator: 'No',  Technician: 'No',  Surgeon: 'Yes', 'Sales Rep': 'No',  Assistant: 'Yes', Operations: 'No'  } },
  { action: 'Can Delete Plans',                                                    permissions: { Administrator: 'No',  Technician: 'No',  Surgeon: 'Yes', 'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Can Rename Plans',                                                    permissions: { Administrator: 'No',  Technician: 'No',  Surgeon: 'Yes', 'Sales Rep': 'No',  Assistant: 'Yes', Operations: 'No'  } },
  { action: 'Can use Osteophyte Removal Tool',                                     permissions: { Administrator: 'No',  Technician: 'No',  Surgeon: 'Yes', 'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Can Delete Uploaded Files',                                           permissions: { Administrator: 'Yes', Technician: 'No',  Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Can Archive and Unarchive Uploaded Files',                            permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Can Upload and Download Modifier Files',                              permissions: { Administrator: 'Yes', Technician: 'No',  Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Can Upload and Download PSB Design Files',                            permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Can Edit Shipping Address Post-approval',                             permissions: { Administrator: 'Yes', Technician: 'No',  Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Can Adjust Baseplate Position During Processing Design',              permissions: { Administrator: 'Yes', Technician: 'No',  Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Can Complete Positioning',                                            permissions: { Administrator: 'No',  Technician: 'No',  Surgeon: 'Yes', 'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Can Assign Scan To High Priority Queue',                              permissions: { Administrator: 'Yes', Technician: 'Yes', Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Toggle Localized Data Restriction for Any Surgeon',                   permissions: { Administrator: 'Yes', Technician: 'No',  Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
  { action: 'Can Execute Data Migration Actions (e.g., Initiation, Retry, Unblock Case)', permissions: { Administrator: 'Yes', Technician: 'No',  Surgeon: 'No',  'Sales Rep': 'No',  Assistant: 'No',  Operations: 'No'  } },
] as const;

@Injectable({ providedIn: 'root' })
export class PermissionsService {
  readonly allPermissions: ReadonlyArray<PermissionEntry> = ALL_PERMISSIONS;

  readonly searchTerm = signal<string>('');
  readonly currentView = signal<ViewType>('table');
  readonly activeRoles = signal<Set<RoleName>>(new Set(ROLES));
  readonly compareRoles = signal<Set<RoleName>>(new Set(['Administrator', 'Technician'] as RoleName[]));

  readonly filteredPermissions = computed(() => this.getFiltered(this.searchTerm()));

  getFiltered(term: string): PermissionEntry[] {
    if (!term.trim()) return [...ALL_PERMISSIONS];
    const q = term.toLowerCase();
    return ALL_PERMISSIONS.filter(p => p.action.toLowerCase().includes(q));
  }

  setSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }

  setView(view: ViewType): void {
    this.currentView.set(view);
  }

  toggleActiveRole(role: RoleName): void {
    this.activeRoles.update((roles: Set<RoleName>) => {
      const next = new Set(roles);
      if (next.has(role)) {
        if (next.size > 1) next.delete(role);
      } else {
        next.add(role);
      }
      return next;
    });
  }

  setAllActiveRoles(all: boolean): void {
    this.activeRoles.set(all ? new Set(ROLES) : new Set(['Administrator' as RoleName]));
  }

  toggleCompareRole(role: RoleName): void {
    this.compareRoles.update((roles: Set<RoleName>) => {
      const next = new Set(roles);
      if (next.has(role)) {
        if (next.size > 1) next.delete(role);
      } else {
        next.add(role);
      }
      return next;
    });
  }
}
