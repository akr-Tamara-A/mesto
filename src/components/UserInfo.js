
export default class UserInfo {
  constructor(data) {
    this._userNameSelector = data.userName
    this._userJobSelector = data.userJob
  }

  getUserInfo() {
    const userName = document.querySelector(this._userNameSelector).textContent;
    const userJob = document.querySelector(this._userJobSelector).textContent;
    const userInfo = {userName, userJob};
    return userInfo;
  }
  
  setUserInfo(formData) {
    document.querySelector(this._userNameSelector).textContent = formData.editProfileUserName;
    document.querySelector(this._userJobSelector).textContent = formData.editProfileUserJob;
  }
}