import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
  } from '@reduxjs/toolkit'
  import axios from 'axios';

  export const authenticator = createAsyncThunk(
    'restaurant/signin',
    async (values) => {
        console.log(values);
        //Instead of get restaurants we will authenticate here
        //We can have axios calls in one file like we did.
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:5000/restaurant/signin',
            data:{
                email: values.email,
                password: values.password,
            }
          }).then((response)=>{
            console.log(response);
            localStorage.setItem("authToken", response.data.accessToken)
            return(response);

        }).catch((err)=>{
            console.log(err)
          })

          console.log(response);
        
    }
)


  const signinSlice = createSlice({
      name: 'signin',
      initialState: {
          email: '',
          password: '',
          isAuthenticated: false,
          //rest_Object = {}
      },
      reducers: {
          signin: (state, action) => {
            //Set the store variables here
            // console.log('Function Called')
            // console.log(payload);
            // const email = payload.email;
            // const password = payload.password;
            // console.log(email, password);
            console.log(action.payload);
          },
      },
      extraReducers:{
          [authenticator.fulfilled]: (state, action) => {
              console.log(action);
              state.email = action.meta.arg.email;
              state.password = action.meta.arg.password;
              state.isAuthenticated = true;
              console.log(state);
          },
      }
})



export const {signin} = signinSlice.actions;
export default signinSlice.reducer;