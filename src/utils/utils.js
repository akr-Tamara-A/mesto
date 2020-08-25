
/** Уведомление пользователя о процессе загрузки */
export function renderLoading (isLoading, button) {
  if (isLoading) {
    button.value = 'Сохранение...'
  } else {
    button.value = 'Сохранить'
  }
}