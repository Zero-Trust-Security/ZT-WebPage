import { AfterViewInit, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-automated-response',
  templateUrl: './automated-response.component.html',
  styleUrls: ['./automated-response.component.css']
})


export class AutomatedResponseComponent implements AfterViewInit {

  RESPONSIVE_WIDTH = 1024;
  isHeaderCollapsed = window.innerWidth < this.RESPONSIVE_WIDTH;
  navToggle: HTMLElement | null = null;
   navDropdown: HTMLElement | null = null;
  collapseBtn!: HTMLElement;
  collapseHeaderItems!: HTMLElement;

  ngAfterViewInit(): void {
    this.collapseBtn = document.getElementById("collapse-btn")!;
    this.collapseHeaderItems = document.getElementById("collapsed-header-items")!;

    this.initGSAPAnimations();
    this.initAccordion();
    this.responsive();
  }


  // ------------------- HEADER ------------------- //

  toggleHeader() {
    if (this.isHeaderCollapsed) {
      this.collapseHeaderItems.classList.add("opacity-100");
      this.collapseHeaderItems.style.width = "60vw";

      this.collapseBtn.classList.remove("bi-list");
      this.collapseBtn.classList.add("bi-x");

      this.isHeaderCollapsed = false;

      setTimeout(() => window.addEventListener("click", this.onClickOutside), 1);

    } else {
      this.collapseHeaderItems.classList.remove("opacity-100");
      this.collapseHeaderItems.style.width = "0vw";

      this.collapseBtn.classList.remove("bi-x");
      this.collapseBtn.classList.add("bi-list");

      this.isHeaderCollapsed = true;
      window.removeEventListener("click", this.onClickOutside);
    }
  }

  onClickOutside = (e: any) => {
    if (!this.collapseHeaderItems.contains(e.target)) {
      this.toggleHeader();
    }
  };

  @HostListener('window:resize')
  // responsive() {
  //   if (window.innerWidth > this.RESPONSIVE_WIDTH) {
  //     this.collapseHeaderItems.style.width = "";
  //   } else {
  //     this.isHeaderCollapsed = true;
  //   }
  // }
    responsive(): void {
    if (!this.collapseHeaderItems || !this.navToggle) return;

    if (!this.isHeaderCollapsed) {
      this.toggleHeader();
    }

    if (window.innerWidth > this.RESPONSIVE_WIDTH) {
      this.collapseHeaderItems.style.height = "";
      this.navToggle?.addEventListener("mouseenter", () => this.openNavDropdown());
      this.navToggle?.addEventListener("mouseleave", () => this.navMouseLeave());
    } else {
      this.isHeaderCollapsed = true;
      this.navToggle?.removeEventListener("mouseenter", () => this.openNavDropdown());
      this.navToggle?.removeEventListener("mouseleave", () => this.navMouseLeave());
    }
  }
 navMouseLeave(): void {
    setTimeout(() => this.closeNavDropdown(), 100);
  }

  openNavDropdown(): void {
    if (!this.navDropdown) return;

    this.navDropdown.classList.add(
      "tw-opacity-100", "tw-scale-100",
      "max-lg:tw-min-h-[450px]", "max-lg:!tw-h-fit",
      "tw-min-w-[320px]"
    );
    this.navDropdown.setAttribute("data-open", "true");
  }

  closeNavDropdown(): void {
    if (!this.navDropdown) return;

    if (this.navDropdown.matches(":hover")) return;

    this.navDropdown.classList.remove(
      "tw-opacity-100", "tw-scale-100",
      "max-lg:tw-min-h-[450px]", "max-lg:!tw-h-fit",
      "tw-min-w-[320px]"
    );
    this.navDropdown.setAttribute("data-open", "false");
  }

  // ------------------- VIDEO OPEN/CLOSE ------------------- //

  openVideo() {
    const bg = document.getElementById("video-container-bg")!;
    const box = document.getElementById("video-container")!;

    bg.classList.add("tw-scale-100", "tw-opacity-100");
    box.classList.add("tw-scale-100");
  }

  closeVideo() {
    const bg = document.getElementById("video-container-bg")!;
    const box = document.getElementById("video-container")!;

    bg.classList.remove("tw-scale-100", "tw-opacity-100");
    box.classList.remove("tw-scale-100");
  }


  // ------------------- FAQ ACCORDION ------------------- //

  initAccordion() {
    const faqAccordion = document.querySelectorAll('.faq-accordion');

    faqAccordion.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('active');

        let content = (btn as HTMLElement).nextElementSibling as HTMLElement;

        if (content.style.maxHeight === '200px') {
          content.style.maxHeight = '0px';
          content.style.padding = '0px 18px';
        } else {
          content.style.maxHeight = '200px';
          content.style.padding = '20px 18px';
        }
      });
    });
  }


  // ------------------- GSAP ------------------- //

  initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".reveal-up", {
      opacity: 0,
      y: "100%",
    });

    gsap.to("#dashboard", {
      boxShadow: "0px 15px 25px -5px #7e22ceaa",
      duration: 0.3,
      scrollTrigger: {
        trigger: "#hero-section",
        start: "60% 60%",
        end: "80% 80%",
      }
    });

    gsap.to("#dashboard", {
      scale: 1,
      translateY: 0,
      rotateX: "0deg",
      scrollTrigger: {
        trigger: "#hero-section",
        start: window.innerWidth > this.RESPONSIVE_WIDTH ? "top 95%" : "top 70%",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    const sections = gsap.utils.toArray("section");

    sections.forEach((sec: any) => {
      const tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: sec,
          start: "10% 80%",
          end: "20% 90%",
        }
      });

      tl.to(sec.querySelectorAll(".reveal-up"), {
        opacity: 1,
        duration: 0.8,
        y: "0%",
        stagger: 0.2,
      });
    });
  }
}