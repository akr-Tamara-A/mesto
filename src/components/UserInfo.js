export default class UserInfo {
  constructor(selectors, { data }) {
    this._userNameSelector = selectors.userName;
    this._userJobSelector = selectors.userJob;
    this._userAvatarSelector = selectors.userAvatar;

    this._userName = document.querySelector(this._userNameSelector);
    this._userJob = document.querySelector(this._userJobSelector);
    this._userAvatar = document.querySelector(this._userAvatarSelector);

    this._user = data;
  }

  /** Получение данных пользователя */
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userJob.textContent,
    };
  }

  /** Добавление данных пользователя на страницу */
  setUserInfo(userName, userJob) {
    this._userName.textContent = userName;
    this._userJob.textContent = userJob;
  }

  /** Добавление аватара на страницу */
  setUserAvatar(userAvatar) {
    this._userAvatar.src = userAvatar;
  }

  /**  */
  getUserID() {
    return this._user._id;
  }
}
