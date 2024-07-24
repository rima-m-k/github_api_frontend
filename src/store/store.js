import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//store

const initialState = {
    username: "",
    user: null,
    followers: [],
    repos: [],
    currentRepo: null,
    isLoading: false,
    error: null
};

// create slice
const dataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        resetStore: () => initialState,
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        resetUsername: (state) => {
            state.username = "";
        },
        resetError: (state) => {
            state.error = null;
        },
        setCurrentRepo: (state, action) => {
            state.isLoading = true;
            if (state.repos) {
                state.currentRepo = state.repos.find(
                    (repo) => repo.name === action.payload
                );
            }
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserDataAPI.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserDataAPI.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.followers = action.payload.followers;
                state.repos = action.payload.repos;
                state.isLoading = false;
            })
            .addCase(getUserDataAPI.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message;
            });
    }
});

// export actions
export const { resetStore, setUsername, resetUsername, setCurrentRepo, resetError } = dataSlice.actions;

// async thunk for fetching data
export const getUserDataAPI = createAsyncThunk(
    "userData/getUserDataAPI",
    async (username, { rejectWithValue }) => {
        try {
            const user = await fetch(`https://api.github.com/users/${username}`)
                .then((res) => {
                    if (!res.ok) {
                        if (res.status === 404) throw new Error("User not found");
                        throw new Error(`Error fetching user data: ${res.statusText}`);

                    }
                    return res.json();
                })
            
            const repos = await fetch(`https://api.github.com/users/${username}/repos`)
            .then((res) => {
                if (!res.ok) {
                    if (res.status === 404) throw new Error("User not found");
                    throw new Error(`Error fetching user data: ${res.statusText}`);

                }
                return res.json();
            })            
            const followers = await fetch(`https://api.github.com/users/${username}/followers`)
            .then((res) => {
                if (!res.ok) {
                    if (res.status === 404) throw new Error("User not found");
                    throw new Error(`Error fetching user data: ${res.statusText}`);

                }
                return res.json();
            })

            return { user, repos, followers };
        } catch (error) {
            console.error("Error in getUserDataAPI:", error);
            return rejectWithValue(error);
        }
    }
);

// selectors
export const selectUserData = (state) => state.data.user;
export const selectUserLoading = (state) => state.data.isLoading;
export const selectRepos = (state) => state.data.repos;
export const selectFollowers = (state) => state.data.followers;
export const selectCurrentRepo = (state) => state.data.currentRepo;
export const selectUsername = (state) => state.data.username;
export const selectError = (state) => state.data.error;

// create redux store
export const store = configureStore({
    reducer: {
        data: dataSlice.reducer
    }
});
