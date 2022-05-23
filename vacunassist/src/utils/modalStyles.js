export const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgb(20, 20, 20, 0.75)',
    zIndex: '999',
  },
  content: {
    background: "url('./assets/wallpaper2.png') no-repeat center center fixed",
    zIndex: '999',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '95vw',
    height: '90vh',
    overflow: 'auto',
  },
}
