import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const toastConfig = {
  position: "bottom-center",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};
export const errorToast = (message) => toast.error(message, toastConfig);
export const successToast = (message) => toast.success(message, toastConfig);

export const getRecruiterID = () => localStorage.getItem('recruiterID');

const Slice = createSlice({
  name: "hires",
  initialState: {
    activeTab: 'viewAll',
    inputSearch: '',
    mediaBaseURL: `http://localhost/api/media/`,
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setInputSearch: (state, action) => {
      state.inputSearch = action.payload;
    },
    setClearInputSearch: (state, action) => {
      state.inputSearch = '';
    },
  },
});

export const { setActiveTab, setInputSearch, setClearInputSearch} = Slice.actions;
export default Slice.reducer;
