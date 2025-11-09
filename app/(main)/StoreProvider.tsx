'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore, PersistedStoreStore } from "../../lib/redux/store"
import { PersistGate } from 'redux-persist/es/integration/react'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const {store , persistedStore} = makeStore()
  const storeRef = useRef<AppStore>(undefined)
  const persistedStoreRef = useRef<PersistedStoreStore>(undefined)
  
  if(!persistedStoreRef.current){
    persistedStoreRef.current = persistedStore
  }
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store
  }

  return <Provider store={storeRef.current}>
    <PersistGate loading={null} persistor={persistedStore}>
    {children}
    </PersistGate>
    </Provider>
}