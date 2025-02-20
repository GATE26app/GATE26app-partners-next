import { create } from 'zustand';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface userInfoType {
  accessToken?: string;
  refreshToken?: string;
  sendBirdToken?: string;
  fcmToken?: string;
  userId?: string;
}

interface UserInfoState {
  userZuInfo: userInfoType;
  setUserZuInfo: (userZuInfo: userInfoType) => void;
  deleteUserZuInfo: () => void;
}

const defaultState = {
  accessToken: '',
  refreshToken: '',
  sendBirdToken: '',
  fcmToken: '',
  userId: '',
};

export const useUserZuInfo = create(
  persist<UserInfoState>(
    (set) => ({
      userZuInfo: defaultState,
      setUserZuInfo: (userZuInfo: userInfoType) => {
        set({ userZuInfo });
      },
      deleteUserZuInfo: () => {
        set({ userZuInfo: defaultState });
      },
    }),
    {
      name: 'gate26',
      storage: createJSONStorage(() => localStorage),
      // storage: typeof window !== "undefined" ? window.localStorage : dummyStorageApi,
    },
  ),
);
