module.exports = {
  title: 'Chat Admin',
  onlinePreview: 'http://127.0.0.1',
  druid: {
    authority: {
      "development": 'http://127.0.0.1:8764/druid',
      "production": 'http://127.0.0.1:8764/druid',
    },
    file: {
      "development": 'http://127.0.0.1:8765/druid',
      "production": 'http://127.0.0.1:8765/druid',
    },
    msgs: {
      "development": 'http://127.0.0.1:8768/druid',
      "production": 'http://127.0.0.1:8768/druid',
    }
  }
}
