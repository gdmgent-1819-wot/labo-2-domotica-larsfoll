const db = firebase.database();
const domoticaWrapper = document.getElementById('domotica-wrapper');
const homeRef = db.ref('homes/').limitToFirst(1);

const setColors = () => {
  homeRef.on('value', async data => {
    const { home } = await data.val();
    let homeArray = await home.map((rgbArray, i) => {
      i++;
      let rgbValue = rgbArray.map((color, i) => i === 0 ? `rgb(${color}` : (i === 1 ? `${color}` : `${color})`));
      rgbValue = rgbValue.join();
      let cell = document.getElementById(i);
      cell.style.backgroundColor = rgbValue;
    });
  });
}

const clickableGrid = (rows, cols) => {
  let i = 1;
  const lightsArray = [3, 6, 35, 38];
  const outletsArray = [25, 32, 60, 61];
  const frontDoorArray = [41, 49, 57];
  const backDoorArray = [48, 56, 64];
  const grid = document.createElement('table');
  grid.className = 'grid';
  for (let r = 0; r < rows; ++r) {
    const tr = grid.appendChild(document.createElement('tr'));
    for (let c = 0; c < cols; ++c) {
      const cell = tr.appendChild(document.createElement('td'));
      cell.setAttribute('id', i);
      ++i;
      cell.addEventListener('click', ((el, r, c, i) => {
        return () => {
          const tempIndex = i - 1;
          console.log(tempIndex);
          if (lightsArray.includes(tempIndex)) {
            el.classList.toggle('light-off');
          } else if (outletsArray.includes(tempIndex)) {
            el.classList.toggle('outlet-off');
          } else if (frontDoorArray.includes(tempIndex)) {
            frontDoorArray.forEach(id => {
              document.getElementById(id).classList.toggle('closed-door');
            });
          } else if (backDoorArray.includes(tempIndex)) {
            backDoorArray.forEach(id => {
              document.getElementById(id).classList.toggle('open-door');
            });
          }
          // setColor(i);
        }
      })(cell, r, c, i), false);
    }
  }
  return grid;
}

const setColor = (index) => {
  colorsArray[index-1] = rgb;
  db.ref('characters/').set({character: colorsArray});
}

const grid = clickableGrid(8, 8);
setColors();
domoticaWrapper.appendChild(grid);
