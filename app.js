class PitchDeckPresentation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 20;
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentSlideSpan = document.getElementById('currentSlide');
        this.totalSlidesSpan = document.getElementById('totalSlides');
        
        this.init();
    }
    
    init() {
        // Set initial state
        this.updateSlideCounter();
        this.updateNavigationButtons();
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Touch/swipe support for mobile
        this.addTouchSupport();
        
        // Auto-advance timer (optional, commented out)
        // this.startAutoAdvance();
    }
    
    showSlide(slideNumber) {
        // Validate slide number
        if (slideNumber < 1 || slideNumber > this.totalSlides) {
            return;
        }
        
        // Remove active class from current slide
        this.slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to new slide
        const targetSlide = document.querySelector(`[data-slide="${slideNumber}"]`);
        if (targetSlide) {
            targetSlide.classList.add('active');
        }
        
        // Update current slide
        this.currentSlide = slideNumber;
        
        // Update UI
        this.updateSlideCounter();
        this.updateNavigationButtons();
        
        // Trigger any slide-specific animations
        this.triggerSlideAnimations(slideNumber);
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.showSlide(this.currentSlide + 1);
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 1) {
            this.showSlide(this.currentSlide - 1);
        }
    }
    
    updateSlideCounter() {
        this.currentSlideSpan.textContent = this.currentSlide;
        this.totalSlidesSpan.textContent = this.totalSlides;
    }
    
    updateNavigationButtons() {
        this.prevBtn.disabled = this.currentSlide === 1;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides;
    }
    
    handleKeyboard(event) {
        switch(event.key) {
            case 'ArrowRight':
            case ' ':
                event.preventDefault();
                this.nextSlide();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                this.previousSlide();
                break;
            case 'Home':
                event.preventDefault();
                this.showSlide(1);
                break;
            case 'End':
                event.preventDefault();
                this.showSlide(this.totalSlides);
                break;
            case 'Escape':
                event.preventDefault();
                this.toggleFullscreen();
                break;
        }
    }
    
    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        const container = document.querySelector('.presentation-container');
        
        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        container.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Check if horizontal swipe is longer than vertical
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.previousSlide();
                } else {
                    this.nextSlide();
                }
            }
        });
    }
    
    triggerSlideAnimations(slideNumber) {
        // Add specific animations for certain slides
        const slide = document.querySelector(`[data-slide="${slideNumber}"]`);
        
        switch(slideNumber) {
            case 2:
                this.animateStatsCounters();
                break;
            case 3:
                this.animateReadinessChart();
                break;
            case 11:
                this.animateRevenueChart();
                break;
            case 12:
                this.animateGrowthChart();
                break;
            case 13:
                this.animateMetrics();
                break;
        }
    }
    
    animateStatsCounters() {
        const statNumbers = document.querySelectorAll('.slide.active .stat-number');
        statNumbers.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    stat.style.transform = 'scale(1)';
                }, 200);
            }, index * 300);
        });
    }
    
    animateReadinessChart() {
        const barSegments = document.querySelectorAll('.slide.active .bar-segment');
        barSegments.forEach((segment, index) => {
            segment.style.width = '0%';
            setTimeout(() => {
                segment.style.transition = 'width 1s ease-out';
                if (segment.classList.contains('pacesetters')) {
                    segment.style.width = '13%';
                } else if (segment.classList.contains('chasers')) {
                    segment.style.width = '33%';
                } else if (segment.classList.contains('followers')) {
                    segment.style.width = '51%';
                } else if (segment.classList.contains('laggards')) {
                    segment.style.width = '3%';
                }
            }, index * 200);
        });
    }
    
    animateRevenueChart() {
        const revenueBars = document.querySelectorAll('.slide.active .revenue-bar');
        revenueBars.forEach((bar, index) => {
            const originalHeight = bar.style.height;
            bar.style.height = '0%';
            setTimeout(() => {
                bar.style.transition = 'height 0.8s ease-out';
                bar.style.height = originalHeight;
            }, index * 200);
        });
    }
    
    animateGrowthChart() {
        const growthYears = document.querySelectorAll('.slide.active .growth-year');
        growthYears.forEach((year, index) => {
            year.style.opacity = '0';
            year.style.transform = 'translateY(20px)';
            setTimeout(() => {
                year.style.transition = 'all 0.5s ease-out';
                year.style.opacity = '1';
                year.style.transform = 'translateY(0)';
            }, index * 300);
        });
    }
    
    animateMetrics() {
        const metricValues = document.querySelectorAll('.slide.active .metric-value');
        metricValues.forEach((metric, index) => {
            setTimeout(() => {
                metric.style.transform = 'scale(1.1)';
                metric.style.color = '#00d4ff';
                setTimeout(() => {
                    metric.style.transform = 'scale(1)';
                }, 300);
            }, index * 200);
        });
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    // Optional auto-advance functionality (commented out by default)
    /*
    startAutoAdvance() {
        this.autoAdvanceInterval = setInterval(() => {
            if (this.currentSlide < this.totalSlides) {
                this.nextSlide();
            } else {
                this.stopAutoAdvance();
            }
        }, 10000); // 10 seconds per slide
    }
    
    stopAutoAdvance() {
        if (this.autoAdvanceInterval) {
            clearInterval(this.autoAdvanceInterval);
            this.autoAdvanceInterval = null;
        }
    }
    */
    
    // Method to jump to specific slide (useful for testing)
    goToSlide(slideNumber) {
        this.showSlide(slideNumber);
    }
    
    // Method to reset presentation
    reset() {
        this.showSlide(1);
    }
}

