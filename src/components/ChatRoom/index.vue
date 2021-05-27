<template>
  <div :class="isActive? 'roomActive': 'room'"
       v-on:click="roomClick(room)"
  >
    <table style='width: 100%; table-layout: fixed; height: 50px'>
      <tr style="height: 50%">
        <td style="width: 36px;" rowspan="2">
          <img v-if="room.platformType == 1" :src="require('@/assets/platform/ls_1.png')" style="height: 30px; width: 30px"/>
          <img v-if="room.platformType == 2" :src="require('@/assets/platform/ls_2.png')" style="height: 30px; width: 30px"/>
          <img v-if="room.platformType == 3" :src="require('@/assets/platform/ls_3.png')" style="height: 30px; width: 30px"/>
          <img v-else :src="require('@/assets/platform/d.png')" style="height: 30px; width: 30px"/>
        </td>
        <td style="">
          <span :class="room.online? 'online': 'offline'"> {{room.username}}</span>
        </td>
        <td style="text-align: right; font-size: x-small; color: #8c939d; width: 45px">
          {{room.timestamp}}
        </td>
      </tr>
      <tr>
        <td style="font-size: small;">
          {{room.content}}
        </td>
        <td style="text-align: right; color: white; width: 45px; padding-right: 2px">
          <el-badge is-dot class="item" v-show="isSelected">-</el-badge>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'index',
    props: {
      room: {type: Object},
      onRoomClick: { type: Function },
      isActive: { type: Boolean },
      content: {type: String},

    },
    data() {
      return {
        isSelected: this.room.isDot,
      }
    },
    watch: {
      'room.isDot': {
        handler: function(newValue) {
          if (newValue) {
            this.isSelected = true;
          }
        },
        immediate: true
      },
    },
    created () {
      this.isSelected = this.room.isDot;
    },
    methods: {
      roomClick: function (item) {
        this.isSelected = false;
        this.onRoomClick(item);
      }
    }
  }

</script>

<style>
  .room {
    /*margin: 10px;*/
    padding: 10px;
    width: 100%;
    /*padding: 10px;*/
    margin-bottom: 10px;
    font-family: "Lato", sans-serif;
  }

  .roomActive {
    /*margin: 10px;*/
    padding: 10px;
    /*margin-bottom: 10px;*/
    /*background-color: #cee3ec;*/
    /*border-radius: 4px;*/

    background-color: whitesmoke;
    font-family: "Lato", sans-serif;
    margin-bottom: 10px;
  }

  .room:hover .roomActive:hover{
    background-color: #e4e9f3;
    /*border-radius: 4px;*/
  }

  .roomActive:hover{
    background-color: #e4e9f3;
    /*border-radius: 4px;*/
  }

  .online {
    color: #79C7C5;
  }

  .offline{
    color: #AAB4B4;
  }

  tr td {
    /* for IE */
    text-overflow: ellipsis;
    /* for Firefox,mozilla */
    -moz-text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: left
  }
</style>
