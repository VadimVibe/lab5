let hiddenShapes = [];

$(function() {
  const shapes = [
    {name: 'Окружность', color: 'red', type: 'circle', id: 'shape1'},
    {name: 'Квадрат', color: 'blue', type: 'square', id: 'shape2'},
    {name: 'Треугольник', color: 'green', type: 'triangle', id: 'shape3'},
    {name: 'Окружность', color: 'yellow', type: 'circle', id: 'shape4'},
    {name: 'Квадрат', color: 'purple', type: 'square', id: 'shape5'}
  ];
  
  /** Функция добавляет фигуры на HTML страницу
   * 
   * @param {object} shape
   * @returns {undefined}
   */
  function createShape(shape) {
    const $FIGURE = $('<div>')
      .attr('id', shape.id)
      .attr('name', shape.name)
      .attr('color', shape.color)
      .css({
        width: '50px',
        height: '50px',
        backgroundColor: shape.color,
        position: 'absolute',
        borderRadius: shape.type === 'circle' ? '50%' : '0'
      });
    $FIGURE.addClass(shape.type);

    const FIGURE_WIDTH = $('#figure').width();
    const FIGURE_HEIGHT = $('#figure').height();
    const LEFT = Math.random() * (FIGURE_WIDTH - 50);
    const TOP = Math.random() * (FIGURE_HEIGHT - 50);
    $FIGURE.css({left: LEFT + 'px', top: TOP + 'px'});

    $('#figure').append($FIGURE);
    animateFigure($FIGURE);
  }
  
  /** Создаёт анимацию для фигуры
   * 
   * @param {object} $FIGURE
   * @returns {undefined}
   */
  function animateFigure($FIGURE) {
    setInterval(() => {
      const FIGURE_WIDTH = $('#figure').width();
      const FIGURE_HEIGHT = $('#figure').height();
      const NEW_LEFT = Math.random() * (FIGURE_WIDTH - 50);
      const NEW_TOP = Math.random() * (FIGURE_HEIGHT - 50);
      $FIGURE.animate({left: NEW_LEFT + 'px', top: NEW_TOP + 'px'}, 2000);
    }, 3000);
  }

  shapes.forEach(createShape);

  $('#figure').on('click', 'div', function() {
    const $FIGURE = $(this);
    const FIGURE_NAME = $FIGURE.attr('name');
    const FIGURE_ID = $FIGURE.attr('id');
    const FIGURE_COLOR = $FIGURE.attr('color');
    const FIGURE_TYPE = $FIGURE.attr('class');

    $FIGURE.hide();

    hiddenShapes.push({
      name: FIGURE_NAME,
      id: FIGURE_ID,
      type: FIGURE_TYPE,
      color: FIGURE_COLOR
    });

    updateInfoList();
  });
});

/** Функция updateInfoList обновляет информацию о 
 * скрытых фигурах на html странице
 * 
 * @returns {undefined}
 */
function updateInfoList() {
  let listHtml = '<h3>Список скрытых фигур:</h3><ul>';
  hiddenShapes.forEach(shape => {
    listHtml += `
      <li>
        Фигура: ${shape.name}, цвет: ${shape.color}
        <button onclick="showFigure('${shape.id}')">Показать снова</button>
      </li>
    `;
  });
  listHtml += '</ul>';

  $('#info').html(listHtml);
}

/** Показывает скрытую фигуру и обновляет список скрытых фигур
 * 
 * @param {type} ID
 * @returns {undefined}
 */
function showFigure(ID) {
  const $FIGURE = $(`#${ID}`);
  $FIGURE.show();

  hiddenShapes = hiddenShapes.filter(shape => shape.id !== ID);

  updateInfoList();
}
