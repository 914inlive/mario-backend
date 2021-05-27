<template>
  <el-container style="border: 0; height: calc(100vh - 180px);">
    <el-header style="display: flex; align-items: center; background-color: #F9FBFF">
<!--        <hamburger-->
<!--          id="hamburger-container"-->
<!--          class="hamburger-container"-->
<!--          :is-active="chatBar.opened"-->
<!--          @toggleClick="toggleChatBar"-->
<!--        />-->

      {{messages.length > 0? messages[0].username: ''}}
    </el-header>
    <el-main id="elmain" ref="elmain">
      <div v-for="(item, index) in messages" v-bind:key="item._id">
        <div
          :class="uid === item.uid? 'right': 'left'"
          v-show="item.username"
        >
          <span :class="uid === item.uid? 'bubbleR': 'bubbleL'">
            <span v-if="item.type === FILE_TYPE.TEXT">
                {{item.content}}
            </span>
            <span
              v-else-if="item.type === FILE_TYPE.IMAGE"
              class="demo-image__preview"
            >
              <el-image
                style="width: 100px; height: 100px"
                :src="item.src"
                :preview-src-list="[item.src]"
              >
              </el-image>
            </span>
            <span v-else>
              <vuetify-audio
                color="null"
                :file="item.src"
                :ended="audioFinish"
              />
            </span>
          </span>
          <br>
          <span :class="uid === item.uid? 'tsR': 'tsL'">
            {{item.timestamp}}
          </span>
        </div>
      </div>

    </el-main>
    <el-footer style="display: flex; align-items: center;">

      <div style="width: 85%">
        <el-input
          v-model="input"
          clearable
          :placeholder="isConnect? '...': '已离线, 正在重新连线中'"
          :disabled="!isConnect || messages.length === 0"
          v-on:keyup.enter.native="sendMsg"
        />
      </div>
      <div style="display: flex; justify-content: space-around; width: 15%; flex-direction: row; padding-left: 10px">
        <el-popover
          placement="top"
          trigger="click"
        >
          <VEmojiPicker @select="selectEmoji" />
          <svg-icon icon-class="emoji" slot="reference"/>
        </el-popover>

        <el-upload
          class="upload-demo"
          :show-file-list="false"
          :action="target"
          :on-success="uploadSuccess"
          :on-exceed="uploadExceed"
          :on-error="uploadError"
        >
          <svg-icon icon-class="file"></svg-icon>
        </el-upload>

        <div @click="sendMsg">
          <svg-icon class-name="international-icon" icon-class="send" style="color: #a8a9a9;" />
        </div>
      </div>

    </el-footer>
  </el-container>
</template>

<script>
import VEmojiPicker from 'v-emoji-picker';
import Hamburger from "@/components/Hamburger";
import VuetifyAudio from "vuetify-audio";

export default {
  name: "index",
  components: {
    VEmojiPicker, Hamburger, VuetifyAudio
  },
  props: {
    messages: {type: Array, default: () => []},
    onSendMsg: {type: Function},
    onSendFile: {type: Function},
    isConnect: {type: Boolean, default: true},
  },
  data() {
    return {
      input: '',
      uid: 1,
      target: `${process.env.VUE_APP_PROD_REQUEST_DOMAIN_PREFIX}/orionIM/pic/upload`,
      FILE_TYPE: {
        TEXT: "1",
        IMAGE: "2",
        AUDIO: "3",
      },
    }
  },
  methods: {
    uploadExceed(files, fileList) {
    },
    uploadSuccess(response, file, fileList) {
      this.onSendFile(file);
      this.$message({
        message: this.$t("tips.uploadSuccess"),
        type: "success"
      });

      const that = this;
      setTimeout(() => {
        that.scrollToBottom();
      }, 200)
    },
    uploadError(err, file, fileList) {
      this.$message({
        message: this.$t("tips.onlySupportImage"),
        type: "success"
      });
    },
    audioFinish() {

    },
    sendMsg() {
      if (!this.input)
        return;

      if (this.isConnect) {
        this.onSendMsg({
          msg: this.input,
        });
        this.input = '';

        const that = this;
        setTimeout(() => {
          that.scrollToBottom();
        }, 200)
      }
    },
    scrollToBottom() {
      let r = this.$refs.elmain.$el;
      r.scrollTop = r.scrollHeight;
    },
    selectEmoji(emoji) {
      this.input += emoji.data;
    },
    toggleChatBar() {
      this.$store.commit("setting/toggleChatBar");
    },
  },
  computed: {
    chatBar() {
      return this.$store.state.setting.chatBar;
    },
  },
}
</script>

