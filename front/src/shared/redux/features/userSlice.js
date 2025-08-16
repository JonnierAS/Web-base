import { getLocalService, removeLocalService } from "@/features/auth/services/local.service";
import { http } from "@/shared/services/api";
import { getAllUsers } from "@/shared/services/dashboardServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_profile: null,
  users_all: null,
};

export const 
getUserInfo = createAsyncThunk(
  "user_slice/getUserInfo",
  async () => {
    try {
      
      const { access_token } = getLocalService()
      if(!access_token) return;
      
      const response = await http.get("/user/get-by-id", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      
  
      if(response.data.data.role === 'ADMIN') {
  
        const users_all = await getAllUsers()
  
        return {
          user: response.data.data,
          users_all: users_all.data.data
        };
      }else {
  
        return {
          user: response.data.data,
          users_all: null
        };
      }
      
    } catch (error) {
      removeLocalService()
      console.error("Error fetching info:", error);
      return null
    }
  },
)

export const user_slice = createSlice({
  name: "user_slice",
  initialState,
  reducers: {
    setUseProfile: (state, action) => {
      state.user_profile = action.payload;
    },
    addUsersDashboard: (state, action) => {
      state.users_all = [...state.users_all , action.payload];
    },
    updateUsersDashboard: (state, action) => {
      const filter_users = state.users_all.filter((user) => user.id !== action.payload.id);
      state.users_all = [...filter_users , action.payload.update_user];
    },
    deleteUsersDashboard: (state, action) => {      
      state.users_all = state.users_all.filter((user) => user.id !== action.payload);
    },
    removeUseProfile: (state, action) => {
      state.user_profile = null;
    },

  },  
  
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.fulfilled, (state, action) => {
        if(action.payload){
          state.user_profile = action.payload.user;
          state.users_all = action.payload.users_all;
        }
      })
  },
});


export const {
  setUseProfile,
  removeUseProfile,
  addUsersDashboard,
  updateUsersDashboard,
  deleteUsersDashboard,
} = user_slice.actions;

export default user_slice.reducer;