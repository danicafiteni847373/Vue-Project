<template>
  <div class="students">
    <div class="title has-text-centred">Students Detailed</div>
    <section>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Class</th>
            <th scoop="col">Mark</th>
            <!-- <th scope="col">Class</th> -->
          </tr>
        </thead>
        <tbody>
          <transition-group name="list">
            <tr
              v-for="(todo, id) in todos.slice(startIndex, endIndex + 1)"
              :key="id"
            >
              <td>{{ todo.name }}</td>
              <td>{{ todo.surname }}</td>
              <td>{{ todo.number }}</td>
              <td>{{ todo.classs }}</td>
              <td>{{ todo.mark }}</td>

              <div class="btn">
                <button @click="confirmDelete(todo)" class="button is-danger">
                  Delete
                </button>
                <span class="sure" v-if="todo.toBeDeleted"
                  >Are you sure?
                  <button @click="deleteItem(todo.id)" class="button is-info">
                    Yes
                  </button>
                  <button @click="cancelDelete(todo.id)" class="button is-link">
                    No
                  </button></span
                >
                <button @click="update(todo.id)" class="button is-warning ml-2">
                  Update
                </button>
              </div>
            </tr>
          </transition-group>
        </tbody>
      </table>

      <!-- Pagination controls -->
      <div>
        <button @click="prevPage" :disabled="currentPage === 1">
          Previous
        </button>

        <button @click="nextPage" :disabled="endIndex >= todos.length">
          Next
        </button>
      </div>
    </section>
  </div>
</template>

<script>
//@ is an alias to our src folder
import { db } from "@/firebase";
//import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
//import { v4 as uuidv4 } from "uuid";

import {
  // getFirestore,
  // getDocs,
  // querySnapshot,
  onSnapshot,
  collection,
  doc,
  deleteDoc,
  //updateDoc,
  //addDoc,
  //orderBy,
  query,

  //limit,
} from "firebase/firestore";

export default {
  name: "Students",
  components: {},

  data() {
    return {
      todos: [],

      currentPage: 1,
      itemsPerPage: 2,
      isHidden: false,
    };
  },

  mounted() {
    //this will fire the first time the app is launched BUT also when
    //there is a change it will keep on listening and fire again
    onSnapshot(query(collection(db, "todos")), (querySnapshot) => {
      const fbTodos = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const todo = {
          id: doc.id,
          name: doc.data().name,
          surname: doc.data().surname,
          number: doc.data().number,
          classs: doc.data().classs,
          mark: doc.data().mark,
        };

        fbTodos.push(todo);
      });
      this.todos = fbTodos;
      console.log("todos");
    });

    // const todosCollectionQuery = query(
    //   collection(db, "todos"),
    //   orderBy("date", "desc"),
    //   limit(3)
    // );
  },

  computed: {
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },
    endIndex() {
      return this.startIndex + this.itemsPerPage - 1;
    },
  },

  methods: {
    // addToDo() {
    //   addDoc(collection(db, "todos"), {
    //     name: this.inputField,
    //     surname: this.inputField2,
    //     number: this.inputField3,
    //     //class: this.inputField4,
    //   });
    //   this.name = "";
    //   this.surname = "";
    //   this.number = "";
    //   //this.inputField4 = "";
    //   this.addedMessage = "Task added";
    //   setTimeout(() => {
    //     this.addedMessage = "";
    //   }, 2000);
    // },

    confirmDelete(todo) {
      todo.toBeDeleted = true;
    },
    cancelDelete(id) {
      id.toBeDeleted = false;
    },
    deleteItem(id) {
      deleteDoc(doc(db, "todos", id));
      console.log("delete");
    },

    update(id) {
      console.log(id);
      this.$router.push("/" + id);
    },

    nextPage() {
      if (this.endIndex < this.todos.length) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>
<style>
@import "~bulma/css/bulma.css";

.form {
  max-width: 700px;
  padding: 10px;
  margin: 0 auto;
}

.line-through {
  text-decoration: line-through;
}

.green {
  color: rgb(183, 2, 255);
}

/* list transitions*/

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

section {
  margin: 2rem auto;
  max-width: 60rem;
  border-radius: 12px;
  border: 1px solid #ccc;
  padding: 1rem;
}

tr {
  color: blue;
}

.table {
  margin-left: 30%;
}

#app {
  text-align: center;
}

[v-cloak] {
  display: none;
}

.btn {
  width: 10%;
  padding: 10%;
  display: flex;
}

@media (max-width: 750px) {
  .btn {
    width: 5%;
    margin-left: -110%;
    margin-top: 30%;
  }

  .table {
    background-color: rebeccapurple;
    display: flex;
  }
}

@media (max-width: 700px) {
  .btn {
    width: 5%;
    margin-left: -120%;
    margin-top: 30%;
  }

  .table {
    background-color: rebeccapurple;
    display: contents;
  }
}

@media (max-width: 400px) {
  .btn {
    width: 5%;
    margin-left: -120%;
    margin-top: 30%;
  }

  .table {
    background-color: rebeccapurple;
    display: contents;
  }
}
</style>
