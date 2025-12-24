function getStorageKey(game, id) {
  return `${game}-${id}`;
}

function saveCheckboxState(game, id, checked) {
  localStorage.setItem(getStorageKey(game, id), checked);
}

function loadCheckboxStates(game) {
  document.querySelectorAll("input[type='checkbox']").forEach((cb) => {
    const savedState = localStorage.getItem(getStorageKey(game, cb.id));
    if (savedState !== null) {
      cb.checked = savedState === "true";
    }
  });
}

function updatePath(checkbox) {
  const label = checkbox.closest("label") || checkbox.parentElement;
  if (label) {
    label.classList.toggle("checked", checkbox.checked);
  }
}

function toggleDescendants(checkbox) {
  const parentLi = checkbox.closest("li");
  const descendants = parentLi.querySelectorAll("ul input[type='checkbox']");

  descendants.forEach((d) => {
    d.checked = checkbox.checked;
    saveCheckboxState(document.body.dataset.game, d.id, d.checked);
    updatePath(d);
  });
}

function updateParentCheckboxes(checkbox) {
  const parentUl = checkbox.closest("ul");
  if (!parentUl) return;

  const parentLi = parentUl.parentElement;
  if (!parentLi || !parentLi.matches("li")) return;

  const parentCheckbox = parentLi.querySelector("input[type='checkbox']");
  if (!parentCheckbox) return;

  const allSiblings = Array.from(
    parentUl.querySelectorAll("input[type='checkbox']")
  );
  const allChecked = allSiblings.every((sibling) => sibling.checked);

  parentCheckbox.checked = allChecked;
  saveCheckboxState(document.body.dataset.game, parentCheckbox.id, allChecked);

  updatePath(parentCheckbox);

  updateParentCheckboxes(parentCheckbox);
}

document.addEventListener("DOMContentLoaded", () => {
  const game = document.body.dataset.game;
  if (!game) return;

  loadCheckboxStates(game);

  document.querySelectorAll("input[type='checkbox']").forEach((cb) => {
    updatePath(cb);
  });

  document
    .querySelectorAll(".checklist input[type='checkbox']")
    .forEach((cb) => {
      cb.addEventListener("change", () => {
        saveCheckboxState(game, cb.id, cb.checked);
        updatePath(cb);
        toggleDescendants(cb);
        updateParentCheckboxes(cb);
      });
    });
});
function getStorageKey(game, id) {
  return `${game}-${id}`;
}

function saveCheckboxState(game, id, checked) {
  localStorage.setItem(getStorageKey(game, id), checked);
}

function loadCheckboxStates(game) {
  document.querySelectorAll("input[type='checkbox']").forEach((cb) => {
    const savedState = localStorage.getItem(getStorageKey(game, cb.id));
    if (savedState !== null) {
      cb.checked = savedState === "true";
    }
  });
}

function updatePath(checkbox) {
  const label = checkbox.closest("label") || checkbox.parentElement;
  if (label) {
    label.classList.toggle("checked", checkbox.checked);
  }
}

function toggleDescendants(checkbox) {
  const parentLi = checkbox.closest("li");
  const descendants = parentLi.querySelectorAll("ul input[type='checkbox']");

  descendants.forEach((d) => {
    d.checked = checkbox.checked;
    saveCheckboxState(document.body.dataset.game, d.id, d.checked);
    updatePath(d);
  });
}

function updateParentCheckboxes(checkbox) {
  const parentUl = checkbox.closest("ul");
  if (!parentUl) return;

  const parentLi = parentUl.parentElement;
  if (!parentLi || !parentLi.matches("li")) return;

  const parentCheckbox = parentLi.querySelector("input[type='checkbox']");
  if (!parentCheckbox) return;

  const allSiblings = Array.from(
    parentUl.querySelectorAll("input[type='checkbox']")
  );
  const allChecked = allSiblings.every((sibling) => sibling.checked);

  parentCheckbox.checked = allChecked;
  saveCheckboxState(document.body.dataset.game, parentCheckbox.id, allChecked);

  updatePath(parentCheckbox);

  updateParentCheckboxes(parentCheckbox);
}

document.addEventListener("DOMContentLoaded", () => {
  const game = document.body.dataset.game;
  if (!game) return;

  loadCheckboxStates(game);

  document.querySelectorAll("input[type='checkbox']").forEach((cb) => {
    updatePath(cb);
  });

  document
    .querySelectorAll(".checklist input[type='checkbox']")
    .forEach((cb) => {
      cb.addEventListener("change", () => {
        saveCheckboxState(game, cb.id, cb.checked);

        updatePath(cb);

        toggleDescendants(cb);

        updateParentCheckboxes(cb);
      });
    });
});
