// Coursely Interactive App Logic

document.addEventListener('DOMContentLoaded', () => {
  // Course Filtering
  const filterBtns = document.querySelectorAll('#catalogFilters .filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-category');
      courseCards.forEach(card => {
        const cardCat = card.getAttribute('data-cat');
        if (cat === 'all' || cardCat === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Search Bar Filter
  const searchInput = document.getElementById('courseSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      courseCards.forEach(card => {
        const title = card.querySelector('.course-title')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('.course-desc')?.textContent.toLowerCase() || '';
        if (title.includes(query) || desc.includes(query)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Interactive ROI Salary Calculator
  const salaryRange = document.getElementById('currentSalaryRange');
  const salaryVal = document.getElementById('currentSalaryVal');
  const specializationSelect = document.getElementById('targetSpecialization');
  const projectedSalaryDisplay = document.getElementById('projectedSalaryDisplay');
  const salaryLiftVal = document.getElementById('salaryLiftVal');
  const timelineVal = document.getElementById('timelineVal');
  const hoursBtns = document.querySelectorAll('#weeklyHoursGroup .btn-pill');

  let currentHours = 10;

  hoursBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      hoursBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentHours = parseInt(btn.getAttribute('data-hours')) || 10;
      recalculateROI();
    });
  });

  function recalculateROI() {
    const currentSal = parseInt(salaryRange.value) || 65000;
    salaryVal.textContent = `$${currentSal.toLocaleString()} / yr`;

    const multiplier = parseFloat(specializationSelect.value) || 1.65;
    const projected = Math.round(currentSal * multiplier);
    const lift = projected - currentSal;

    projectedSalaryDisplay.textContent = `$${projected.toLocaleString()}`;
    salaryLiftVal.textContent = `+$${lift.toLocaleString()} / year`;

    // Timeline based on hours
    if (currentHours === 5) {
      timelineVal.textContent = '18 Weeks';
    } else if (currentHours === 10) {
      timelineVal.textContent = '10 Weeks';
    } else {
      timelineVal.textContent = '5 Weeks (Intensive)';
    }
  }

  if (salaryRange) salaryRange.addEventListener('input', recalculateROI);
  if (specializationSelect) specializationSelect.addEventListener('change', recalculateROI);

  // Syllabus Modal
  const syllabusModal = document.getElementById('syllabusModal');
  const closeSyllabusBtn = document.getElementById('closeSyllabusBtn');
  const modalCourseTitle = document.getElementById('modalCourseTitle');
  const previewBtns = document.querySelectorAll('.preview-syllabus-btn');

  previewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const courseName = btn.getAttribute('data-course');
      modalCourseTitle.textContent = `${courseName} — Detailed Syllabus`;
      syllabusModal.classList.add('active');
    });
  });

  if (closeSyllabusBtn) {
    closeSyllabusBtn.addEventListener('click', () => {
      syllabusModal.classList.remove('active');
    });
  }

  // Demo Video button
  const playDemoVideoBtn = document.getElementById('playDemoVideoBtn');
  if (playDemoVideoBtn) {
    playDemoVideoBtn.addEventListener('click', () => {
      modalCourseTitle.textContent = "Coursely Platform & Interactive Sandbox Walkthrough (Demo)";
      syllabusModal.classList.add('active');
    });
  }

  // Close modal when clicking outside
  if (syllabusModal) {
    syllabusModal.addEventListener('click', (e) => {
      if (e.target === syllabusModal) {
        syllabusModal.classList.remove('active');
      }
    });
  }
});
