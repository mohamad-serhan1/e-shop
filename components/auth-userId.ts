import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  userId: string;
  setIsAuthenticated: (isAuth: boolean) => void;
  setUserId: (id: string) => void;

}

export const useAuthStore = create<AuthState>()( //When using zustand with TypeScript, you should use the curried version of create<T>(...) as stated in the first paragraph of the docs.
  persist( //af
    (set) => (
      {
        isAuthenticated: false,
        userId: "",
        setIsAuthenticated: (isAuth: boolean) => set((state) => ({ ...state, isAuthenticated: isAuth })),
        setUserId: (id: string) => set((state) => ({ ...state, userId: id })),
      }
    ),
    {
      name: 'authStore' // Name for identifying the store in localStorage
    }
  )
);