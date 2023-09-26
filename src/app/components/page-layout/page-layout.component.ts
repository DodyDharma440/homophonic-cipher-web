import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-layout',
  templateUrl: './page-layout.component.html',
})
export class PageLayoutComponent implements OnInit {
  theme = 'light';

  ngOnInit(): void {
    const defaultTheme = localStorage.getItem('theme') || 'light';
    this.onToggleClassName(defaultTheme);
    this.theme = defaultTheme;
  }

  onToggleClassName(theme: string) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  onToggleTheme() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.theme = newTheme;
    this.onToggleClassName(newTheme);
    localStorage.setItem('theme', newTheme);
  }
}
