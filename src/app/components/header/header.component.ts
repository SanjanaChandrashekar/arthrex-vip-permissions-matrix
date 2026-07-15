import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() activeTab: 'permissions' | 'case-status' = 'permissions';
  @Output() tabChange = new EventEmitter<'permissions' | 'case-status'>();
}
