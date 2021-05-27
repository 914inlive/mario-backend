<template>
  <div class="app-container" @click="init">
    <el-row :gutter="10">
      <el-col :sm="14" :xs="24">
        <el-card>

          <el-container>
            <el-aside width="calc(35vh)" style="">
              <div style="height: 100px; display: flex; align-items: center; margin-left: 10px">
                <div>
                  <el-avatar>
                    {{userId}}
                  </el-avatar>
                </div>
                <div class="avatar-txt">
                  <div style="margin-right: 3px">
                    {{$t("common.messageSound")}}{{isSoundEnable? 'On': 'Off'}}
                  </div>
                  <el-switch
                    :width="30"
                    v-model="isSoundEnable"
                  >
                  </el-switch>
                </div>
              </div>
              <div v-for="(item) in rooms" v-bind:key="item.uid">
                <ChatRoom
                  :room="item"
                  :onRoomClick="onRoomClick"
                  :isActive="item.uid === activeUid"
                />
              </div>
            </el-aside>
            <ChatView
              ref="ChatView"
              :messages="this.users.get(this.activeUid)"
              :onSendMsg="onSendMsg"
              :onSendFile="onSendFile"
              :isConnect="isConnect"
            />
          </el-container>
        </el-card>
      </el-col>
      <el-col :sm="10" :xs="24">
        <el-card>
          <CommonTxt
            :onCommonTxtClick="onCommonTxtClick"
          />
        </el-card>
      </el-col>
    </el-row>
    <div class="music-player">
      <audio
        id="audio"
        ref="audio"
        src="@/assets/audio/msg.mp3"
        preload
        muted
      />
    </div>
  </div>