// Utility functions for enhanced presentation experience
class PresentationUtils {
    static addProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = '<div class="progress-fill"></div>';
        document.body.appendChild(progressBar);
        
        // Add CSS for progress bar
        const style = document.createElement('style');
        style.textContent = `
            .progress-bar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: rgba(255, 255, 255, 0.1);
                z-index: 1001;
            }
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #00d4ff 0%, #0099cc 100%);
                width: 0%;
                transition: width 0.3s ease;
            }
        `;
        document.head.appendChild(style);
        
        return progressBar;
    }
    
    static updateProgress(currentSlide, totalSlides) {
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            const progress = (currentSlide / totalSlides) * 100;
            progressFill.style.width = `${progress}%`;
        }
    }
    
    static addSlideNumbers() {
        const slides = document.querySelectorAll('.slide');
        slides.forEach((slide, index) => {
            const slideNumber = document.createElement('div');
            slideNumber.className = 'slide-number';
            slideNumber.textContent = index + 1;
            slideNumber.style.cssText = `
                position: absolute;
                top: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.5);
                color: #00d4ff;
                padding: 5px 10px;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: 500;
            `;
            slide.appendChild(slideNumber);
        });
    }
    
    static addPresenterNotes() {
        // This would be useful for a presenter mode
        const notes = {
            1: "Welcome and strong opening - emphasize urgency",
            2: "Hit the crisis hard - make it personal",
            3: "Show the massive gap in readiness",
            4: "Pivot to opportunity - this is huge",
            5: "Our comprehensive solution",
            6: "Deep dive on Academy - Netflix comparison",
            7: "Community aspect - retention stats",
            8: "Assessment tools - scientific approach",
            9: "Safety first - practical tools",
            10: "Enterprise revenue stream",
            11: "Sustainable business model",
            12: "Show explosive growth potential",
            13: "Best-in-class metrics",
            14: "Clear execution plan",
            15: "Unique positioning",
            16: "Investment opportunity",
            17: "Market validation",
            18: "Strong team",
            19: "Call to action - urgency",
            20: "Strong close - contact info"
        };
        
        return notes;
    }
}

// Initialize the presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create the main presentation instance
    window.presentation = new PitchDeckPresentation();
    
    // Add optional enhancements
    const progressBar = PresentationUtils.addProgressBar();
    PresentationUtils.addSlideNumbers();
    
    // Update progress bar when slides change
    const originalShowSlide = window.presentation.showSlide;
    window.presentation.showSlide = function(slideNumber) {
        originalShowSlide.call(this, slideNumber);
        PresentationUtils.updateProgress(slideNumber, this.totalSlides);
    };
    
    // Add some helpful console commands for debugging
    console.log('Pitch Deck Presentation loaded!');
    console.log('Available commands:');
    console.log('- presentation.goToSlide(n) - Jump to slide n');
    console.log('- presentation.reset() - Go back to slide 1');
    console.log('- Keyboard: Arrow keys, Space, Home, End, Escape');
    console.log('- Touch: Swipe left/right on mobile');
    
    // Handle window resize for responsive adjustments
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Trigger any necessary recalculations
            window.presentation.triggerSlideAnimations(window.presentation.currentSlide);
        }, 250);
    });
    
    // Prevent context menu on right click (optional)
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    
    // Add visibility change handler to pause/resume if needed
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Presentation is hidden (tab switched, etc.)
            console.log('Presentation paused');
        } else {
            // Presentation is visible again
            console.log('Presentation resumed');
        }
    });
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PitchDeckPresentation, PresentationUtils };
}