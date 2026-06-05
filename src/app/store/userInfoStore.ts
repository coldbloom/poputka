import { create } from 'zustand';

type UserInfo = {
  id: number;
  login: string;
  name: string;
  phone: null | string;
  birthDate: null | string;
  avatarPath: null | string;
};

interface UserInfoStore {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
  updateUserInfo: <K extends keyof UserInfo>(key: K, value: UserInfo[K]) => void;
}

export const useUserInfoStore = create<UserInfoStore>((set, get) => ({
  userInfo: null,

  // Полная замена userInfo
  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),

  // Частичное обновление конкретного поля
  updateUserInfo: (key, value) => {
    const { userInfo } = get();
    if (userInfo) {
      set({
        userInfo: {
          ...userInfo,
          [key]: value
        }
      });
    } else {
      console.warn(`Cannot update ${key.toString()}: userInfo is null`);
    }
  },
}));