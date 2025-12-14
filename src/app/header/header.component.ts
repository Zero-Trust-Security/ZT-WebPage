import {
  Component,
  AfterViewInit,
  OnDestroy,
  Renderer2
} from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Typed from 'typed.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  private readonly RESPONSIVE_WIDTH = 1024;
  isHeaderCollapsed = window.innerWidth < this.RESPONSIVE_WIDTH;

  // store references so we can remove listeners later
  private hoverEnterHandlers: Array<() => void> = [];
  private hoverLeaveHandlers: Array<() => void> = [];

  constructor(private renderer: Renderer2, private router: Router) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // -----------------------
  // Routing helpers
  // -----------------------
  goToHome() {
    this.router.navigate(['']);
  }
  goToBlog() {
    this.router.navigate(['/blog']);
  }
  goToAboutUs() {
    this.router.navigate(['/about-us']);
  }
  goToOurTeam() {
    this.router.navigate(['/our-team']);
  }
  goToServices() {
    this.router.navigate(['/services']);
  }
  goToAiMlDetection() {
    this.router.navigate(['/ai-ml-detection']);
  }
  goToAutomatedResponse() {
    this.router.navigate(['/automated-response']);
  }
  goToDashboardSystem() {
    this.router.navigate(['/dashboard-system']);
  }
   goToMitreAttack() {
    this.router.navigate(['/mitre-attck']);
  }
  goToRealTimeMonitoring() {
    this.router.navigate(['/real-time-monitoring']);
  }
  goToUeba() {
    this.router.navigate(['/ueba']);
  }

  // -----------------------
  // Lifecycle
  // -----------------------
  ngAfterViewInit(): void {
    this.initTheme();
    this.responsiveSetup();
    this.initializeGSAP();
    this.initializeTyped();

    // react to resize to switch behavior
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    // clean up hover listeners
    this.hoverEnterHandlers.forEach(h => h());
    this.hoverLeaveHandlers.forEach(h => h());

    window.removeEventListener('resize', this.onResize);
  }

  // -----------------------
  // Resize handler
  // -----------------------
  private onResize = () => {
    this.isHeaderCollapsed = window.innerWidth < this.RESPONSIVE_WIDTH;
    this.responsiveSetup();
  };

  // -----------------------
  // Responsive behavior setup
  // -----------------------
  responsiveSetup(): void {
    // Ensure dropdowns are closed on width change
    this.closeDropdown(0);
    this.closeDropdown(1);

    // Remove previously attached hover listeners
    this.removeHoverListeners();

    if (window.innerWidth > this.RESPONSIVE_WIDTH) {
      // Desktop: enable hover behavior for both toggles
      this.addHoverBehavior(0);
      this.addHoverBehavior(1);
    }
    // Mobile: clicks already wired in template to onToggleClick
  }

  // Add hover listeners for a dropdown index (0 or 1)
  private addHoverBehavior(index: number): void {
    const toggle = document.getElementById(`nav-dropdown-toggle-${index}`);
    const list = document.getElementById(`nav-dropdown-list-${index}`);

    if (!toggle || !list) return;

    // mouseenter -> open and close other dropdown
    const enter = () => {
      this.openDropdown(index);
    };

    // mouseleave -> schedule close (allow moving into dropdown)
    let leaveTimeout: any = null;
    const leave = () => {
      // if cursor leaves toggle, wait briefly in case it enters the list
      leaveTimeout = setTimeout(() => {
        if (!list.matches(':hover') && !toggle.matches(':hover')) {
          this.closeDropdown(index);
        }
      }, 120);
    };

    // Also when leaving the list itself, close after short delay
    const listLeave = () => {
      setTimeout(() => {
        if (!list.matches(':hover') && !toggle.matches(':hover')) {
          this.closeDropdown(index);
        }
      }, 120);
    };

    toggle.addEventListener('mouseenter', enter);
    toggle.addEventListener('mouseleave', leave);
    list.addEventListener('mouseleave', listLeave);

    // Save cleanup functions
    this.hoverEnterHandlers.push(() => toggle.removeEventListener('mouseenter', enter));
    this.hoverLeaveHandlers.push(() => {
      toggle.removeEventListener('mouseleave', leave);
      list.removeEventListener('mouseleave', listLeave);
      clearTimeout(leaveTimeout);
    });
  }

  private removeHoverListeners(): void {
    // run each stored cleanup
    this.hoverEnterHandlers.forEach(fn => fn());
    this.hoverLeaveHandlers.forEach(fn => fn());
    this.hoverEnterHandlers = [];
    this.hoverLeaveHandlers = [];
  }

  // -----------------------
  // Click handler (both mobile & desktop clicks)
  // -----------------------
  // This is wired from template: (click)="onToggleClick($event, 0)"
  onToggleClick(event: Event, index: number): void {
    event.stopPropagation();
    // On desktop we still allow click toggle, but hover takes precedence.
    // Toggle the requested dropdown and close the other.
    const list = document.getElementById(`nav-dropdown-list-${index}`);
    if (!list) return;

    const isOpen = list.getAttribute('data-open') === 'true';
    if (isOpen) {
      this.closeDropdown(index);
    } else {
      this.openDropdown(index);
    }
  }

  // -----------------------
  // Open/Close helpers (mutually exclusive)
  // -----------------------
  private openDropdown(index: number): void {
    // close the other dropdown (0<->1)
    const other = index === 0 ? 1 : 0;
    this.closeDropdown(other);

    const dropdown = document.getElementById(`nav-dropdown-list-${index}`);
    const toggle = document.getElementById(`nav-dropdown-toggle-${index}`);
    if (!dropdown || !toggle) return;

    dropdown.setAttribute('data-open', 'true');
    dropdown.setAttribute('aria-hidden', 'false');
    this.renderer.removeClass(dropdown, 'tw-scale-0');
    this.renderer.removeClass(dropdown, 'tw-opacity-0');
    this.renderer.addClass(dropdown, 'tw-scale-100');
    this.renderer.addClass(dropdown, 'tw-opacity-100');
    this.renderer.setStyle(dropdown, 'maxHeight', index === 0 ? '450px' : '200px');
    this.renderer.setStyle(dropdown, 'width', '90%');

    toggle.setAttribute('aria-expanded', 'true');
  }

  private closeDropdown(index: number): void {
    const dropdown = document.getElementById(`nav-dropdown-list-${index}`);
    const toggle = document.getElementById(`nav-dropdown-toggle-${index}`);
    if (!dropdown) return;

    dropdown.setAttribute('data-open', 'false');
    dropdown.setAttribute('aria-hidden', 'true');
    this.renderer.removeClass(dropdown, 'tw-scale-100');
    this.renderer.removeClass(dropdown, 'tw-opacity-100');
    this.renderer.addClass(dropdown, 'tw-scale-0');
    this.renderer.addClass(dropdown, 'tw-opacity-0');
    this.renderer.setStyle(dropdown, 'maxHeight', '0px');
    this.renderer.setStyle(dropdown, 'width', '0px');

    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  // -----------------------
  // Header collapse (mobile)
  // -----------------------
  toggleHeader(): void {
    const collapseBtn = document.getElementById('collapse-btn');
    const collapseHeaderItems = document.getElementById('collapsed-header-items');

    if (!collapseBtn || !collapseHeaderItems) return;

    if (this.isHeaderCollapsed) {
      collapseHeaderItems.classList.add('max-lg:!tw-opacity-100', 'tw-min-h-[90vh]');
      collapseHeaderItems.style.height = '90vh';
      collapseBtn.classList.replace('bi-list', 'bi-x');
      document.body.classList.add('modal-open');
      this.isHeaderCollapsed = false;
    } else {
      collapseHeaderItems.classList.remove('max-lg:!tw-opacity-100', 'tw-min-h-[90vh]');
      collapseHeaderItems.style.height = '0vh';
      collapseBtn.classList.replace('bi-x', 'bi-list');
      document.body.classList.remove('modal-open');
      this.isHeaderCollapsed = true;
    }
  }

  // -----------------------
  // Theme toggle
  // -----------------------
  toggleMode(): void {
    const toggleIcon = document.querySelector('#toggle-mode-icon');
    const html = document.documentElement;

    html.classList.toggle('tw-dark');

    if (html.classList.contains('tw-dark')) {
      toggleIcon?.classList.remove('bi-sun');
      toggleIcon?.classList.add('bi-moon');
      localStorage.setItem('color-mode', 'dark');
    } else {
      toggleIcon?.classList.add('bi-sun');
      toggleIcon?.classList.remove('bi-moon');
      localStorage.setItem('color-mode', 'light');
    }
  }

  initTheme(): void {
    const saved = localStorage.getItem('color-mode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.classList.add('tw-dark');
    }
    this.updateToggleModeBtn();
  }

  updateToggleModeBtn(): void {
    const toggleIcon = document.querySelector('#toggle-mode-icon') as HTMLElement;
    if (!toggleIcon) return;

    if (document.documentElement.classList.contains('tw-dark')) {
      toggleIcon.classList.remove('bi-sun');
      toggleIcon.classList.add('bi-moon');
      localStorage.setItem('color-mode', 'dark');
    } else {
      toggleIcon.classList.add('bi-sun');
      toggleIcon.classList.remove('bi-moon');
      localStorage.setItem('color-mode', 'light');
    }
  }

  // -----------------------
  // GSAP / Typed initializers (kept minimal)
  // -----------------------
  initializeGSAP(): void {
    // minimal example preserved from your original
    gsap.to('.reveal-up', { opacity: 0, y: '100%' });

    gsap.to('#dashboard', {
      scale: 1,
      translateY: 0,
      rotateX: '0deg',
      scrollTrigger: {
        trigger: '#hero-section',
        start: window.innerWidth > this.RESPONSIVE_WIDTH ? 'top 95%' : 'top 70%',
        end: 'bottom bottom',
        scrub: 1
      }
    });
  }

  initializeTyped(): void {
    try {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      new Typed('#prompts-sample', {
        strings: [
          "How to solve a rubik's cube? Step by step guide",
          "What's Pixa playground?",
          "How to build an AI SaaS App?",
          "How to integrate Pixa API?"
        ],
        typeSpeed: 80,
        smartBackspace: true,
        loop: true,
        backDelay: 2000
      });
    } catch (e) {
      // ignore if element not present
    }
  }
}
