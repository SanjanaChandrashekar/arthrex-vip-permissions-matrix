import { Component, inject, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsService } from './services/permissions.service';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ViewToggleComponent } from './components/view-toggle/view-toggle.component';
import { TableViewComponent } from './components/table-view/table-view.component';
import { CompareViewComponent } from './components/compare-view/compare-view.component';
import { CardsViewComponent } from './components/cards-view/cards-view.component';
import { CaseStatusComponent } from './components/case-status/case-status.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SearchBarComponent,
    ViewToggleComponent,
    TableViewComponent,
    CompareViewComponent,
    CardsViewComponent,
    CaseStatusComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly svc = inject(PermissionsService);
  protected readonly activeTab = signal<'permissions' | 'case-status'>('permissions');

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (event.key === '/' && target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
      event.preventDefault();
      const input = document.querySelector<HTMLInputElement>('.search-input');
      input?.focus();
    }
  }
}
