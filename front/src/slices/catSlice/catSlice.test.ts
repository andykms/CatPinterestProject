import { TCats, TGalleryCats } from "../../types/TCats";
import { catReducer } from "./catSlice";
import { configureStore } from "@reduxjs/toolkit";
import { getCatsApi } from "../../utils/CatApi";
import { getCatsAction } from "../../actions/ApiActions";
import { getCats, paginate } from "./catSlice";

const mockCats: TCats = [
  {
    id: "1",
    url: "testUrl111",
    width: 111,
    height: 111,
    breeds: [],
    favourite: {},
  },
  {
    id: "2",
    url: "testUrl222",
    width: 222,
    height: 222,
    breeds: [],
    favourite: {},
  },
  {
    id: "3",
    url: "testUrl333",
    width: 333,
    height: 333,
    breeds: [],
    favourite: {},
  },
  {
    id: "4",
    url: "testUrl444",
    width: 444,
    height: 444,
    breeds: [],
    favourite: {},
  },
  {
    id: "5",
    url: "testUrl555",
    width: 555,
    height: 555,
    breeds: [],
    favourite: {},
  },
  {
    id: "6",
    url: "testUrl666",
    width: 666,
    height: 666,
    breeds: [],
    favourite: {},
  },
  {
    id: "7",
    url: "testUrl888",
    width: 888,
    height: 888,
    breeds: [],
    favourite: {},
  },
  {
    id: "8",
    url: "testUrl888",
    width: 888,
    height: 888,
    breeds: [],
    favourite: {},
  },
  {
    id: "9",
    url: "testUrl999",
    width: 999,
    height: 999,
    breeds: [],
    favourite: {},
  },
  {
    id: "10",
    url: "testUrl101010",
    width: 101010,
    height: 101010,
    breeds: [],
    favourite: {},
  },
  {
    id: "11",
    url: "testUrl111",
    width: 111,
    height: 111,
    breeds: [],
    favourite: {},
  },
  {
    id: "12",
    url: "testUrl222",
    width: 222,
    height: 222,
    breeds: [],
    favourite: {},
  },
  {
    id: "13",
    url: "testUrl333",
    width: 333,
    height: 333,
    breeds: [],
    favourite: {},
  },
  {
    id: "14",
    url: "testUrl444",
    width: 444,
    height: 444,
    breeds: [],
    favourite: {},
  },
  {
    id: "15",
    url: "testUrl555",
    width: 555,
    height: 555,
    breeds: [],
    favourite: {},
  },
  {
    id: "16",
    url: "testUrl666",
    width: 666,
    height: 666,
    breeds: [],
    favourite: {},
  },
  {
    id: "17",
    url: "testUrl888",
    width: 888,
    height: 888,
    breeds: [],
    favourite: {},
  },
  {
    id: "18",
    url: "testUrl888",
    width: 888,
    height: 888,
    breeds: [],
    favourite: {},
  },
  {
    id: "19",
    url: "testUrl999",
    width: 999,
    height: 999,
    breeds: [],
    favourite: {},
  },
  {
    id: "20",
    url: "testUrl101010",
    width: 101010,
    height: 101010,
    breeds: [],
    favourite: {},
  },
];


jest.mock('../../utils/CatApi');

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

describe('Тест стейта котов', ()=>{
  it('Получение 10 котов', async ()=>{
    const store = configureStore({
      reducer: {
        cat: catReducer,
      },
    });
    (getCatsApi as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(mockCats.slice(0, 10));
          }, 1000);
        })
    );
    const action = store.dispatch(
      getCatsAction()
    );
    //Проверяем, что isLoad сменился на true
    expect(store.getState().cat.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().cat.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    await action;

    expect(store.getState().cat.isLoad).toBe(false);

    //Проверяем, что в стейте лежает те коты, которые отправлял моковый API
    const expectedCats: TGalleryCats = [];
    mockCats.slice(0, 10).forEach((cat) => {
      expectedCats.push({
        ...cat,
        galleryId: expect.any(String)
      });
    });
    expect(store.getState().cat.cats).toEqual(expectedCats);

    //Проверяем, что в стейте нет ошибок
    expect(store.getState().cat.error).toBe('');
  })

  it('Тест селектора',async ()=>{
    const store = configureStore({
      reducer: {
        cat: catReducer,
      },
    });
    (getCatsApi as jest.Mock).mockImplementation(
      () => Promise.resolve(mockCats.slice(0, 10))
    );
    const action = await store.dispatch(
      getCatsAction()
    );

    //Проверяем, что селектор вернул именно первые 10 котов
    const cats = getCats(store.getState());
    const expectedCats: TGalleryCats = [];
    mockCats.slice(0, 10).forEach((cat) => {
      expectedCats.push({
        ...cat,
        galleryId: expect.any(String)
      });
    });
    expect(cats).toEqual(expectedCats);
  })
})

