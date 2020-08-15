
export default class UserInfo {
  constructor(selectors) {
    this._userNameSelector = selectors.userName;
    this._userJobSelector = selectors.userJob;
    this._userName = document.querySelector(this._userNameSelector);
    this._userJob = document.querySelector(this._userJobSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent, 
      userJob: this._userJob.textContent
    };
  }
  
  setUserInfo({userName, userJob}) {
    this._userName.textContent = userName;
    this._userJob.textContent = userJob;
  }
}