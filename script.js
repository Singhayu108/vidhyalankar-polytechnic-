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
  
    // Typewriter Effect
    const typewriterText = document.querySelector('.typewriter-text');
    const text = typewriterText.textContent;
    typewriterText.textContent = '';
  
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        typewriterText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
  
    typeWriter();
  
    // Form Submission Handler
    const contactForm = document.querySelector('.contact-form form');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Message sent successfully! We will get back to you soon.');
      contactForm.reset();
    });

    // Course details object
    const courseDetails = {
        'computer-engineering': {
            title: 'Diploma in Computer Engineering',
            duration: '3 Years',
            eligibility: 'SSC (10th) Passed with minimum 35% marks',
            seats: 60,
            description: 'The Diploma in Computer Engineering program provides comprehensive knowledge in computer programming, hardware, networking, and software development.',
            syllabus: [
                'First Year: Basic Mathematics, Physics, Chemistry, Basic Electronics',
                'Second Year: Programming Languages, Database Management, Computer Networks',
                'Third Year: Advanced Programming, Software Engineering, Project Work'
            ],
            career: [
                'Software Developer',
                'Network Administrator',
                'System Analyst',
                'Database Administrator',
                'Web Developer'
            ],
            fees: '₹25,000 per year (approximately)',
            facilities: [
                'Modern Computer Labs',
                'High-Speed Internet',
                'Digital Library',
                'Project Labs',
                'Industry Expert Sessions'
            ]
        },
        'web-development': {
            title: 'Certificate in Web Development',
            duration: '6 Months',
            eligibility: '12th Passed or Diploma (Any Stream)',
            seats: 30,
            description: 'Comprehensive course covering modern web development technologies and frameworks.',
            syllabus: [
                'HTML5 & CSS3 Fundamentals',
                'JavaScript & jQuery',
                'React.js Basics',
                'Responsive Design Principles',
                'Backend Integration'
            ],
            career: [
                'Frontend Developer',
                'Web Designer',
                'UI Developer',
                'Freelance Web Developer'
            ],
            fees: '₹15,000 (Full Course)',
            facilities: [
                'Practical Labs',
                'Live Project Work',
                'Industry Mentorship'
            ]
        },
        'iot-robotics': {
            title: 'Certificate in IoT & Robotics',
            duration: '4 Months',
            eligibility: '12th Passed (Science) or Diploma',
            seats: 25,
            description: 'Hands-on training program in IoT technologies and robotics fundamentals.',
            syllabus: [
                'Arduino Programming',
                'Sensor Integration',
                'IoT Protocols & Architecture',
                'Basic Robotics',
                'Project Development'
            ],
            career: [
                'IoT Developer',
                'Robotics Programmer',
                'IoT System Designer',
                'Automation Engineer'
            ],
            fees: '₹20,000 (Full Course)',
            facilities: [
                'IoT Lab',
                'Robotics Kit',
                'Project Guidance'
            ]
        }
    };

    // Modal functionality
    const modal = document.getElementById('courseModal');
    const closeBtn = document.getElementsByClassName('close-modal')[0];
    const courseButtons = document.querySelectorAll('.course-btn');

    courseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseType = this.closest('.course-card').querySelector('h3').textContent.toLowerCase();
            let courseKey;
            
            if (courseType.includes('computer')) courseKey = 'computer-engineering';
            else if (courseType.includes('web')) courseKey = 'web-development';
            else if (courseType.includes('iot')) courseKey = 'iot-robotics';

            const course = courseDetails[courseKey];
            showCourseDetails(course);
        });
    });

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    const slides = document.querySelectorAll('.achievement-slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    
    // Hide all slides except the first one
    slides.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.display = 'none';
        }
    });
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Show the current slide
        slides[index].style.display = 'block';
        
        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    // Next button click
    nextBtn.addEventListener('click', () => {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    });
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        showSlide(prevIndex);
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});

function showCourseDetails(course) {
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <h2 style="color: #00f0ff; margin-bottom: 2rem;">${course.title}</h2>
        
        <div class="modal-section">
            <h3>Course Overview</h3>
            <p style="color: #fff;">${course.description}</p>
        </div>

        <div class="modal-section">
            <h3>Key Details</h3>
            <ul>
                <li>Duration: ${course.duration}</li>
                <li>Eligibility: ${course.eligibility}</li>
                <li>Available Seats: ${course.seats}</li>
                <li>Course Fees: ${course.fees}</li>
            </ul>
        </div>

        <div class="modal-section">
            <h3>Syllabus Highlights</h3>
            <ul>
                ${course.syllabus.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="modal-section">
            <h3>Career Opportunities</h3>
            <ul>
                ${course.career.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="modal-section">
            <h3>Facilities</h3>
            <ul>
                ${course.facilities.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="action-buttons">
            <button class="action-btn apply-btn" onclick="window.location.href='#contact'">Apply Now</button>
            <button class="action-btn learn-more-btn" onclick="window.open('https://msbte.org.in', '_blank')">Visit MSBTE</button>
        </div>
    `;
    
    document.getElementById('courseModal').style.display = "block";
}
