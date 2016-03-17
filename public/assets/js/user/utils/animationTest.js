
export default function animationTest(board) {
  let element;
  for (let i = 0; i < board.grid.elements.length; i++) {
    element = board.grid.elements[i];
    if (Math.random() < 0.5) {
      board.activeEls.push(element);
    } else {
      // console.log('don\'t make active');
    }
  }

  board.turn();
}