//Drag & Drop
const draggables = document.querySelectorAll(".card_task_draggable");
const cards = document.querySelectorAll(".card");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

cards.forEach((card) => {
  card.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElem = placeDrag(card, e.clientY);
    const draggable = document.querySelector(".dragging");
    // console.log(afterElem);
    if (afterElem == null) {
      card.appendChild(draggable);
    } else {
      card.insertBefore(draggable, afterElem);
    }
  });
});

const placeDrag = (card, mouseY) => {
  const draggableElements = [
    ...card.querySelectorAll(".card_task_draggable:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = mouseY - box.top - box.height / 2;
      //   console.log(offset);
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};
