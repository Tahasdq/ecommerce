import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cartSlice'
import sessionStorage  from 'redux-persist/lib/storage/session';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";


const persistConfig = {
  key: "root",
  storage :sessionStorage ,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);


export const makeStore = () => {
 const store =  configureStore({
    reducer: {
        cartReducer : persistedReducer 
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
  const persistedStore =  persistStore(store)
  return {store ,persistedStore}
  
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>['store']
export type PersistedStoreStore = ReturnType<typeof makeStore>['persistedStore']
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']