/**
 * 判定ライン
 * @type {Array}
 */
const winIds = [
  // vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // diagonal
  [0, 4, 8],
  [2, 4, 6]
]

/**
 * 勝ち判定をする関数
 * @param {Array} data ボードの状態
 * @return {Boolean}
 */
const isWinJudge = data => {
  const sumNums = winIds.map(ids => ids.reduce((x, y) => x + data[y], 0))
  return sumNums.some(num => Math.abs(num) === 3)
}

/**
 * 引き分けを判定する関数
 * @param {Array} data ボードの状態
 * @return {Boolean}
 */
const isDrawJudge = data => {
  return data.every(x => x !== 0)
}


export {
  isWinJudge,
  isDrawJudge
}