<style>

.el-input__inner {
  /*border-width: 0;*/
  border-radius: 20px;
}

.chatMain {
  border-top: 5px white solid;
  border-bottom: 5px white solid;
  overflow-y: scroll;
  overflow-x: hidden;
}

.chatMain::-webkit-scrollbar {
  display: none;
}

.chatMain {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.bubbleR {
  font-family: "Lato", sans-serif;
  display: inline-block;
  position: relative;
  background-color: #79C7C5;
  padding: 8px 13px 8px 13px;
  margin-right: 10px;
  max-width: 60%;
  border-radius: 10px;
  font-size: small;
  text-align: left;
  color: #F9FBFF;
}

.tsR {
  font-family: "Lato", sans-serif;
  display: inline-block;
  position: relative;
  /*background-color: #79C7C5;*/
  /*padding: 8px 13px 8px 13px;*/
  margin-right: 10px;
  max-width: 60%;
  border-radius: 10px;
  font-size: xx-small;
  text-align: left;
  color: lightgrey;
}

.bubbleR:after {
  /*content: '';*/
  /*position: absolute;*/
  /*right: 0;*/
  /*top: 50%;*/
  /*width: 0;*/
  /*height: 0;*/
  /*border: 5px solid transparent;*/
  /*border-left-color: whitesmoke;*/
  /*border-right: 0;*/
  /*margin-top: -5px;*/
  /*margin-right: -3px;*/
}

.bubbleL {
  font-family: "Lato", sans-serif;
  display: inline-block;
  position: relative;
  background-color: #AAB4B4;
  padding: 8px 13px 8px 13px;
  margin-left: 10px;
  max-width: 60%;
  border-radius: 10px;
  font-size: small;
  color: #F9FBFF;
}

.tsL {
  font-family: "Lato", sans-serif;
  display: inline-block;
  position: relative;
  /*background-color: #AAB4B4;*/
  /*padding: 8px 13px 8px 13px;*/
  margin-left: 10px;
  max-width: 60%;
  border-radius: 10px;
  font-size: xx-small;
  color: lightgrey;
}

.bubbleL:after {
  /*content: '';*/
  /*position: absolute;*/
  /*left: 0;*/
  /*top: 50%;*/
  /*width: 0;*/
  /*height: 0;*/
  /*border: 5px solid transparent;*/
  /*border-right-color: whitesmoke;*/
  /*border-left: 0;*/
  /*margin-top: -5px;*/
  /*margin-left: -3px;*/
}

.right {
  text-align: right;
  margin-bottom: 10px;
}

.left {
}

.mdi-play {
  margin-left: 5px;
  height: 28px;
  width: 28px;
  background-image: url('../../assets/audio/play.png');
  background-repeat: no-repeat;
  background-size: 28px 28px;
  display: inline-grid;
}

.mdi-pause {
  margin-left: 5px;
  height: 28px;
  width: 28px;
  background-image: url('../../assets/audio/pause.png');
  background-repeat: no-repeat;
  background-size: 28px 28px;
  display: inline-grid;
}

.mdi-stop {
  height: 28px;
  width: 28px;
  background-image: url('../../assets/audio/stop.png');
  background-repeat: no-repeat;
  background-size: 28px 28px;
  display: inline-grid;
}

.mdi-volume-high {
  height: 28px;
  width: 28px;
  background-image: url('../../assets/audio/sound.png');
  background-repeat: no-repeat;
  background-size: 28px 28px;
  display: inline-grid;
}

.mdi-volume-mute {
  height: 28px;
  width: 28px;
  background-image: url('../../assets/audio/mute.png');
  background-repeat: no-repeat;
  background-size: 28px 28px;
  display: inline-grid;
}

.mdi-refresh {
  height: 0px;
  width: 0px;
}

  .v-btn {
    border-width: 0;
    background-color: transparent;
  }
</style>
