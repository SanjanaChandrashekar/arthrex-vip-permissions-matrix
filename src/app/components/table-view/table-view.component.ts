import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsService, ROLES } from '../../services/permissions.service';
import { HighlightPipe } from '../../pipes/highlight.pipe';
import { PermissionValue, RoleName } from '../../models/permission.model';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [CommonModule, HighlightPipe],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss',
})
export class TableViewComponent {
  protected readonly svc = inject(PermissionsService);
  readonly roles: RoleName[] = ROLES;

  badgeClass(val: PermissionValue): string {
    if (val === 'Yes') return 'badge-yes';
    if (val === 'No') return 'badge-no';
    return 'badge-na';
  }
}
