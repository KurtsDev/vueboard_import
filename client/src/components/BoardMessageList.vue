<template>
  {{messages}}
    <ul class="board-list-message">
        <li class="" :key="message.id" v-for="message in messages">

            <a class="pure-menu-link" @click="openMessage(message.id)">
                {{ message.headline }}
                ({{ message.name }})
                {{ dataTimeFormat(message.createdAt) }}
            </a>
            <div v-show="message.visible">
              <p>{{ message.email }}</p>
              <p>{{ message.message }}</p>
            </div>


        </li>
    </ul>
</template>

<script>
import axios from "axios";
import socket from "@/socket";

export default {
    name: "BoardMessageList",

    data() {
        return {
            visibleMessage: true,
            messages: [],
        }
    },

  created() {
      this.initBoardMessage();
  },

  methods: {
      updateBoardMessage() {
        socket.on('connection', socket => {
          socket.on('update board message', msf => {
            console.log(msf);
          });
        })
      },
      initBoardMessage() {
        axios.get('/api/board/index').then((response) => {
          this.messages = response.data;
        });
      },

    dataTimeFormat(data){
        const addZero = (item) => (item.toString().length < 2) ? `0${item}` : item;

        let currentTime = new Date(data);
        let year = currentTime.getFullYear();
        let mounth = addZero(currentTime.getMonth() + 1);
        let date = addZero(currentTime.getDate());
        let hours = addZero(currentTime.getHours());
        let minutes = addZero(currentTime.getMinutes());

        return `${date}.${mounth}.${year} - ${hours}:${minutes}`;
    },

      openMessage(id) {
        this.messages.map(function (item) {
          if (item.id === id) {
            item.visible = !item.visible;
          }
        })
      }
    },


}
</script>

<style scoped>
.board-list-message {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
