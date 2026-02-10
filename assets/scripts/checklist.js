const STORAGE_KEY = `viceclub_checklist_${location.pathname}`;

function loadChecked() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}

function saveChecked(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function updateProgress() {
  const all = document.querySelectorAll(".checklist-cb");
  const done = document.querySelectorAll(".checklist-cb:checked");
  const total = all.length;
  const count = done.length;
  const pct = total ? Math.round((count / total) * 100) : 0;

  const fill = document.getElementById("progressFill");
  const pctEl = document.getElementById("progressPct");
  const countEl = document.getElementById("progressCount");

  if (fill) fill.style.width = pct + "%";
  if (pctEl) pctEl.textContent = pct + "%";
  if (countEl) countEl.textContent = `${count} / ${total}`;
}

function updateSectionProgress(article) {
  const all = article.querySelectorAll(".checklist-cb");
  const done = article.querySelectorAll(".checklist-cb:checked");
  const badge = article.querySelector(".section-badge");
  const checkAllBtn = article.querySelector(".section-check-all");

  if (badge) {
    badge.textContent = `${done.length} / ${all.length}`;
  }

  if (checkAllBtn) {
    const complete = all.length > 0 && done.length === all.length;
    checkAllBtn.classList.toggle("complete", complete);
  }
}


function buildProgressBar() {
  const pctEl = document.querySelector(".checklist-percentage");
  if (!pctEl) return;

  const total = document.querySelectorAll(".checklist-cb").length;

  pctEl.innerHTML = `
    <div class="progress-wrapper">
      <div class="progress-label">
        <span class="progress-text">Progreso total</span>
        <span class="progress-count" id="progressCount">0 / ${total}</span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" id="progressFill" style="width:0%"></div>
      </div>
      <span class="progress-pct" id="progressPct">0%</span>
    </div>`;
}

function initSections() {
  document.querySelectorAll(".checklist-container article").forEach(article => {
    const h3 = article.querySelector("h3");
    const ul = article.querySelector("ul.checklist-list");
    if (!h3 || !ul) return;

    const controls = document.createElement("div");
    controls.className = "section-controls";
    controls.innerHTML = `
      <span class="section-badge">0 / 0</span>
      <button class="section-check-all" title="Marcar / desmarcar todas">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
      </button>
      <span class="section-arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </span>`;

    h3.appendChild(controls);
    h3.classList.add("section-header");
    h3.setAttribute("role", "button");
    h3.setAttribute("tabindex", "0");
    h3.setAttribute("aria-expanded", "false");

    const wrapper = document.createElement("div");
    wrapper.className = "checklist-list-wrapper section-collapsed";
    ul.parentNode.insertBefore(wrapper, ul);
    wrapper.appendChild(ul);

    h3.addEventListener("click", function (e) {
      if (e.target.closest(".section-check-all")) return;
      const isOpen = !wrapper.classList.contains("section-collapsed");
      wrapper.classList.toggle("section-collapsed", isOpen);
      h3.setAttribute("aria-expanded", String(!isOpen));
      h3.querySelector(".section-arrow").classList.toggle("open", !isOpen);
    });

    h3.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        h3.click();
      }
    });

    controls.querySelector(".section-check-all").addEventListener("click", function (e) {
      e.stopPropagation();
      const cbs = article.querySelectorAll(".checklist-cb");
      const allDone = [...cbs].every(cb => cb.checked);
      const checked = loadChecked();

      cbs.forEach(cb => {
        cb.checked = !allDone;
        const li = cb.closest(".checklist-item");
        if (li) {
          checked[li.dataset.id] = !allDone;
          li.classList.toggle("completed", !allDone);
        }
      });

      saveChecked(checked);
      updateSectionProgress(article);
      updateProgress();
    });

    updateSectionProgress(article);
  });
}

function initCheckboxes() {
  const checked = loadChecked();

  document.querySelectorAll(".checklist-item").forEach(li => {
    const id = li.dataset.id;
    const cb = li.querySelector(".checklist-cb");
    if (!cb || !id) return;

    if (checked[id]) {
      cb.checked = true;
      li.classList.add("completed");
    }

    cb.addEventListener("change", function () {
      const state = loadChecked();
      state[id] = this.checked;
      saveChecked(state);
      li.classList.toggle("completed", this.checked);

      const article = li.closest("article");
      if (article) updateSectionProgress(article);
      updateProgress();
    });
  });
}

function initItemDropdowns() {
  document.querySelectorAll(".checklist-item").forEach(li => {
    const row = li.querySelector(".checklist-row");
    const dropdown = li.querySelector(".checklist-dropdown");
    const btn = li.querySelector(".dropdown-toggle");
    if (!row || !dropdown || !btn) return;

    dropdown.classList.add("dropdown-collapsed");

    const toggle = () => {
      const isOpen = !dropdown.classList.contains("dropdown-collapsed");
      dropdown.classList.toggle("dropdown-collapsed", isOpen);
      btn.classList.toggle("open", !isOpen);
      row.setAttribute("aria-expanded", String(!isOpen));
    };

    btn.addEventListener("click", e => { e.stopPropagation(); toggle(); });
    row.querySelector(".checklist-info")?.addEventListener("click", toggle);
    row.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buildProgressBar();
  initSections();
  initCheckboxes();
  initItemDropdowns();

  document.querySelectorAll(".checklist-container article").forEach(article => {
    updateSectionProgress(article);
  });

  updateProgress();
});
