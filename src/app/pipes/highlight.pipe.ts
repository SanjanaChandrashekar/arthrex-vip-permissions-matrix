import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string, searchTerm: string): SafeHtml {
    if (!searchTerm?.trim()) return text;
    const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const highlighted = text.replace(
      regex,
      `<mark>$1</mark>`
    );
    return this.sanitizer.bypassSecurityTrustHtml(highlighted);
  }
}
