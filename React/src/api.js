import Axios from "axios";
import Cookies from 'js-cookie';
// ----------------------------------------------------------------
// Base URL Server
const baseURL = 'http://localhost/api';
// ----------------------------------------------------------------

// ====================== Authentication Apis ======================
// Variables path
const signup = "/userLoginApis/registerUser";
const resendOTPForEmailVerification = "/userLoginApis/emailVerificationUser";
const emailVerificationCompletion = "/userLoginApis/emailVerificationCompletion";
const login = "/userLoginApis/loginUser";
const loggedInUpdateUser = "/userLoginApis/loggedInUpdateUser";
const changePasswordUser = "/userLoginApis/changePasswordUser";
const ViewUserProfile = "/userLoginApis/ViewUserProfile";
const logoutUser = "/userLoginApis/logoutUser";
const forgetPasswordUser = "/userLoginApis/forgetPasswordUser";
const forgetPasswordUserChanged = "/userLoginApis/forgetPasswordUserChanged";

const generateToken = "/userLoginApis/generateToken/";
const refreshToken = "/userLoginApis/refreshToken/";

// Export Function 
export const signupAPI = () => `${baseURL}${signup}`;
export const resendOTPForEmailVerificationAPI = () => `${baseURL}${resendOTPForEmailVerification}`;
export const emailVerificationCompletionAPI = () => `${baseURL}${emailVerificationCompletion}`;
export const loginAPI = () => `${baseURL}${login}`;
export const loggedInUpdateUserAPI = () => `${baseURL}${loggedInUpdateUser}`;
export const changePasswordUserAPI = () => `${baseURL}${changePasswordUser}`;
export const UserEditProfileAPI = () => `${baseURL}${UserEditProfile}`;
export const ViewUserProfileAPI = () => `${baseURL}${ViewUserProfile}`;
export const logoutUserAPI = () => `${baseURL}${logoutUser}`;
export const forgetPasswordUserAPI = () => `${baseURL}${forgetPasswordUser}`;
export const forgetPasswordUserChangedAPI = () => `${baseURL}${forgetPasswordUserChanged}`;

export const generateTokenAPI = () => `${baseURL}${generateToken}`;
export const refreshTokenAPI = () => `${baseURL}${refreshToken}`;


// ====================== Job Position Apis ======================
// Variables path
const jobPositionGet = "/databaseApis/jobPositionGet";

// Export Function 
export const jobPositionGetAPI = () => `${baseURL}${jobPositionGet}`;


// ====================== Job Level Apis ======================
// Variables path
const jobLevelGet = "/databaseApis/jobLevelGet";

// Export Function 
export const jobLevelGetAPI = () => `${baseURL}${jobLevelGet}`;


// ====================== Job Description Apis ======================
// Variables path
const jobDescriptionRegister = "/recruiterAPIs/jobDescriptionRegister";
const jobDescriptionGetAll = "/recruiterAPIs/jobDescriptionGet";
const jobDescriptionGetOne = "/recruiterAPIs/jobDescriptionGetOne";
const jobDescriptionGetUser = "/recruiterAPIs/jobDescriptionGetUser";
const jobDescriptionUpdate = "/recruiterAPIs/jobDescriptionUpdate";
const jobDescriptionDelete = "/recruiterAPIs/jobDescriptionDelete";

// Export Function 
export const jobDescriptionRegisterAPI = () => `${baseURL}${jobDescriptionRegister}`;
export const jobDescriptionGetAllAPI = () => `${baseURL}${jobDescriptionGetAll}`;
export const jobDescriptionGetOneAPI = () => `${baseURL}${jobDescriptionGetOne}`;
export const jobDescriptionGetUserAPI = () => `${baseURL}${jobDescriptionGetUser}`;
export const jobDescriptionUpdateAPI = () => `${baseURL}${jobDescriptionUpdate}`;
export const jobDescriptionDeleteAPI = () => `${baseURL}${jobDescriptionDelete}`;


// ====================== Bulk resume Apis ======================
// Variables path
const bulkResumeAnalysis = "/recruiterAPIs/RecruiterBulkResumeAnalysis";

// Export Function 
export const bulkResumeAnalysisAPI = () => `${baseURL}${bulkResumeAnalysis}`;


// ----------------------------------------------------------------

// FetchAPI with CSRF token included
export const FetchAPI = async (apiLink, fetchType, sentData) => {
  const csrfToken = Cookies.get('csrftoken');

  const res = await Axios({
    url: apiLink,
    method: fetchType,
    data: sentData,
    headers: {
      'X-CSRFToken': csrfToken,
    },
    withCredentials: true,
  }).then((response) => response)
    .catch((err) => err.response);

  const data = await res?.data;

  return { res, data };
};

// TokenbasedAPI with CSRF and JWT token included
export const TokenbasedAPI = async (apiLink, fetchType, sentData) => {
  const refreshToken = localStorage.getItem("refreshToken");

  let newAccessToken;
  if (refreshToken) {
    const response = await Axios.post(refreshTokenAPI(), { "refresh": refreshToken });

    if (response?.status === 200) {
      newAccessToken = response.data.access;
      // localStorage.setItem("accessToken", newAccessToken);
    } else {
      throw new Error("Token refresh failed");
    }
  } else {
    throw new Error("No refresh token found");
  }

  // Get CSRF token from cookies
  const csrfToken = Cookies.get('csrftoken');

  const res = await Axios({
    url: apiLink,
    method: fetchType,
    data: sentData,
    headers: {
      'Authorization': `Bearer ${newAccessToken}`,
      'X-CSRFToken': csrfToken,
    },
    withCredentials: true,
  }).then((response) => response)
    .catch((err) => err.response);

  const data = await res?.data;

  return { res, data };
} 
