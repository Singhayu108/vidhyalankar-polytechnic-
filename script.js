document.addEventListener('DOMContentLoaded', () => {
    // GSAP ScrollTrigger Initialization
    gsap.registerPlugin(ScrollTrigger);
  
    // Parallax Effect for Hero Section
    gsap.to('.hero', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        backgroundPosition: '50% 100%',
        ease: 'none'
    });

    // Auto-typing text animation
    const typed = new Typed('.auto-type', {
        strings: [
            'Empowering future engineers with cutting-edge technology',
            'Shaping Future Technocrats Since 1990',
            'Innovation Through Technology',
            'Excellence in Electronics & Computing'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        cursorChar: '|',
        backDelay: 2000,
        startDelay: 1000
    });
  
    // Number Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(numberEl => {
        const target = parseInt(numberEl.dataset.target);
        let currentNum = 0;
  
        const updateNumber = () => {
            if (currentNum < target) {
                currentNum++;
                numberEl.textContent = currentNum;
                requestAnimationFrame(updateNumber);
            }
        };
  
        ScrollTrigger.create({
            trigger: numberEl,
            start: 'top 80%',
            onEnter: updateNumber
        });
    });
  
    // Form Submission Handler
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sent successfully! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Programme Section Content Toggle
    function showContent(contentType) {
        // Hide all content sections
        document.querySelectorAll('.programme-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Show selected content
        document.getElementById(`${contentType}-content`).classList.add('active');
        
        // Update button styles
        document.querySelectorAll('.button-container .btn').forEach(btn => {
            btn.style.opacity = '0.7';
        });
        document.querySelector(`.btn.${contentType === 'peo' ? 'orange' : contentType === 'pso' ? 'green' : 'dark-green'}`).style.opacity = '1';
    }

    // Initialize the first tab as active
    showContent('peo');

    // Handle active link updates on scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('nav ul li a');

    function updateActiveLink() {
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // Syllabus Button Functionality
    const syllabusButtons = document.querySelectorAll('.btn-container .btn');
    const syllabusContent = {
        'first-year': {
            title: 'First Year Syllabus',
            semesters: [
                {
                    name: 'Semester 1',
                    subjects: [
                        'Engineering Mathematics',
                        'Engineering Physics',
                        'Engineering Chemistry',
                        'Engineering Graphics',
                        'Basic Electronics',
                        'Programming Fundamentals'
                    ]
                },
                {
                    name: 'Semester 2',
                    subjects: [
                        'Applied Mathematics',
                        'Digital Electronics',
                        'Electronic Devices and Circuits',
                        'Communication Skills',
                        'Computer Programming',
                        'Workshop Practice'
                    ]
                }
            ]
        },
        'second-year': {
            title: 'Second Year Syllabus',
            semesters: [
                {
                    name: 'Semester 3',
                    subjects: [
                        'Object Oriented Programming',
                        'Data Structures',
                        'Computer Networks',
                        'Database Management',
                        'Microprocessors',
                        'Web Development'
                    ]
                },
                {
                    name: 'Semester 4',
                    subjects: [
                        'Operating Systems',
                        'Java Programming',
                        'Computer Architecture',
                        'Software Engineering',
                        'Network Security',
                        'Mobile Application Development'
                    ]
                }
            ]
        },
        'third-year': {
            title: 'Third Year Syllabus',
            semesters: [
                {
                    name: 'Semester 5',
                    subjects: [
                        'Advanced Java',
                        'Python Programming',
                        'Internet of Things',
                        'Cloud Computing',
                        'Project Management',
                        'Industrial Training'
                    ]
                },
                {
                    name: 'Semester 6',
                    subjects: [
                        'Artificial Intelligence',
                        'Machine Learning',
                        'Blockchain Technology',
                        'Cyber Security',
                        'Project Work',
                        'Professional Practice'
                    ]
                }
            ]
        }
    };

    // Create syllabus modal container if it doesn't exist
    let syllabusModal = document.querySelector('.syllabus-modal');
    if (!syllabusModal) {
        syllabusModal = document.createElement('div');
        syllabusModal.className = 'syllabus-modal';
        document.body.appendChild(syllabusModal);
    }

    syllabusButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const year = index === 0 ? 'first-year' : index === 1 ? 'second-year' : 'third-year';
            showSyllabusContent(syllabusContent[year]);
        });
    });

    function showSyllabusContent(content) {
        const modalContent = `
            <div class="syllabus-modal-content">
                <div class="syllabus-header">
                    <h2>${content.title}</h2>
                    <span class="close-syllabus">&times;</span>
                </div>
                <div class="syllabus-body">
                    ${content.semesters.map(semester => `
                        <div class="semester-section">
                            <h3>${semester.name}</h3>
                            <ul>
                                ${semester.subjects.map(subject => `
                                    <li>${subject}</li>
                                `).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        syllabusModal.innerHTML = modalContent;
        syllabusModal.style.display = 'block';

        // Close button functionality
        const closeBtn = syllabusModal.querySelector('.close-syllabus');
        closeBtn.onclick = () => {
            syllabusModal.style.display = 'none';
        };

        // Click outside to close
        window.onclick = (event) => {
            if (event.target === syllabusModal) {
                syllabusModal.style.display = 'none';
            }
        };
    }
});
