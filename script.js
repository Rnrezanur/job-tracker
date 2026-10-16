const initialJobs = [
  {
    id: 1,
    companyName: 'Mobile First Corp',
    position: 'React Native Developer',
    location: 'Remote',
    type: 'Full-time',
    salary: '$130,000 - $175,000',
    description: 'Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.',
    status: 'Not Applied'
  },
  {
    id: 2,
    companyName: 'WebFlow Agency',
    position: 'Web Designer & Developer',
    location: 'Los Angeles, CA',
    type: 'Part-time',
    salary: '$80,000 - $120,000',
    description: 'Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.',
    status: 'Not Applied'
  },
  {
    id: 3,
    companyName: 'DataViz Solutions',
    position: 'Data Visualization Specialist',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$125,000 - $165,000',
    description: 'Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.',
    status: 'Not Applied'
  },
  {
    id: 4,
    companyName: 'CloudFirst Inc',
    position: 'Backend Developer',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$140,000 - $190,000',
    description: 'Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.',
    status: 'Not Applied'
  },
  {
    id: 5,
    companyName: 'Innovation Labs',
    position: 'UI/UX Engineer',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$110,000 - $150,000',
    description: 'Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.',
    status: 'Not Applied'
  },
  {
    id: 6,
    companyName: 'MegaCorp Solutions',
    position: 'JavaScript Developer',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$130,000 - $170,000',
    description: 'Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities.',
    status: 'Not Applied'
  },
  {
    id: 7,
    companyName: 'StartupXYZ',
    position: 'Full Stack Engineer',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120,000 - $160,000',
    description: 'Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included.',
    status: 'Not Applied'
  },
  {
    id: 8,
    companyName: 'TechCorp Industries',
    position: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$130,000 - $175,000',
    description: 'We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects.',
    status: 'Not Applied'
  }
];


let jobs = [...initialJobs];
let currentTab = 'all';

// DOM Elements
const totalCountEl = document.getElementById('total-count');
const interviewCountEl = document.getElementById('interview-count');
const rejectedCountEl = document.getElementById('rejected-count');
const availableJobsCountEl = document.getElementById('available-jobs-count');
const jobsContainer = document.getElementById('jobs-container');
const emptyState = document.getElementById('empty-state');
const tabButtons = document.querySelectorAll('.tab-btn');
const themeToggle = document.getElementById('theme-toggle');

/**
 * Returns HTML template for status badge using DaisyUI badges
 */
function getStatusBadgeHTML(status) {
  if (status === 'Interview') {
    return `<span class="badge badge-success badge-outline font-semibold text-xs uppercase tracking-wider">INTERVIEW</span>`;
  }
  if (status === 'Rejected') {
    return `<span class="badge badge-error badge-outline font-semibold text-xs uppercase tracking-wider">REJECTED</span>`;
  }
  return `<span class="badge badge-ghost font-semibold text-xs uppercase tracking-wider">NOT APPLIED</span>`;
}

/**
 * Creates HTML string for a single job card using DaisyUI card & button components
 */
