import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StatusTransition {
  from: string;
  canChangeTo: string[];
}

type RoleTab = 'admin' | 'technician';
type ProductTab = 'ots' | 'psb';

const ADMIN_TRANSITIONS: StatusTransition[] = [
  { from: 'NO CT',            canChangeTo: ['CT Received', 'CT Accepted', 'CT Unacceptable', 'Planning', 'Ready for review'] },
  { from: 'CT Received',      canChangeTo: ['NO CT', 'On Hold', 'CT Accepted', 'CT Unacceptable', 'Planning', 'Ready for review'] },
  { from: 'On Hold',          canChangeTo: ['NO CT', 'CT Received', 'CT Accepted', 'CT Unacceptable', 'Planning', 'Ready for review'] },
  { from: 'CT Accepted',      canChangeTo: ['NO CT', 'CT Received', 'On Hold', 'CT Unacceptable', 'Planning', 'Ready for review'] },
  { from: 'CT Unacceptable',  canChangeTo: [] },
  { from: 'Planning',         canChangeTo: ['NO CT', 'CT Received', 'On Hold', 'CT Accepted', 'CT Unacceptable', 'Ready for review'] },
  { from: 'Ready for review', canChangeTo: ['NO CT', 'CT Received', 'On Hold', 'CT Accepted', 'CT Unacceptable', 'Planning'] },
  { from: 'Approved',         canChangeTo: ['Processing', 'Order Complete'] },
  { from: 'Processing',       canChangeTo: ['Approved', 'Order Complete'] },
  { from: 'Order Complete',   canChangeTo: ['Processing'] },
];

// From the Technician matrix image:
// NO CT       → CT Received, CT Accepted, CT Unacceptable, Planning, Ready for review
// CT Received → On Hold, CT Accepted, CT Unacceptable, Planning, Ready for review
// On Hold     → CT Accepted, CT Unacceptable, Planning, Ready for review
// CT Accepted → CT Received, On Hold, CT Unacceptable, Planning, Ready for review
// CT Unacceptable → (none)
// Planning    → CT Received, On Hold, CT Accepted, CT Unacceptable, Ready for review
// Ready for review → (none)
// Approved    → Processing, Order Complete
// Processing  → Order Complete
// Order Complete → (none)
const TECHNICIAN_TRANSITIONS: StatusTransition[] = [
  { from: 'NO CT',            canChangeTo: ['CT Received', 'CT Accepted', 'CT Unacceptable', 'Planning', 'Ready for review'] },
  { from: 'CT Received',      canChangeTo: ['On Hold', 'CT Accepted', 'CT Unacceptable', 'Planning', 'Ready for review'] },
  { from: 'On Hold',          canChangeTo: ['CT Accepted', 'CT Unacceptable', 'Planning', 'Ready for review'] },
  { from: 'CT Accepted',      canChangeTo: ['CT Received', 'On Hold', 'CT Unacceptable', 'Planning', 'Ready for review'] },
  { from: 'CT Unacceptable',  canChangeTo: [] },
  { from: 'Planning',         canChangeTo: ['CT Received', 'On Hold', 'CT Accepted', 'CT Unacceptable', 'Ready for review'] },
  { from: 'Ready for review', canChangeTo: [] },
  { from: 'Approved',         canChangeTo: ['Processing', 'Order Complete'] },
  { from: 'Processing',       canChangeTo: ['Order Complete'] },
  { from: 'Order Complete',   canChangeTo: [] },
];

