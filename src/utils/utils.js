

export function renderLoading (isLoading, button) {
  if (isLoading) {
    console.log(isLoading);
    button.textContent = 'Загружается...'
  } else {
    console.log(isLoading);
    button.textContent = 'Сохранить'
  }
}