function createJobCardHTML(job) {
  const isInterview = job.status === 'Interview';
  const isRejected = job.status === 'Rejected';

  const interviewBtnClasses = isInterview
    ? 'btn-success text-white shadow-xs'
    : 'btn-outline btn-success';

  const rejectedBtnClasses = isRejected
    ? 'btn-error text-white shadow-xs'
    : 'btn-outline btn-error';

  return `
    <article class="card bg-base-100 border border-base-300 shadow-xs transition-transform duration-150 hover:-translate-y-0.5 job-card" data-id="${job.id}">
      <div class="card-body p-5 sm:p-6">
        <!-- Top Row: Company Name & Delete Button -->
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3 class="text-base sm:text-lg font-bold text-base-content leading-tight">${job.companyName}</h3>
            <p class="text-sm font-medium opacity-80 mt-0.5">${job.position}</p>
          </div>
          <!-- Delete Button (Phosphor Trash Icon) -->
          <button
            type="button"
            class="btn btn-ghost btn-circle btn-sm text-base-content/50 hover:text-error delete-btn"
            data-id="${job.id}"
            title="Delete job"
            aria-label="Delete ${job.companyName} job">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" class="pointer-events-none">
              <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
            </svg>
          </button>
        </div>

        <!-- Job Metadata -->
        <div class="flex flex-wrap items-center gap-2 text-xs font-medium opacity-65 mt-2">
          <span>${job.location}</span>
          <span aria-hidden="true">•</span>
          <span>${job.type}</span>
          <span aria-hidden="true">•</span>
          <span>${job.salary}</span>
        </div>

        <!-- Status Badge -->
        <div class="mt-3">
          ${getStatusBadgeHTML(job.status)}
        </div>

        <!-- Description -->
        <p class="text-sm opacity-75 mt-3 mb-4 leading-relaxed">${job.description}</p>

        <!-- Action Buttons (DaisyUI Buttons) -->
        <div class="flex items-center gap-3 pt-1">
          <button
            type="button"
            class="btn btn-sm ${interviewBtnClasses} btn-interview uppercase tracking-wider text-xs"
            data-id="${job.id}">
            INTERVIEW
          </button>
          <button
            type="button"
            class="btn btn-sm ${rejectedBtnClasses} btn-rejected uppercase tracking-wider text-xs"
            data-id="${job.id}">
            REJECTED
          </button>
        </div>
      </div>
    </article>
  `;
}

/**
 * Filter jobs according to the active tab
 */
function getFilteredJobs() {
  if (currentTab === 'interview') {
    return jobs.filter(job => job.status === 'Interview');
  }
  if (currentTab === 'rejected') {
    return jobs.filter(job => job.status === 'Rejected');
  }
  return jobs;
}

/**
 * Updates tab button styles according to the active tab
 */
function updateTabButtonsUI() {
  tabButtons.forEach(btn => {
    const tab = btn.getAttribute('data-tab');
    if (tab === currentTab) {
      btn.setAttribute('aria-selected', 'true');
      btn.className = 'tab-btn btn btn-sm btn-primary';
    } else {
      btn.setAttribute('aria-selected', 'false');
      btn.className = 'tab-btn btn btn-sm btn-ghost border border-base-300 bg-base-100';
    }
  });
}

/**
 * Handle tab switching
 */
function handleTabChange(tabName) {
  if (currentTab === tabName) return;
  currentTab = tabName;
  updateTabButtonsUI();
  render();
}

/**
 * Main Render Function
 */
function render() {
  // Sync tab buttons UI
  updateTabButtonsUI();

  // 1. Calculate dashboard statistics
  const totalCount = jobs.length;
  const interviewCount = jobs.filter(j => j.status === 'Interview').length;
  const rejectedCount = jobs.filter(j => j.status === 'Rejected').length;

  // 2. Update dashboard DOM
  totalCountEl.textContent = totalCount;
  interviewCountEl.textContent = interviewCount;
  rejectedCountEl.textContent = rejectedCount;

  // 3. Filter jobs based on active tab
  const filteredJobs = getFilteredJobs();

  // 4. Update tab-wise jobs count text
  if (currentTab === 'all') {
    availableJobsCountEl.textContent = `${totalCount} ${totalCount === 1 ? 'job' : 'jobs'}`;
  } else {
    availableJobsCountEl.textContent = `${filteredJobs.length} of ${totalCount} ${totalCount === 1 ? 'job' : 'jobs'}`;
  }

  // 5. Render job cards or empty state
  if (filteredJobs.length === 0) {
    jobsContainer.innerHTML = '';
    jobsContainer.classList.add('hidden');
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
    jobsContainer.classList.remove('hidden');
    jobsContainer.innerHTML = filteredJobs.map(job => createJobCardHTML(job)).join('');
  }
}

/**
 * Handle job status toggling (Interview / Rejected / Not Applied)
 */
function handleStatusToggle(jobId, targetStatus) {
  const job = jobs.find(j => j.id === jobId);
  if (!job) return;

  // Toggle behavior: if already in the target status, revert to 'Not Applied'
  if (job.status === targetStatus) {
    job.status = 'Not Applied';
  } else {
    job.status = targetStatus;
  }

  render();
}

/**
 * Handle job deletion
 */
function handleDeleteJob(jobId) {
  jobs = jobs.filter(j => j.id !== jobId);
  render();
}
