let id = parseInt(window.localStorage.getItem('ID') || '0');

const idCreator = () => {
  id += 1;
  window.localStorage.setItem('ID', JSON.stringify(id));
  return id;
};

export default idCreator;