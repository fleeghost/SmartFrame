const {SystemModules,SelfModules} = require('./assembly/RequireHelper')
const electron =  SystemModules('electron');
const {app, BrowserWindow,session,ipcMain} = electron
const path = SystemModules('path');
const url = SystemModules('url');
const {RewriteUrl} = SelfModules('urlRewriter')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

//系统内存变量
let currentUser


function createWindow () {
  //请求前事件
  session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
    let originUrl = RewriteUrl(details.url);
    callback({cancel: false, originUrl});
  })



  // Create the browser window.
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
  win = new BrowserWindow({
    width,
    height,
    center:true,
    minWidth:1366,
    minHeight:768,
    autoHideMenuBar:true
  })



  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: '/app/modules/Home/View/Login.html',
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  moduleFunction()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

//模块方法
let moduleFunction = ()=>{
  //页面请求函数
  //获取页面根目录
  ipcMain.on('getRootPath',(e, arg)=>{
      e.returnValue = __dirname
  })
  //保存用户信息
  ipcMain.on('getCurrentUser',(e,arg)=>{
    e.returnValue = currentUser
  })
  //设置用户信息
  ipcMain.on('setCurrentUser',(e,arg)=>{
    currentUser = arg;
  })
  
}






// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.