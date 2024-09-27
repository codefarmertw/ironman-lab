// src/chokidar.js
const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

// 處理路徑，此處的 `__dirname` 指的是 `src`
const watchDir = path.join(__dirname, 'watch_dir');

const log = console.log.bind(console);
const toRelativePath = (absolutePath) => {
  path.relative(process.cwd(), absolutePath);
}

// 當 src/watch_dir 不存在時，建立一個新的目錄
if (!fs.existsSync(watchDir)) {
  fs.mkdirSync(watchDir);
  log(`Created directory: ${toRelativePath(watchDir)}`);
}

// 初始化 chokidar 的watcher
const watcher = chokidar.watch(watchDir, {
  // 設定後第一次啟動時才不會觸發事件
  ignoreInitial: true
});

// 修改 watcher 的檔案異動事件監聽，使用相對路徑
watcher
  .on('add', (path) => log(`File ${toRelativePath(path)} has been added`))
  .on('change', (path) => log(`File ${toRelativePath(path)} has been changed`))
  .on('unlink', (path) => log(`File ${toRelativePath(path)} has been removed`))
  .on('addDir', (path) =>
    log(`Directory ${toRelativePath(path)} has been added`)
  )
  .on('unlinkDir', (path) =>
    log(`Directory ${toRelativePath(path)} has been removed`)
  )
  .on('error', (error) => log(`Watcher error: ${error}`))
  .on('ready', () => log('Initial scan complete. Ready for changes'));

console.log(`[Chokidar] watching ${toRelativePath(watchDir)}...`);
