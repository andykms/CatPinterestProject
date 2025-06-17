import { favouriteReducer } from "./favouriteSlice";
import { IFavourite, TFavourites } from "../../types/TFavourite";
import { configureStore } from "@reduxjs/toolkit";
import { getLikesApi } from "../../utils/CatApi";
import { getLikesAction } from "../../actions/ApiActions";
import { addLikeApi } from "../../utils/CatApi";
import { addLikeAction } from "../../actions/ApiActions";
import { deleteLikeAction } from "../../actions/ApiActions";
import { deleteLikeApi } from "../../utils/CatApi";

const mockLikes: TFavourites = {
  data: [
    {
      cat_id: "1",
      created_at: "2020-01-01T00:00:00.000Z",
    },
    {
      cat_id: "2",
      created_at: "2020-01-02T00:00:00.000Z",
    },
    {
      cat_id: "3",
      created_at: "2020-01-03T00:00:00.000Z",
    },
    {
      cat_id: "4",
      created_at: "2020-01-04T00:00:00.000Z",
    },
    {
      cat_id: "5",
      created_at: "2020-01-05T00:00:00.000Z",
    },
    {
      cat_id: "6",
      created_at: "2020-01-06T00:00:00.000Z",
    },
    {
      cat_id: "7",
      created_at: "2020-01-07T00:00:00.000Z",
    },
    {
      cat_id: "8",
      created_at: "2020-01-08T00:00:00.000Z",
    },
    {
      cat_id: "9",
      created_at: "2020-01-09T00:00:00.000Z",
    },
    {
      cat_id: "10",
      created_at: "2020-01-10T00:00:00.000Z",
    },
  ],
};

const mockAddedLike: IFavourite = {
  cat_id: "obniotnbi334o34n",
  created_at: "2020-01-01T00:00:00.000Z",
};

const mockDeletedLikeId = "8";

jest.mock("../../utils/CatApi");

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

describe("Тест стейта любимых котов", () => {
  it("Получение списка айдишников любимых котов", async () => {
    const store = configureStore({
      reducer: {
        favourite: favouriteReducer,
      },
    });
    (getLikesApi as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(mockLikes);
          }, 1000);
        })
    );
    const action = store.dispatch(getLikesAction());

    //Проверяем, что isLoad сменился на true
    expect(store.getState().favourite.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().favourite.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    await action;

    expect(store.getState().favourite.isLoad).toBe(false);

    //Проверяем, что в стейте лежает те лайки, которые отправлял моковый API
    expect(store.getState().favourite.favourite).toEqual(mockLikes);

    //Проверяем, что в стейте нет ошибок
    expect(store.getState().favourite.error).toBe("");
  });

  it("Добавление лайка", async () => {
    const store = configureStore({
      reducer: {
        favourite: favouriteReducer,
      },
      preloadedState: {
        favourite: {
          favourite: mockLikes,
          favouriteCats: [],
          isLoad: false,
          error: "",
        },
      },
    });
    (addLikeApi as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(mockAddedLike);
          }, 1000);
        })
    );
    const action = store.dispatch(addLikeAction(mockAddedLike.cat_id));

    //Проверяем, что isLoad сменился на true
    expect(store.getState().favourite.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().favourite.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    await action;

    expect(store.getState().favourite.isLoad).toBe(false);

    const newExpectedLikes = [...mockLikes.data]
    newExpectedLikes.push(mockAddedLike);

    //Проверяем, что в стейте добавился лайк, которые отправлял моковый API
    expect(store.getState().favourite.favourite.data).toEqual(newExpectedLikes);
    //Проверяем, что в стейте нет ошибок
    expect(store.getState().favourite.error).toBe("");
  });

  it('Удаление лайка', async () => {
    const store = configureStore({
      reducer: {
        favourite: favouriteReducer,
      },
      preloadedState: {
        favourite: {
          favourite: mockLikes,
          favouriteCats: [],
          isLoad: false,
          error: '',
        },
      },
    });
    (deleteLikeApi as jest.Mock).mockImplementation(() => new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          cat_id: mockDeletedLikeId,
        });
      }, 1000);
    }));
    const action = store.dispatch(deleteLikeAction(mockDeletedLikeId));
    
    expect(store.getState().favourite.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().favourite.isLoad).toBe(true)

    jest.advanceTimersByTime(500);
    
    await action;
    expect(store.getState().favourite.isLoad).toBe(false);

  
    const newExpectedLikes = mockLikes.data.filter(like => like.cat_id !== mockDeletedLikeId);

    //Проверяем, что в стейте удалился лайк, который мы отправляли в моковый API
    expect(store.getState().favourite.favourite.data).toEqual(newExpectedLikes);
    expect(store.getState().favourite.error).toBe('');

  });
});
