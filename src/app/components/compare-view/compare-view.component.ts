import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsService, ROLES } from '../../services/permissions.service';
import { HighlightPipe } from '../../pipes/highlight.pipe';
import { PermissionValue, RoleName } from '../../models/permission.model';

@Component({
  selector: 'app-compare-view',
  standalone: true,
  imports: [CommonModule, HighlightPipe],
  templateUrl: './compare-view.component.html',
  styleUrl: './compare-view.component.scss',
})
export class CompareViewComponent {
  protected readonly svc = inject(PermissionsService);
  readonly allRoles: RoleName[] = ROLES;

  readonly selectedRoles = computed(() =>
    ROLES.filter(r => this.svc.compareRoles().has(r))
  );

  toggle(role: RoleName): void {
    this.svc.toggleCompareRole(role);
  }

  badgeClass(val: PermissionValue): string {
    if (val === 'Yes') return 'badge-yes';
    if (val === 'No') return 'badge-no';
    return 'badge-na';
  }
}
