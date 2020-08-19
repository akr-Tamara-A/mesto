
export default class UserInfo {
  constructor(selectors) {
    this._userNameSelector = selectors.userName;
    this._userJobSelector = selectors.userJob;
    this._userAvatarSelector = selectors.userAvatar;
    this._userName = document.querySelector(this._userNameSelector);
    this._userJob = document.querySelector(this._userJobSelector);
    this._userAvatar = document.querySelector(this._userAvatarSelector);
  }

  /** Получение данных пользователя */
  getUserInfo() {
    return {
      userName: this._userName.textContent, 
      userJob: this._userJob.textContent,
      userAvatar: this._userAvatar.src
    };
  }
  
  /** Добавление данных пользователя на страницу */
  setUserInfo({userName, userJob}) {
    this._userName.textContent = userName;
    this._userJob.textContent = userJob;
  }

  
  setUserAvatar({userAvatar}) {
    this._userAvatar.src = userAvatar;
  }
}