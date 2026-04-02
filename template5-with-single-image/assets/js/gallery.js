export function gallery(){
   // Initialise Fancybox lightbox

  Fancybox.bind('[data-fancybox="gallery"]', {
    animated: true,
    infinite: true,          // loop through images
    keyboard: {
      Escape:     'close',
      ArrowLeft:  'prev',
      ArrowRight: 'next',
    },
    Toolbar: {
      display: {
        left:   ['infobar'],
        middle: [],
        right:  ['zoomIn', 'zoomOut', 'close'],
      },
    },
    Images: {
      zoom: true,
      Panzoom: { maxScale: 4 },
    },
  });

}