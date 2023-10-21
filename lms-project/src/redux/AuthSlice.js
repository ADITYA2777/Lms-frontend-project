// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";
// import AxiosInstance from "../Helpers/AxiosInstance";
// import { json } from "react-router-dom";

// const initialState = {
//     isloggedIn:localStorage.getItem('isloggedIn') || false,
//     role: localStorage.getItem('role') || "",
//     date:localStorage.getItem('date')|| {}
// }
// export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
//   try {
//     const res = AxiosInstance.post("user/register", data)
//     toast.promise(res, {
//       loading: "wait!  creating your account",
//       success: (data) => {
//         return data?.data?.message;
//       },
//       error: "Failed to create  account"
//     });
//     return (await res).data;
//   } catch (error) {
//     toast.error(error?.response?.data?.message)
//   }
// })

// export const login = createAsyncThunk("/auth/login", async (data) => {
//   try {
//     const res = AxiosInstance.post("user/login", data)
//     toast.promise(res, {
//       loading: "wait! authentication in progress ....",
//       success: (data) => {
//         return data?.data?.message;
//       },
//       error: "Failed to log in ..."
//     });
//     return (await res).data;
//   } catch (error) {
//     toast.error(error?.response?.data?.message)
//   }
// })
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(login.fulfilled, (state, action) => {
//       console.log(action);
//       localStorage.setItem("data", json.stringify(action?.payload?.user))
//       localStorage.setItem("isLoggedIn", true);
//       localStorage.setItem("role", action?.payload?.user?.role);
//       state.isloggedIn = true
//       state.date = action?.payload?.user;
//       state.role = action?.payload?.user?.role
//     })
//   }
// });
//     // export const {} = authSlice.actions
// export default authSlice.reducer;

//
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import AxiosInstance from "../Helpers/AxiosInstance";
import { flushSync } from "react-dom";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role") || "",
  date: JSON.parse(localStorage.getItem("date")) || {}, // Parse the JSON string
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = await AxiosInstance.post("user/register", data);
    toast.promise(res, {
      loading: "Wait! Creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account",
    });
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
     

export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = await AxiosInstance.post("user/login", data);
    toast.promise(res, {
      loading: "Wait! Authentication in progress...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to log in...",
    });
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const logout = createAsyncThunk("auth/logout",async()=>{
  try {
     const res = await AxiosInstance.post("user/logout");
     toast.promise(res, {
       loading: "Wait! logout in progress...",
       success: (data) => {
         return data?.data?.message;
       },
       error: "Failed to logeed in...",
     });
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
})
 

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log(action);
      localStorage.setItem("data", JSON.stringify(action?.payload?.user));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", action?.payload?.user?.role);
      state.isLoggedIn = true;
      state.date = action?.payload?.user;
      state.role = action?.payload?.user?.role;
    })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear(),
          state.data = {};
        state.isLoggedIn = false,
          state.role = "";
    })
  },
});

export default authSlice.reducer;