// PSB statuses: NO CT, CT Received, On Hold, CT Accepted, CT Unacceptable,
//               Planning, Positioning, Processing Design, Ready for Review,
//               Manufacturing, Order Complete
const PSB_ADMIN_TRANSITIONS: StatusTransition[] = [
  { from: 'NO CT',             canChangeTo: ['CT Received', 'CT Accepted', 'CT Unacceptable', 'Planning'] },
  { from: 'CT Received',       canChangeTo: ['NO CT', 'On Hold', 'CT Accepted', 'CT Unacceptable', 'Planning', 'Positioning'] },
  { from: 'On Hold',           canChangeTo: ['NO CT', 'CT Received', 'CT Accepted', 'CT Unacceptable', 'Planning', 'Positioning', 'Processing Design', 'Ready for Review'] },
  { from: 'CT Accepted',       canChangeTo: ['NO CT', 'CT Received', 'On Hold', 'CT Unacceptable', 'Planning', 'Positioning'] },
  { from: 'CT Unacceptable',   canChangeTo: ['CT Received', 'Planning'] },
  { from: 'Planning',          canChangeTo: ['NO CT', 'CT Received', 'On Hold', 'CT Accepted', 'CT Unacceptable', 'Positioning'] },
  { from: 'Positioning',       canChangeTo: ['NO CT', 'CT Received', 'On Hold', 'CT Accepted', 'CT Unacceptable', 'Planning'] },
  { from: 'Processing Design', canChangeTo: ['Positioning', 'Ready for Review'] },
  { from: 'Ready for Review',  canChangeTo: ['CT Received', 'On Hold', 'CT Accepted', 'Planning', 'Positioning', 'Processing Design'] },
  { from: 'Manufacturing',     canChangeTo: ['Processing Design', 'Order Complete'] },
  { from: 'Order Complete',    canChangeTo: ['Manufacturing'] },
];

const PSB_TECHNICIAN_TRANSITIONS: StatusTransition[] = [
  { from: 'NO CT',             canChangeTo: ['CT Received', 'CT Accepted', 'CT Unacceptable', 'Planning'] },
  { from: 'CT Received',       canChangeTo: ['On Hold', 'CT Accepted', 'CT Unacceptable', 'Planning', 'Positioning'] },
  { from: 'On Hold',           canChangeTo: ['CT Accepted', 'CT Unacceptable', 'Planning', 'Positioning'] },
  { from: 'CT Accepted',       canChangeTo: ['CT Received', 'On Hold', 'CT Unacceptable', 'Planning', 'Positioning'] },
  { from: 'CT Unacceptable',   canChangeTo: [] },
  { from: 'Planning',          canChangeTo: ['CT Received', 'On Hold', 'CT Accepted', 'CT Unacceptable', 'Positioning'] },
  { from: 'Positioning',       canChangeTo: [] },
  { from: 'Processing Design', canChangeTo: [] },
  { from: 'Ready for Review',  canChangeTo: [] },
  { from: 'Manufacturing',     canChangeTo: ['Order Complete'] },
  { from: 'Order Complete',    canChangeTo: [] },
];

const DATA: Record<ProductTab, Record<RoleTab, StatusTransition[]>> = {
  ots: { admin: ADMIN_TRANSITIONS,     technician: TECHNICIAN_TRANSITIONS },
  psb: { admin: PSB_ADMIN_TRANSITIONS, technician: PSB_TECHNICIAN_TRANSITIONS },
};

@Component({
  selector: 'app-case-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './case-status.component.html',
  styleUrl: './case-status.component.scss',
})
export class CaseStatusComponent {
  readonly productTab = signal<ProductTab>('ots');
  readonly roleTab    = signal<RoleTab>('admin');

  readonly productTabs: { id: ProductTab; label: string }[] = [
    { id: 'ots', label: 'OTS' },
    { id: 'psb', label: 'PSB' },
  ];

  readonly roleTabs: { id: RoleTab; label: string; note?: string }[] = [
    { id: 'admin',      label: 'Admin' },
    { id: 'technician', label: 'Technician', note: 'ARTHREX_INTERNAL may also perform the same status transitions as Technician.' },
  ];

  readonly transitions = computed<StatusTransition[]>(
    () => DATA[this.productTab()][this.roleTab()]
  );

  readonly activeNote = computed<string | undefined>(
    () => this.roleTab() === 'technician'
      ? 'ARTHREX_INTERNAL may also perform the same status transitions as Technician.'
      : undefined
  );
}
