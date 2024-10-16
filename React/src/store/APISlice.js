import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  FetchAPI,
  jobDescriptionGetUserAPI,
  jobLevelGetAPI,
  jobPositionGetAPI,
  TokenbasedAPI,
  ViewUserProfileAPI,
} from "../api";
import { getRecruiterID } from "./Slice";

// const recruiterID = localStorage.getItem("recruiterID");

// fetching user profile
export const getUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, thunkAPI) => {
    const recruiterID = getRecruiterID();
    if (!recruiterID) {
      return thunkAPI.rejectWithValue({ error: 'No recruiterID found' });
    }
    try {
      const { data } = await TokenbasedAPI(ViewUserProfileAPI(), "POST", {
        user_id: recruiterID,
      });
      return data.Data.userDetails;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// fetching Job Level
export const getJobLevel = createAsyncThunk(
  "jobLevel/fetchJobLevel",
  async (_, thunkAPI) => {
    try {
      const { data } = await TokenbasedAPI(jobLevelGetAPI(), "GET");
      return data.Data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// fetching Job Position
export const getJobPosition = createAsyncThunk(
  "jobPosition/fetchJobPosition",
  async (_, thunkAPI) => {
    try {
      const { data } = await TokenbasedAPI(jobPositionGetAPI(), "GET");
      return data.Data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// fetching Job Post
export const getJobPost = createAsyncThunk(
  "jobPost/fetchJobPost",
  async (_, thunkAPI) => {
    const recruiterID = getRecruiterID();
    if (!recruiterID) {
      return thunkAPI.rejectWithValue({ error: 'No recruiterID found' });
    }
    try {
      const { data } = await TokenbasedAPI(jobDescriptionGetUserAPI(), "POST", {
        user_id: recruiterID,
        job_description_action: "active",
      });
      return data.Data.JobDescriptionDetail;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const APISlice = createSlice({
  name: "APISlice",
  initialState: {
    userData: {},
    jobLevelData: [],
    jobPositionData: [],
    jobPostData: [],
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getUserProfile
      .addCase(getUserProfile.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = "idle";
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload.error;
      })

      // getJobLevel
      .addCase(getJobLevel.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getJobLevel.fulfilled, (state, action) => {
        state.jobLevelData = action.payload;
        state.loading = "idle";
      })
      .addCase(getJobLevel.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload.error;
      })

      // getJobPosition
      .addCase(getJobPosition.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getJobPosition.fulfilled, (state, action) => {
        state.jobPositionData = action.payload;
        state.loading = "idle";
      })
      .addCase(getJobPosition.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload.error;
      })

      // getJobPost
      .addCase(getJobPost.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getJobPost.fulfilled, (state, action) => {
        state.jobPostData = action.payload;
        state.loading = "idle";
      })
      .addCase(getJobPost.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload.error;
      });
  },
});

export const {} = APISlice.actions;
export default APISlice.reducer;
