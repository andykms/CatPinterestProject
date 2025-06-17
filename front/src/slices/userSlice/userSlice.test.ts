import { registerUserAction } from "../../actions/ApiActions";
import { registerUserApi } from "../../utils/CatApi";
import { configureStore } from "@reduxjs/toolkit";
import { TUser } from "../../types/TUser";
import { userReducer } from "./userSlice";

const mockUser: TUser = {
  login: 'Tralavelo Tralala',
}

jest.mock("../../utils/CatApi");

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

describe("Тест стейта пользователя", () => {
  it("Регистрация пользователя", async () => {
    const store = configureStore({
      reducer: {
        user: userReducer,
      },
    });
    (registerUserApi as jest.Mock).mockImplementation(
          () =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve(mockUser);
              }, 1000);
            })
        );
    const action = store.dispatch(registerUserAction({login: mockUser.login, password: '123456'}));

    expect(store.getState().user.isLoading).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().user.isLoading).toBe(true);

    jest.advanceTimersByTime(500);

    await action;

    expect(store.getState().user.isLoading).toBe(false);

    expect(store.getState().user.user).toEqual(mockUser);
    expect(store.getState().user.error).toBe('');
  });
});
