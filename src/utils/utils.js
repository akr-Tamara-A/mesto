/** Уведомление пользователя о процессе загрузки */
export function renderLoading(isLoading, button) {
  if (isLoading) {
    button.value = "Сохранение...";
  } else {
    button.value = "Сохранить";
  }
}

/** Уведомление пользователя о процессе удаления */
export function renderDeletion(isLoading, button) {
  if (isLoading) {
    button.value = "Удаление...";
  } else {
    button.value = "Да";
  }
}

  /** Установка начальных значений инпутов формы */
  export function setInitialInputValues(initialData, selectors, popupSelector) {
    const popup = document.querySelector(popupSelector);
    popup.querySelector(selectors.userName).value = initialData.name;
    popup.querySelector(selectors.userJob).value = initialData.about;
  }