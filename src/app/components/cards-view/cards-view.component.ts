import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsService, ROLES } from '../../services/permissions.service';
import { HighlightPipe } from '../../pipes/highlight.pipe';
import { PermissionValue, RoleName } from '../../models/permission.model';

@Component({
  selector: 'app-cards-view',
  standalone: true,
  imports: [CommonModule, HighlightPipe],
  templateUrl: './cards-view.component.html',
  styleUrl: './cards-view.component.scss',
})
export class CardsViewComponent {
  protected readonly svc = inject(PermissionsService);
  readonly allRoles: RoleName[] = ROLES;

  readonly isAllSelected = computed(() => this.svc.activeRoles().size === ROLES.length);

  readonly visibleRoles = computed(() =>
    ROLES.filter(r => this.svc.activeRoles().has(r))
  );

  toggleRole(role: RoleName): void {
    this.svc.toggleActiveRole(role);
  }

  toggleAll(): void {
    this.svc.setAllActiveRoles(!this.isAllSelected());
  }

  tagClass(val: PermissionValue): string {
    if (val === 'Yes') return 'tag-yes';
    if (val === 'No') return 'tag-no';
    return 'tag-na';
  }
}
