<template>
    <div class="board-form-message">
        <input v-model="boardMessage.name" type="text" name="name" placeholder="Имя" required>
        <input v-model="boardMessage.email" type="email" name="email" placeholder="E-mail">
        <input v-model="boardMessage.headline" type="text" name="headline" placeholder="Заголовок" required>
        <textarea v-model="boardMessage.message" name="message" placeholder="Сообщение"></textarea>
        <button @click="submit" type="submit" class="pure-button pure-button-primary">Отправить</button>
    </div>
</template>

<script>
import axios from "axios";
import socket from "@/socket";

export default {
    name: "BoardMessageForm",

    data() {
        return {
           boardMessage: {
             name: '',
             email: '',
             headline: '',
             message: '',
           }
        }
    },
    methods: {
        submit() {
          axios.post('/api/board/create', {
            boardMessage: {...this.boardMessage}
          });
          socket.emit('new board message');
        }
    },


}
</script>

<style scoped>
.board-form-message {
    display: flex;
    flex-direction: column;
    align-items: center;
}



</style>
