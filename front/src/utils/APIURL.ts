/**
 * Можно использовать Dotenv для получения переменных окружения
 * в том числе и API адресов
 * Обычно .env добавляют в .gitignore,
 * т.к. проект небольшой и не содержит секретных данных
 * можно использовать обычные переменные ts.
 * Но если проект большой, то нужно использовать Dotenv и .env файл для API адресов,
 * это так, к слову :)
 */

export const apiUrl = {
  get_ten_random_cats:'https://api.thecatapi.com/v1/images/search?limit=10',
  get_cat_by_id: 'https://api.thecatapi.com/v1/images/',
  cats_api_key: 'live_qg2PmbFs9FnHrzXcVKxJlYJ4TiLk6Vx6GFsj7EbcCtKTfBT7b78RDnQpMTHWUKQm',

  
  favourite_cats: process.env.NODE_ENV === 'development' ? 'localhost:3000/likes' : 'api/likes',
  user: process.env.NODE_ENV === 'development' ? 'localhost:3000/user' : 'api/user',
}