</template>
<script>
  import ChatRoom from '@/components/ChatRoom'
  import ChatView from '@/components/ChatView'
  import CommonTxt from '@/components/CommonTxt'
  import {addZero} from '@/utils/utils'

  //todo: to export
  export const FILE_TYPE = {
    TEXT: "1",
    IMAGE: "2",
    AUDIO: "3",
  };

  const CONNECTIOM_STATUS = {
    NULL: -1,
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3,
  };

  export default {
    name: 'Dashboard',
    components: {
      ChatRoom, CommonTxt, ChatView
    },
    data() {
      return {
        timer: null,
        activeUid: '',
        ws: null,
        users: new Map(), //uid, [{message}...]
        rooms: [],
        messages: [],
        isConnect: false,
        lastChatContext: {
          form: '',
          to: '',
          context: '',
        },
        isSoundEnable: true,
        canPlaySound: false,
      }
    },
    computed: {
      userName() {
        return this.$store.state.account.user.id;
      },
      userId() {
        return this.$store.state.account.user.uid.toString();
      },
    },
    watch: {
      isSoundEnable: {
        handler: function(newValue, oldValue) {
          if (newValue && !oldValue) {
            this.playSound();
          }
        },
      },
      $route() {
        if (this.$route.path === "/chat/communicate") {
          this.$notify.closeAll();
        }
      },
    },
    created () {
      this.wsConnect();
      this.timer = setInterval(this.checkConnection, 5000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    methods: {
      checkConnection() {
        if (!this.ws)
          return;

        if (this.ws.readyState === CONNECTIOM_STATUS.OPEN) {
          this.ws.send(JSON.stringify({
            type: 'KEEP_ALIVED',
          }));
        }
      },
      updateChat(message, isMe = false) {
        if (!isMe)
          this.playSound();

        const uid = isMe? this.activeUid: message.uid;
        if (this.users.has(uid)) {
          let arr = this.users.get(uid);
          message._id = arr.length;
          arr.push(message);
          this.users.set(uid, arr);

          this.rooms.map((item) => {
            if (item.uid === uid) {
              item.timestamp = message.timestamp;
              item.ts = message.ts;
              item.content = message.content;
              item.type = message.type;
              item.online = true;
              item.isDot = isMe? false: ((this.activeUid === message.uid)? false: true);
              return item;
            }
          });
        } else {
          message._id = 0;
          this.users.set(uid, [message]);

          this.rooms.push({
            username: message.username,
            uid: uid,
            timestamp: message.timestamp,
            ts: message.ts,
            platformType: message.platformType,
            content: message.content,
            online: true,
            isDot: isMe? false: ((this.activeUid === message.uid)? false: true),
          })
        }

        this.rooms.sort((a, b) => (a.ts > b.ts)? -1: 1);
      },
      onRoomClick(obj) {
        this.activeUid = obj.uid;
        this.messages = this.users.get(obj.uid);
        this.rooms.map((item) => {
          if (item.uid === obj.uid) {
            item.isDot = false;
            return item;
          }
        });
      },
      onSendMsg(obj) {
        const d = new Date();

        //send ws
        const s = JSON.stringify({
          fromUserId: this.userId,
          toUserId: this.activeUid,
          type: 'SINGLE_SENDING',
          content: obj.msg,
        });
        this.ws.send(s);
        // console.log('-----send')
        // console.log(s)

        //update render
        const message = {
          content: obj.msg,
          uid: 1,
          username: this.userId,
          date: addZero(`${d.getMonth()/d.getDate()}`, '/'),
          timestamp: addZero(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`, ':'),
          platformType: 0,
          ts: d.getTime(),
          seen: true,
          type: FILE_TYPE.TEXT,
        };
        this.updateChat(message, true);

        //keep the last chat
        this.lastChatContext = {
          form: this.userId,
          to: this.activeUid,
          context: obj.msg,
        };

        //call history
        const history = {
          form: this.userId,
          receive: this.activeUid,
          context: obj.msg,
        };

        this.sendChatHistory(history);
      },
      onSendFile(obj) {
        const d = new Date();
        const s = JSON.stringify({
          fromUserId: this.userId,
          toUserId: this.activeUid,
          fileSize: obj.response.data.fileSize,
          fileUrl: obj.response.data.fileUrl,
          originalFilename: obj.response.data.originalFilename,
          type: "FILE_SINGLE_SENDING",
          fileType: "2",
        });
        this.ws.send(s);

        const message = {
          content: this.$t("chat.imageFile"),
          src: `${process.env.VUE_APP_PROD_REQUEST_DOMAIN_PREFIX}/orionIM/pic/showPic?filePath=${obj.response.data.fileUrl}`,
          uid: 1,
          username: this.userId,
          date: addZero(`${d.getMonth()/d.getDate()}`, '/'),
          timestamp: addZero(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`, ':'),
          platformType: 0,
          ts: d.getTime(),
          seen: true,
          type: FILE_TYPE.IMAGE,
        };
        this.updateChat(message, true);

        this.lastChatContext = {
          form: this.userId,
          to: this.activeUid,
          context: obj.response.data.fileUrl,
        }

        const history = {
          form: this.userId,
          receive: this.activeUid,
          context: obj.response.data.fileUrl,
        };

        this.sendChatHistory(history);
      },
      onCommonTxtClick(obj) {
        this.$refs.ChatView.input += obj.context;
      },
      sendChatHistory(obj) {
        if (obj.to === 'Bot')
          return;

        this.$post("orionIM/message/insertMessage", obj).then();
      },
      wsConnect() {
        this.ws = new WebSocket(`${process.env.VUE_APP_PROD_WS_DOMAIN_PREFIX}`);

        this.ws.onopen = () => {
          this.ws.send(JSON.stringify({
            userId: this.$store.state.account.user.uid.toString(),
            type: 'REGISTER',
            userType: 1,
          }));
          // console.log('-----send')
          // console.log(JSON.stringify({
          //   userId: this.$store.state.account.user.uid.toString(),
          //   type: 'REGISTER',
          //   userType: 1,
          // }))
        }

        this.ws.onmessage = (event) => {
          let evt = JSON.parse(event.data);
          if (evt.status === -1) {
            if (evt.msg.indexOf('游客已经断开连接:游客Id=') === -1)
              return;

            //update user online status
            const start = evt.msg.indexOf('=') + 1;
            const uid = evt.msg.slice(start, evt.msg.length);
            this.rooms.map((item) => {
              if (item.uid === uid) {
                item.online = false;
                return item;
              }
            });
          }

          if (evt.msg.indexOf('发送成功:当前时间:') !== -1)
            return;

          if (!evt.data) return;

          console.log('-------');
          console.log(JSON.parse(evt.data));

          if (evt.data.hasOwnProperty('type')) {
            if (evt.data.type === 'REGISTER') {
              this.isConnect = true;
              this.$message({
                message: `${this.userName} ${this.$t("chat.csOnline")}`,
                type: 'success'
              });

              return;
            }
          }

          //todo:
          if (evt.data.hasOwnProperty('fileSize')) {
            let d = new Date();
            const message = {
              content: (evt.data.fileUrl.indexOf('.mp3') !== -1)? this.$t("chat.audioFile"): this.$t("chat.imageFile"),
              src: (evt.data.fileUrl.indexOf('.mp3') !== -1)? `${process.env.VUE_APP_PROD_REQUEST_DOMAIN_PREFIX}/orionIM/pic/downFile?filePath=${evt.data.fileUrl}&fileName=${evt.data.originalFilename}`: `${process.env.VUE_APP_PROD_REQUEST_DOMAIN_PREFIX}/orionIM/pic/showPic?filePath=${evt.data.fileUrl}`,
              uid: evt.data.fromUserId,
              username: evt.data.username? evt.data.username: evt.data.fromUserId,
              date: addZero(`${d.getMonth()/d.getDate()}`, '/'),
              timestamp: addZero(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`, ':'),
              seen: false,
              ts: d.getTime(),
              platformType: evt.data.platformType,
              type: (evt.data.fileUrl.indexOf('.mp3') !== -1)? FILE_TYPE.AUDIO: FILE_TYPE.IMAGE,
            };

            this.updateChat(message, false);

            if (this.$router.currentRoute.path !== "/chat/communicate") {
              this.$notify({
                title: evt.data.username? evt.data.username: evt.data.fromUserId,
                message: this.$t("chat.imageFile"),
                duration: 0,
                onClick: () => {
                  this.$notify.closeAll();
                  this.$router.push("/chat/communicate");
                }
              })
            }
          } else {
            let d = new Date();
            const message = {
              content: evt.data.content,
              uid: evt.data.fromUserId,
              username: evt.data.username? evt.data.username: evt.data.fromUserId,
              date: addZero(`${d.getMonth()/d.getDate()}`, '/'),
              timestamp: addZero(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`, ':'),
              seen: false,
              ts: d.getTime(),
              platformType: evt.data.platformType,
              type: FILE_TYPE.TEXT,
            };
            this.updateChat(message, false);

            const addChatHistory = {
              form: evt.data.fromUserId,
              receive: this.userId,
              context: evt.data.content,
            };

            this.sendChatHistory(addChatHistory);

            if (this.$router.currentRoute.path !== "/chat/communicate") {
              this.$notify({
                title: evt.data.username? evt.data.username: evt.data.fromUserId,
                message: evt.data.content,
                duration: 0,
                onClick: () => {
                  this.$notify.closeAll();
                  this.$router.push("/chat/communicate");
                }
              })
            }
          }
        }

        this.ws.onclose = () => {
          // console.log('-------close')
          // console.log(event)
          this.isConnect = false;
          this.$message({
            message: `${this.userId} ${this.$t("chat.csOffline")}`,
            type: 'warning'
          })
          this.wsConnect();
        }

        this.ws.onerror = () => {
        }
      },
      playSound() {
        if (!this.isSoundEnable)
          return;

        if (this.canPlaySound) {
          let audio = this.$refs.audio;
          audio.play();
        } else {
          this.$store.commit("common/newMsg", 1);
        }
      },
      init() {
        this.canPlaySound = true;
      }
    }
  }
</script>
<style>
  .el-container {
    border: 1px solid #e1e4e8;
    border-radius: 4px;
    background-color: white;
  }

  .el-aside {
    margin: 0;
    padding: 0;
    line-height: 0;
    border-right: 1px solid #e1e4e8;
    height: calc(100vh - 180px);
    background: white;
    overflow-y: scroll;
  }

  .el-main {
    padding: 0;
  }

  ::-webkit-scrollbar {
    width: 0rem;
    height: 0rem;
  }

  .avatar-txt {
    display: flex;
    margin-left: 10px;
    font-size: 10px;
    align-items: center;
  }
</style>

