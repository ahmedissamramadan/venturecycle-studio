document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Accessibility states
      const expanded = mobileMenuBtn.classList.contains('active');
      mobileMenuBtn.setAttribute('aria-expanded', expanded);
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
     STICKY HEADER EFFECT (Scrolled Class)
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  
  const handleScrollHeader = () => {
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  };
  
  window.addEventListener('scroll', handleScrollHeader, { passive: true });
  handleScrollHeader(); // Initial call

  /* ==========================================================================
     SCROLL REVEAL ANIMATIONS (Intersection Observer)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add cascade delay effect for grouped reveal elements
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 40);
        
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     PORTFOLIO CATEGORY FILTER (Dynamic with animation)
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.tab-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectsGrid = document.getElementById('projects-grid');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Remove active class from other buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        // Apply grid animations
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filterValue === 'all' || category === filterValue) {
            // First display it block/flex
            card.style.display = 'flex';
            // Trigger animation in next frame
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            });
          } else {
            // Fade out
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px) scale(0.95)';
            // Hide after transition
            setTimeout(() => {
              if (card.style.opacity === '0') {
                card.style.display = 'none';
              }
            }, 300);
          }
        });
      });
    });
  }

  /* ==========================================================================
     ACTIVE NAVIGATION SPY (Scroll-Spy)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id], header[id]');
  
  const scrollSpyHandler = () => {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (activeLink) {
          navLinks.forEach(link => link.classList.remove('active'));
          activeLink.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', scrollSpyHandler, { passive: true });
  scrollSpyHandler(); // Initial call

  /* ==========================================================================
     THEME TOGGLE
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme');
  
  if (currentTheme) {
    document.body.classList.add(currentTheme);
  }
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      
      let theme = 'dark-theme';
      if (document.body.classList.contains('light-theme')) {
        theme = 'light-theme';
      }
      localStorage.setItem('theme', theme);
    });
  }

  /* ==========================================================================
     CURSOR RADIAL GLOW EFFECT
     ========================================================================== */
  const glowCards = document.querySelectorAll('.service-card, .project-card, .price-card, .graveyard-card, .sandbox-widget');
  
  glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* ==========================================================================
     AI SANDBOX WIDGET DATA & LOGIC
     ========================================================================== */
  const sandboxData = {
    'fashion-brand': `🎨 [هوية بصرية - قطاع الأزياء]
------------------------------------
● لوحة الألوان المقترحة (Egyptian Sand & Royal Turquoise):
  - الرمل الفرعوني الدافئ: #D4A373 | HSL(33, 53%, 64%)
  - الفيروز النيلي المضيء: #00B4D8 | HSL(190, 90%, 42%)

● موجه التوليد الفني (Midjourney Prompt Template):
  "A premium minimalist fashion brand logo, royal scarab emblem, clean geometric lines, dual-tone gold and turquoise, luxury feel, vector, flat white background --v 6.0"

● المخرجات الفنية المتوقعة:
  - حزمة شعارات متجاوبة (Responsive Logo Pack)
  - ملف نمط الخطوط العربية (Readex Pro & Cairo)`,

    'fashion-content': `📊 [استراتيجية محتوى - قطاع الأزياء]
------------------------------------
● خطة النشر الأسبوعية (أسبوع إطلاق تجريبي):
  - اليوم الأول (السبت): "قصة النسيج" - كيف ندمج خيوط الكتان المصري بالتصميم العصري. (صورة فوتوغرافية بنسبة تباين دافئة).
  - اليوم الثالث (الإثنين): "خلف الكواليس" - ورش العمل وتفاصيل التطريز الدقيق. (فيديو Reel صامت ومثري).
  - اليوم الخامس (الأربعاء): "صوت عميلنا" - استعراض آراء المشترين الأوائل.

● هاشتاغات النمو المستهدفة: #أزياء_محافظة #ملابس_العيد #ستوديو_أزياء`,

    'fashion-systems': `⚙️ [أنظمة الـ AI وأتمتة - قطاع الأزياء]
------------------------------------
● مسار العمل الآلي (Instagram & Shopify Auto-post):
  [Shopify New Product Uploaded]
               ↓
  [Gemini API: توليد وصف تسويقي باللهجة المصرية]
               ↓
  [Make.com Workflow: جدولة تلقائية على Buffer & Instagram]

● نسبة خفض الوقت التشغيلي: 85% شهرياً.`,

    'food-brand': `🎨 [هوية بصرية - قطاع الأغذية والمطاعم]
------------------------------------
● الألوان البصرية (Warm Egyptian Olive & Retro Yellow):
  - الأخضر الزيتوني الشعبي: #386641 | HSL(132, 29%, 31%)
  - الأصفر الداكن اللامع: #F5CB5C | HSL(44, 90%, 66%)

● اتجاه التصميم والتغليف (Packaging Mockup):
  "A clean wrapping paper design for a local falafel sandwich shop, minimal repeat pattern of fava beans and tahini drops, warm olive green ink on recycled kraft paper, modern typography --ar 4:3"

● المخرجات الفنية: تصاميم قائمة الطعام (Menu), أكياس ورقية، وملصقات للعلب.`,

    'food-content': `📊 [استراتيجية محتوى - قطاع الأغذية والمطاعم]
------------------------------------
● أفكار الفيديوهات القصيرة (Viral Reels Ideas):
  - فكرة (1): "صوت القرمشة" - لقطات سينمائية بطيئة لطبخ الفلافل الساخنة مع صوت طبيعي نقي (ASMR).
  - فكرة (2): "أصل الخلطة" - كشف أسرار بهارات الفول السرية لزيادة المشاركات (Shares).

● معدل النشر المقترح: 4 Reels أسبوعياً لزيادة الوصول العضوي (Organic Reach).`,

    'food-systems': `⚙️ [أنظمة الـ AI وأتمتة - قطاع الأغذية والمطاعم]
------------------------------------
● نظام الرد الآلي على استفسارات الطلبات (WhatsApp AI Bot):
  - يستقبل رسائل WhatsApp Business عبر منصة ManyChat.
  - يقوم الذكاء الاصطناعي بتصنيف الرسالة (استفسار عن منيو، فرع، شكوى).
  - توجيه العميل فوراً لقائمة الطلب الإلكتروني أو الرد الفوري بالأسعار ومواقع الفروع.`,

    'tech-brand': `🎨 [هوية بصرية - شركات التقنية B2B]
------------------------------------
● لوحة الألوان (Cyber Indigo & Teal Accent):
  - النيلي السيبراني: #0A0E29 | HSL(231, 60%, 10%)
  - الفيروزي التقني اللامع: #00F5D4 | HSL(172, 100%, 48%)

● نمط الأيقونات والرسوم:
  "A modern clean isometric software architecture icon, showing neural networks and databases, glowing teal strokes, dark background, 3d render style --v 6.0"

● المخرجات: نظام تصميم للواجهات (Figma UI Design System) وصور المكونات للويب.`,

    'tech-content': `📊 [استراتيجية محتوى - شركات التقنية B2B]
------------------------------------
● موضوعات المقالات والمنشورات الاحترافية (LinkedIn Thought Leadership):
  - المقال الأول: "لماذا فشل 90% من الشركات في تبني أتمتة الـ AI خلال العام الماضي؟"
  - المقال الثاني: "دليل عملي لبناء خط أنابيب بيانات آمن باستخدام خوادم محلية."

● مؤشرات الأداء المستهدفة: زيادة تفاعل كبار مسؤولي التقنية (CTOs) وحجز الاستشارات.`,

    'tech-systems': `⚙️ [أنظمة الـ AI وأتمتة - شركات التقنية B2B]
------------------------------------
● أتمتة جلب العملاء المحتملين (LinkedIn Lead Gen Pipeline):
  [LinkedIn Inbound Message received]
               ↓
  [Gemini API analyzes: تصنيف الاهتمام وملاءمة الميزانية]
               ↓
  [Slack Alert + Hubspot CRM Update: تنبيه فريق المبيعات]

● كفاءة الوقت: توفير 18 ساعة أسبوعياً من الفرز اليدوي.`
  };

  const indSelector = document.getElementById('industry-selector');
  const svcSelector = document.getElementById('service-selector');
  const sandboxOutput = document.getElementById('sandbox-output');

  const updateSandboxOutput = () => {
    if (!indSelector || !svcSelector || !sandboxOutput) return;
    
    const activeInd = indSelector.querySelector('.sandbox-btn.active').getAttribute('data-value');
    const activeSvc = svcSelector.querySelector('.sandbox-btn.active').getAttribute('data-value');
    const key = `${activeInd}-${activeSvc}`;
    
    sandboxOutput.textContent = sandboxData[key] || 'لا يوجد محتوى متوفر حالياً لهذه الفئة.';
  };

  if (indSelector) {
    const buttons = indSelector.querySelectorAll('.sandbox-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateSandboxOutput();
      });
    });
  }

  if (svcSelector) {
    const buttons = svcSelector.querySelectorAll('.sandbox-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateSandboxOutput();
      });
    });
  }

  // Trigger initial load
  updateSandboxOutput();

  /* ==========================================================================
     FAQ ACCORDION PANEL TOGGLE
     ========================================================================== */
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all items
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        const answer = i.querySelector('.faq-answer');
        if (answer) answer.style.maxHeight = null;
      });
      
      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      }
    });
  });

  /* ==========================================================================
     SCROLL PROGRESS BAR
     ========================================================================== */
  const scrollProgress = document.getElementById('scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const windowScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (windowScroll / height) * 100 : 0;
      scrollProgress.style.width = scrolled + '%';
    }, { passive: true });
  }

  /* ==========================================================================
     CONTACT FORM VALIDATION & MODAL INTERACTION
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');

  if (contactForm && successModal && closeModalBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');
      
      // Name check
      if (!nameInput.value.trim()) {
        nameInput.parentElement.classList.add('invalid');
        isValid = false;
      } else {
        nameInput.parentElement.classList.remove('invalid');
      }
      
      // Email check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.parentElement.classList.add('invalid');
        isValid = false;
      } else {
        emailInput.parentElement.classList.remove('invalid');
      }
      
      // Message check
      if (!messageInput.value.trim()) {
        messageInput.parentElement.classList.add('invalid');
        isValid = false;
      } else {
        messageInput.parentElement.classList.remove('invalid');
      }
      
      if (isValid) {
        successModal.classList.add('active');
        successModal.setAttribute('aria-hidden', 'false');
        contactForm.reset();
      }
    });

    closeModalBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
      successModal.setAttribute('aria-hidden', 'true');
    });

    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
        successModal.setAttribute('aria-hidden', 'true');
      }
    });
  }
});
